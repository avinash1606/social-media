// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6gQhlvS0mx_3rNPkDpnSOsC6M4wKZOyg",
  authDomain: "social-media-a11b8.firebaseapp.com",
  projectId: "social-media-a11b8",
  storageBucket: "social-media-a11b8.appspot.com",
  messagingSenderId: "217351741899",
  appId: "1:217351741899:web:f0960d063d5498a711164e"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
 export const provider=new GoogleAuthProvider();

export const db=getFirestore(app);
