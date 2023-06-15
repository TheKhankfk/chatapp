// ChatPage.js
// Import necessary dependencies and components
import React from "react";
import Chatcontainer from "./Chatcontainer";
import Sidebar from "./Sidebar";
import "./ChatPage.css";
// Define the ChatPage component and receive currentUser and signOut as props
function ChatPage({ currentUser, signOut }) {
  return (
    <div className="cp">
      <div className="cpcontainer">
 {/* Render the Sidebar component and pass currentUser and signOut as props */}
        <Sidebar currentUser={currentUser} signOut={signOut} />
 {/* Render the Chatcontainer component and pass currentUser as a prop */}
        <Chatcontainer currentUser={currentUser} />
      </div>
    </div>
  );
}

export default ChatPage;
