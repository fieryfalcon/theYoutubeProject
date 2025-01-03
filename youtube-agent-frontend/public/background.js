import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmLbEtZv0XaeggWLTuG-5Z6mExjR0heeE",
  authDomain: "agent-74b6a.firebaseapp.com",
  projectId: "agent-74b6a",
  storageBucket: "agent-74b6a.firebasestorage.app",
  messagingSenderId: "335709440301",
  appId: "1:335709440301:web:3b44d2ee5af5512a872ba4",
  measurementId: "G-G6L6QDQXPZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "SIGN_IN_WITH_GOOGLE") {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      sendResponse({ success: true, user });
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "YOUTUBE_VIDEO_URL") {
    console.log("YouTube Video URL Received:", message.url);
  }
});
