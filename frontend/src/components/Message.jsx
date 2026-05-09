const Message = ({ role, text }) => {

  return (
    <div
      className={
        role === "user"
          ? "message user-message"
          : "message bot-message"
      }
    >
      {text}
    </div>
  );
};

export default Message;