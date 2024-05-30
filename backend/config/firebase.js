const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Add Firebase SDK Snippet
const firebaseConfig = {
  apiKey: "AIzaSyB_SME4NNlkItZDVwUdwMxEvv3ni6XoeIw",
  authDomain: "todo-23d52.firebaseapp.com",
  databaseURL: "https://todo-23d52z.firebaseio.com",
  projectId: "todo-23d52",
  storageBucket: "todo-23d52.appspot.com",
  messagingSenderId: "393839915840",
  appId: "1:393839915840:web:c423de89ecc4f2c12780a5",
  measurementId: "G-JGR2YN42XL"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
