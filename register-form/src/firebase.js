// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxHIS0conTZdnjW0QONW4wFkpUG1lF6kI",
  authDomain: "register-form-project.firebaseapp.com",
  projectId: "register-form-project",
  storageBucket: "register-form-project.firebasestorage.app",
  messagingSenderId: "436463288943",
  appId: "1:436463288943:web:7ca42a949bc651d953c39a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
