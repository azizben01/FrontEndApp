// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR848LF9AH-osW_2kgFVOUTAwfDevKiEw",
  authDomain: "swift-app-ce295.firebaseapp.com",
  projectId: "swift-app-ce295",
  storageBucket: "swift-app-ce295.appspot.com",
  messagingSenderId: "1079355532010",
  appId: "1:1079355532010:web:62854207fff11bbd0a6d93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };