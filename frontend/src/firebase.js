// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAjCGYWSc6_cvA4mnks1waPGt9GuJF4_pg",
  authDomain: "college-questions.firebaseapp.com",
  projectId: "college-questions",
  storageBucket: "college-questions.appspot.com",
  messagingSenderId: "1043407644814",
  appId: "1:1043407644814:web:b8f5b1adaf7f74af0f41df",
  measurementId: "G-HZXH8MECBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, auth, provider };
