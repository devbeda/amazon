// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKzwXe1eiG34z9uP5BucPkQso7amWgXuo",
  authDomain: "fir-6e324.firebaseapp.com",
  projectId: "fir-6e324",
  storageBucket: "fir-6e324.appspot.com",
  messagingSenderId: "886349812469",
  appId: "1:886349812469:web:b97ef749a9344450136bbc",
  measurementId: "G-SHP1Z2G8R8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig
