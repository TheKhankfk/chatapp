import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

import ChatPage from "./Components/ChatPage";
import { useState } from "react";
import Login from "./Components/Login";
import { auth } from "./firebase";

function App() {
  // State to store the current user retrieved from local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Function to sign out the user
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Clear user state and remove user from local storage
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          // If user is logged in, render the chat page or home page based on the route
          <Routes>
            <Route
              path="/:emailID"
              element={<ChatPage currentUser={user} signOut={signOut} />}
            />
            <Route
              path="/"
              element={<Home currentUser={user} signOut={signOut} />}
            />
          </Routes>
        ) : (
          // If user is not logged in, render the login page
          <Login setUser={setUser} />
        )}
      </div>
    </Router>
  );
}

export default App;
