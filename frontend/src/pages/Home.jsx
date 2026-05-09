import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

const Home = () => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [recentChats, setRecentChats] =
    useState([]);

  const toggleSidebar = () => {

    setSidebarOpen(!sidebarOpen);

  };

  return (

    <div className="app-container">

      <Sidebar
        chats={recentChats}
        sidebarOpen={sidebarOpen}
      />

      <div className="main-content">

        <Navbar
          toggleSidebar={toggleSidebar}
        />

        <ChatBox
          setRecentChats={setRecentChats}
        />

      </div>

    </div>
  );
};

export default Home;