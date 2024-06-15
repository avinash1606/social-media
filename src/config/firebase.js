

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjtSmGGf8zAundCHcX6ujQeaqyO5-Qz5o",
  authDomain: "social-media-cdbad.firebaseapp.com",
  projectId: "social-media-cdbad",
  storageBucket: "social-media-cdbad.appspot.com",
  messagingSenderId: "416281061215",
  appId: "1:416281061215:web:657e1317368990ef66b8ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
 export const provider=new GoogleAuthProvider();

export const db=getFirestore(app);
