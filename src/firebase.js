// firebase.js

import firebase from "firebase";

const firebaseConfig = {
  // Configuration object with Firebase project details
  apiKey: "AIzaSyDYwGJa2sGt7K_be6GlyDqw3CaMbAS4D0w",
  authDomain: "whatsapp-clone-3b1cc.firebaseapp.com",
  projectId: "whatsapp-clone-3b1cc",
  storageBucket: "whatsapp-clone-3b1cc.appspot.com",
  messagingSenderId: "843700833668",
  appId: "1:843700833668:web:b678b7f671faeb2514e1d1",
  measurementId: "G-8H0Q332HWG"
};

// Initialize Firebase app with the provided configuration
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase authentication service
const auth = firebase.auth();

// Initialize Firebase Firestore database service
const db = app.firestore();

// Create a GoogleAuthProvider instance for Google Sign-In
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Export the auth and googleProvider constants for other modules to use
export { auth, googleProvider };

// Export the db constant as the default export of the module
export default db;
