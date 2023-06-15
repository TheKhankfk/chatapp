import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile({ name, photoURL, email, lastMessage }) {
  const navigate = useNavigate();

  // Function to navigate to user's chat page
  const gtu = (emailId) => {
    // Check if the emailId is provided
    if (emailId) {
      // if provided navigate and add url to the said field
      navigate(`/${emailId}`);
    }
  };

  return (
    <div className="usp" onClick={() => gtu(email)}>
      {/* Image of the user */}
      <div className="usi">
        <img src={photoURL} alt="photo" />
      </div>
      {/* Name of the user */}
      <div className="usi">
        <p className="usn">{name}</p> {lastMessage && <p className="usl">{lastMessage}</p>}
      </div>
    </div>
  );
}

export default UserProfile;


/* The UserProfile component represents a user profile card.
It receives the following props:
name: The name of the user.
photoURL: The URL of the user's profile photo.
email: The email of the user.
lastMessage: The last message sent or received by the user.
The useNavigate hook is used to access the navigate function, which allows programmatic navigation within the application.
The goToUserChat function is defined to handle the click event on the user profile card. It takes the emailId as a parameter and uses the navigate function to navigate to the chat page of the selected user.
The JSX code defines the structure and layout of the user profile card.
The outermost div element has the class name "usp" and an onClick event listener that triggers the goToUserChat function when the profile card is clicked.
Inside the profile card, there are two div elements with the class name "usi". The first div contains an img element that displays the user's profile photo. The src attribute is set to the photoURL prop, and the alt attribute is set to "photo".
The second div contains a p element with the class name "usn" to display the user's name. Additionally, if the lastMessage prop is provided (not null or empty), a p element with the class name "usl" is rendered to display the last message.*/