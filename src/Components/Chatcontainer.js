// ChatContainer.js
// Import necessary dependencies and styles
import React, { useEffect, useRef, useState } from "react";
import "./Chatcontainer.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import "./Chatcontainer.css";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";

// Define the Chatcontainer component and receive currentUser as a prop
function Chatcontainer({ currentUser }) {
  // Define state variables
  const [message, setMessage] = useState(""); // State variable to store the chat message
  const [openEmojiBox, setOpenEmojiBox] = useState(false); // State variable to manage the emoji box visibility
  const { emailID } = useParams(); // Get the email ID from the URL parameters
  const [chatUser, setcusr] = useState({}); // State variable to store the chat user information
  const chatBox = useRef(null); // Create a ref for the chat box element
  const [chatMessages, setchm] = useState([]); // State variable to store the chat messages


  useEffect(() => {
    // Function to fetch the user details for the chat
    const gusr = async () => {
      const data = await db .collection("users") .doc(emailID) .onSnapshot((snapshot) => {
          setcusr(snapshot.data());
        });
    };

    // Function to fetch the chat messages
    const gtm = async () => {
      const data = await db .collection("chats") .doc(emailID) .collection("messages") .orderBy("timeStamp", "asc") .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data()); //
          let nm = messages.filter( (message) => message.senderEmail === (currentUser.email || emailID) || message.receiverEmail === (currentUser.email || emailID));
          setchm(nm);
        });
    };

    // Fetch the user and messages on component mount or when emailID changes
    gusr();
    gtm();
  }, [emailID]);

  /* The useEffect hook is used in React to perform side effects such as data fetching, subscriptions, or manually changing the DOM. 
  It takes two arguments: a callback function and a dependency array.
In this code, the useEffect hook is executed whenever the value of emailID changes. It is responsible for fetching user details and chat messages
 from a database (presumably Firestore) based on the provided emailID.
Inside the useEffect callback, two functions are defined: gusr and gtm.
The gusr function fetches user details from the Firestore collection "users" by querying the document with the ID emailID. 
It uses the onSnapshot method to listen for real-time updates on the document. Whenever there is a change, the callback function passed to
 onSnapshot is executed, and it calls setcusr to update the user details in the component's state.
The gtm function fetches chat messages from the Firestore collection "chats" within the document identified by emailID. It then fetches the 
"messages" sub-collection, orders them by the "timeStamp" field in ascending order, and listens for real-time updates using onSnapshot. 
When there is a change, the callback function is executed. The fetched messages are mapped using snapshot.docs.map to extract the data of 
each message. The resulting array is filtered based on the condition provided to include only messages where the sender or receiver email
 matches the current user's email (currentUser.email) or emailID. Finally, the filtered messages are updated in the component's state using 
 setchm.*/


  useEffect(() => {
    // Scroll to the bottom of the chat box when new messages are added
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);
  const send = (e) => {
    e.preventDefault();
    if (emailID) {
      // Create a payload object with the message details
      let payload = {
        text: message, // The message content
        senderEmail: currentUser.email, // Email of the sender
        receiverEmail: emailID, // Email of the receiver
        timeStamp: firebase.firestore.Timestamp.now(), // Current timestamp
      };

      // Send the message payload to the sender's chat collection
      db.collection("chats") .doc(currentUser.email) .collection("messages") .add(payload);

      // Send the message payload to the receiver's chat collection
      db.collection("chats").doc(emailID).collection("messages").add(payload);
      // Update the sender's Friendlist with the chat user's details
      db.collection("Friendlist") .doc(currentUser.email) .collection("list") .doc(emailID) .set({ email: chatUser.email, fullname: chatUser.fullname,  photoURL: chatUser.photoURL, lastMessage: message,});

      // Update the receiver's Friendlist with the sender's details
      db.collection("Friendlist")
        .doc(emailID) .collection("list") .doc(currentUser.email) .set({ email: currentUser.email, fullname: currentUser.fullname, photoURL: currentUser.photoURL, lastMessage: message, });
      // Clear the message input field
      setMessage("");
    }
  };

  return (
    <div className="chcnt">
      <div className="chcnt-header">
        <div className="chuser-inf">
          <div className="chat-user-img">
            <img src={chatUser?.photoURL} alt="" />
          </div>
          <p>{chatUser?.fullname}</p>
        </div>

        <div className="chcntheader-btn">
         
        </div>
      </div>

      {/* chatdisplay-container */}

      <div className="chdiscnt" ref={chatBox}>
        {chatMessages.map((message) => (
          <ChatMessage message={message.text} time={message.timeStamp} sender={message.senderEmail}
          />
        ))}
      </div>
      {/* chatinput */}

      <div className="chat-input">
        {/* buttons */}
        {openEmojiBox && (
          <Picker
            onEmojiClick={(event, emojiObject) => setMessage(message + emojiObject.emoji) }
          />
        )}

        <div className="chat-input-btn">
          <InsertEmoticonIcon onClick={() => setOpenEmojiBox(!openEmojiBox)} />
          
        </div>
        {/* text input element */}
        <form onSubmit={send}>
          <input type="text" placeholder="Type a Message" value={message} onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>
        {/* send button */}
        <div className="chat-input-send-btn" onClick={send}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default Chatcontainer;
