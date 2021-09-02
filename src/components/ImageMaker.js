import { useAuth } from "../Store/AuthContext";
import "./ImageMaker.css";
const ImageMaker = () => {
  const { currentUser } = useAuth();
  const intials = currentUser.email
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  return (
    <>
      <div className="profileImage">{intials}</div>
    </>
  );
};

export default ImageMaker;
