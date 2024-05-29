// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_SME4NNlkItZDVwUdwMxEvv3ni6XoeIw",
  authDomain: "todo-23d52.firebaseapp.com",
  projectId: "todo-23d52",
  storageBucket: "todo-23d52.appspot.com",
  messagingSenderId: "393839915840",
  appId: "1:393839915840:web:c423de89ecc4f2c12780a5",
  measurementId: "G-JGR2YN42XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;