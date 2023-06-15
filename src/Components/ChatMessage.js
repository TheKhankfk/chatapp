// ChatMessage.js
// Import necessary dependencies and styles
import React from "react";
import { auth } from "../firebase";
import "./ChatMessage.css";
// Define the ChatMessage component and receive message, time, and sender as props
function ChatMessage({ message, time, sender }) {
  return (
    <div
      className="cm"
      style={{
        alignSelf: sender === auth?.currentUser?.email ? "flex-end" : "flex-start", backgroundColor: sender == auth?.currentUser?.email ? "#dcf8c6" : "#fff", }}
    >
      <div className="cm-text">
        <p>{message}</p>
      </div>
      <div className="cm-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
           {/* Display the formatted date and time */}
      </div>
    </div>
  );
}

export default ChatMessage;
// Export the ChatMessage component as the default export