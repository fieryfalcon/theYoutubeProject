import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBmLbEtZv0XaeggWLTuG-5Z6mExjR0heeE",
  authDomain: "agent-74b6a.firebaseapp.com",
  projectId: "agent-74b6a",
  storageBucket: "agent-74b6a.firebasestorage.app",
  messagingSenderId: "335709440301",
  appId: "1:335709440301:web:d04bdbc293fbe306872ba4",
  measurementId: "G-N33J808EWS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
