// Home.js
// Import the necessary dependencies (React, Home.css, and Sidebar component)

import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
// Define the Home component which receives currentUser and signOut as props
function Home({ currentUser, signOut }) {
  return (
    <div className="hm">
      <div className="hmc">
         {/* Render the Sidebar component and pass currentUser and signOut as props */}
        <Sidebar currentUser={currentUser} signOut={signOut} />
        {/* Container with originally planned background image later squandered */}
        <div className="hmbg">
          <img src="public/m6.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
