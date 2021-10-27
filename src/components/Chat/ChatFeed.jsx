import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
// import { Avatar } from "@material-ui/core";
// import { useAuth } from "../../Store/AuthContext";
const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];
  // const { avatarMaker } = useAuth();
  const renderReadReceipts = (message, isMyMessage) => {
    // const name = avatarMaker(message.sender.username);
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read ${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
            }}
          >
            {/* <Avatar
              style={{
                backgroundColor: "lightskyblue",
                fontSize: "14px",
              }}
            >
              {name}
            </Avatar> */}
          </div>
        )
    );
  };
  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={message[lastMessageKey]}
              />
            )}
          </div>

          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) {
    return (
      <h4 style={{ textAlign: "center", marginTop: "40px" }}>
        You Don't have any chat yet!!
      </h4>
    );
  }
  return (
    <div className="chat-feed">
      <div className="chat-title">{chat.title}</div>

      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
