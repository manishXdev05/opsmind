import { useState } from "react";
import API from "../services/api";
import Message from "./Message";
import { IoSend } from "react-icons/io5";

const ChatBox = ({ setRecentChats }) => {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setRecentChats((prev) => {

     if (prev.includes(question)) {
     return prev;
    }

    return [question, ...prev];
   });
    const currentQuestion = question;

    setQuestion("");

    try {

      setLoading(true);

      const response = await API.post("/chat", {
        question: currentQuestion,
      });

      const botMessage = {
        role: "bot",
        text: response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {

      const errorMessage = {
        role: "bot",
        text: "Something went wrong",
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="chat-page">
-
      {/* Messages */}
      <div className="messages-container">

        {messages.length === 0 && (
          <div className="welcome-container">
            <h1>How can I help you today?</h1>
          </div>
        )}

        {messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            text={msg.text}
          />
        ))}

        {loading && (
          <Message
            role="bot"
            text="Thinking..."
          />
        )}

      </div>

      {/* Input Area */}
      <div className="input-container">

        <textarea
          placeholder="Message OPSMIND AI..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {

              e.preventDefault();

              sendMessage();
            }
          }}
        />
        <button className="send-btn" onClick={sendMessage}>
        <IoSend />
        </button>
       
      </div>
    </div>
  );
};

export default ChatBox;