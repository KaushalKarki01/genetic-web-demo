import { RiRobot2Line } from "react-icons/ri";
import user from "../../assets/user.jpg";
import "../../styles/chat.css";
export default function ChatBubble({ message }) {
  const sender = message.sender === "patient";
  return (
    <div className={`chat-bubble-container ${sender ? "sent" : "received"}`}>
      <div className="user-img">
        {sender ? (
          <img src={user} alt="U" loading="lazy" />
        ) : (
          <RiRobot2Line className="icon" />
        )}
      </div>
      <div className={`chat-bubble ${sender ? "sender" : "receiver"} `}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
