// Sidebar.js

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import UserProfile from "./UserProfile";
import db from "../firebase";

function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAUS] = useState([]);
  const [searchInput, setsri] = useState("");
  const [friendList, setFL] = useState([]);

  useEffect(() => {
    const gau = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        // Filter out the current user from the list of all users
        setAUS( snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
          // Use the filter method on the array of document snapshots
        // Only include the documents where the email is not equal to the current user's email
        );
      });
    };
// Define an asynchronous function named "gaf" to fetch the friend list
    const gaf = async () => {
      // Fetch the "Friendlist" collection for the current user's email
      const data = await db
        .collection("Friendlist") .doc(currentUser.email) .collection("list") .onSnapshot((snapshot) => {
          // Set the friend list of the current user
          // The onSnapshot method sets up a real-time listener for changes in the collection
          // Set the friend list of the current user by extracting the document snapshots from the snapshot
          setFL(snapshot.docs);
        });
    };

    gau();
    gaf();
  }, []);

  // Filter the users based on the search input
  const sdu = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });
// Use the map method on the "sdu" array to iterate over each element and generate a new array of UserProfile components
  const sri = sdu.map((user) => {
    return (
      <UserProfile
      // Create a UserProfile component for each user
        name={user.data().fullname} photoURL={user.data().photoURL} key={user.id} email={user.data().email}
      />
    );
  });

  return (
    <div className="sdb">Sign Out
      <div className="sdbheader">
        <div className="sdbheader-img" onClick={signOut}>
          <img src={currentUser?.photoURL} alt="" /> 
        </div>
        <div className="sdbheader-btn">
          {currentUser.fullname}
        </div>
      </div>

      <div className="sdbsearch">
        <div className="sdbsearch-input">
          <SearchIcon />
          <input
            type="text" name="search" placeholder="Search..." value={searchInput} onChange={(e) => setsri(e.target.value)}
          />
        </div>
      </div>
      {/* Render a <div> element with the class name "sdbchat-list"*/}
      <div className="sdbchat-list">
      {/* If the "sri" array has elements, render the elements of the "sri" array*/}
        {sri.length > 0
          ? sri
          : friendList.map((friend) => (
            /*  If the "sri" array is empty, render UserProfile components for each friend in the "friendList" array */ 
              <UserProfile
               // Pass the name, photoURL, lastMessage, and email as props to the UserProfile component
                name={friend.data().fullname} photoURL={friend.data().photoURL} lastMessage={friend.data().lastMessage} email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;
