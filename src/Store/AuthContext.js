import React, { useContext, useState, useEffect } from "react";
import { auth, projectStorage } from "../Auth/Firbase";
import db from "../Auth/Firbase";
const AuthContext = React.createContext();
const collectionRef = db.collection("posts");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const [progress, setIsProgress] = useState(0);

  function signup(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        userData.user.sendEmailVerification();
        auth.signOut();
        alert(
          " Congratulations, your account has been successfully created.Please Verify It before Login"
        );
      });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then((verify) => {
      const valid = verify.user.emailVerified;

      if (valid === false) {
        alert("Please Verify Your Email!");
        auth.signOut();
      }
    });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function avatarMaker(userName) {
    return userName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  }

  function uploadData(data) {
    const { file, IsInput, username } = data;
    const storageRef = projectStorage.ref(`images/${file.name}`);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setIsProgress(percentage);
      },
      () => {
        alert("Error While Uploading File");
      },
      async () => {
        const imageData = await storageRef.getDownloadURL().then((url) => {
          collectionRef.add({
            message: IsInput,
            image: url,
            username: currentUser.email,
            timestamp: new Date(),
            profilePic: username,
          });
        });
        return imageData;
      }
    );
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    uploadData,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    avatarMaker,
    progress,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
