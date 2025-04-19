// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSk6bdI_JsCayOmacdgIcXAVbsF3hjhRs",
  authDomain: "linkedin-clone-32232.firebaseapp.com",
  projectId: "linkedin-clone-32232",
  storageBucket: "linkedin-clone-32232.appspot.com", // Fixed storage bucket
  messagingSenderId: "512608555160",
  appId: "1:512608555160:web:f4324bb50a54ce4acf80ed",
  measurementId: "G-XXXXXXXXXX" // Add from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();