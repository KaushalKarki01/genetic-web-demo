import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import "../../styles/chat.css";
import ChatBubble from "./ChatBubble";
const initialMessage = [
  {
    id: 1,
    text: "Welcome User for joining this platform. I am virtual assistant for Dr. Jon who is specialized with genetic conditions. I can help you summarize your genetic conditions with doctor. Please share how are you doing recently",
    sender: "AI",
  },
];
export default function ChatBox() {
  const savedMessages = localStorage.getItem("chats");
  const [messages, setMessages] = useState(
    savedMessages ? JSON.parse(savedMessages) : initialMessage
  );
  const [chat, setChat] = useState("");

  // reference for chat scroll
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [atBottom, setAtBottom] = useState(true);

  function scrollToBottom() {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;

    setAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
  }

  useEffect(
    function () {
      if (atBottom) {
        scrollToBottom();
      }
    },
    [messages, atBottom]
  );

  function handleSendMessage(e) {
    e.preventDefault();
    if (!chat) return;
    const newMessage = { id: Date.now(), text: chat, sender: "patient" };
    const allMessages = [...messages, newMessage];
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessages(allMessages);
    localStorage.setItem("chats", JSON.stringify(allMessages));
    setChat("");

    // simulating ai response
    setTimeout(() => {
      let aiResponse;
      if (chat.toLowerCase().includes("health")) {
        aiResponse =
          "Thank you for sharing your information. I have few questions for you which will take around 15 minutes to answer. Let me know when you are ready to answer these. I will then send the summary of your response for incoming visit with upcoming assistant.";
      } else if (chat.toLowerCase().includes("sure")) {
        aiResponse =
          "Okay lets get started. Can you provide brief summary on when you started seeing the symptoms and what were the symptoms";
      } else if (chat.toLowerCase().includes("symptoms")) {
        aiResponse =
          "Hello Doctor, based on my previous interactions with User, I have summarized the following information about her health conditions. 1. Health history 2. Family conditons 3. Life style 4. Previous treatments 5. Medications";
      } else {
        aiResponse =
          "I couldn't get what exactly is your health problem and symptoms. ";
      }

      const response = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, response]);
    }, 2000);
  }

  return (
    <div className="chatbox">
      <div className="chat-body" ref={chatContainerRef} onScroll={handleScroll}>
        <ul className="messages">
          {messages.map((message) => (
            <ChatBubble message={message} key={message.id} />
          ))}
          <div ref={chatEndRef} />
        </ul>
      </div>

      <div className="chat-input">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />

          <button className="btn">
            <MdSend className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
