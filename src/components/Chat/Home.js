import React from "react";
import "./Home.css";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./ChatFeed";
import { useAuth } from "../../Store/AuthContext";
function Home() {
  const { currentUser } = useAuth();
  const password = localStorage.getItem("password");
  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_CHATENGINE_ID}
      userName={currentUser.email}
      userSecret={password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}

export default Home;
