// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,  //add NEXT_PUBLIC_[key] to make a public key protected by next.js 
  authDomain: "insta-next-53a7e.firebaseapp.com",
  projectId: "insta-next-53a7e",
  storageBucket: "insta-next-53a7e.appspot.com",
  messagingSenderId: "278688807923",
  appId: "1:278688807923:web:aeb0732cae73ce338db086"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);