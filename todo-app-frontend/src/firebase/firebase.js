
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZLV-gwrpZjpk1D7GPB3p_ujmg5SuS4lE",
  authDomain: "todo-app-d57d7.firebaseapp.com",
  projectId: "todo-app-d57d7",
  storageBucket: "todo-app-d57d7.appspot.com",
  messagingSenderId: "954816109688",
  appId: "1:954816109688:web:957dd99b681283c4a9218d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{ app , auth};