import "./Notification.css";
const NotificationItem = ({ user, message }) => {
  return (
    <div className="wrapperNotification">
      <h2 className="notificationH2">{user} has Posted New Post</h2>
      {/* <p className="notificationPtag"></p> */}
    </div>
  );
};
export default NotificationItem;
