const Sidebar = ({ chats, sidebarOpen }) => {

  return (

    <div
      className={
        sidebarOpen
          ? "sidebar open"
          : "sidebar"
      }
    >

      <h3>Recent Chats</h3>

      <div className="chat-history">

        {chats.length === 0 ? (

          <p>No chats yet</p>

        ) : (

          chats.map((chat, index) => (

            <div
              key={index}
              className="chat-item"
            >
              {chat}
            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default Sidebar;