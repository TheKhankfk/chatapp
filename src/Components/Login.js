// Login.js
//nu  xd dhcnewUser

import React from "react";
import db, { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
  const navigate = useNavigate();
// Access the useNavigate hook from react-router-dom
  const siwg = () => {
     // Use the signInWithPopup method of the auth object to initiate the Google sign-in process
    auth
      .signInWithPopup(googleProvider) .then((res) => {
        // Create a new user object with relevant information from the authentication result
        // The result of successful sign-in is stored in the "res" object
        // Create a new user object with relevant information from the authentication result
        const nu = {
          fullname: res.user.displayName, email: res.user.email, photoURL: res.user.photoURL,
        };
        // Navigate to the home page
        navigate("/");
        // Set the user in the state
        setUser(nu);
        // Store the user object in local storage
        localStorage.setItem("user", JSON.stringify(nu));
        // Save the user object in the database
        db.collection("users").doc(res.user.email).set(nu);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="lgn">
      <div className="lgn-cntr">
        <img className="lgn-logo" src="./logo1.jpeg" alt="" />
        <p className="lgn-name">ChatSphere</p>
        <button className="lgn-btn" onClick={siwg}>
          <img src="./google-logo.png" alt="login with google" />
          Login via Google
        </button>
      </div>
    </div>
  );
}

export default Login;
