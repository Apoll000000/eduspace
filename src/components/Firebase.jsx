// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Firebase configuration (use environment variables for sensitive data)
const firebaseConfig = {
    apiKey: "AIzaSyDIo7W3Ix12q7qJuWLQQvPcCbfkym1LOl8",
    authDomain: "eduspace-46e11.firebaseapp.com",
    projectId: "eduspace-46e11",
    storageBucket: "eduspace-46e11.firebasestorage.app",
    messagingSenderId: "300500573262",
    appId: "1:300500573262:web:9efae4d1506eb21397771f",
    measurementId: "G-TBQY235JS1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers for Google and Facebook
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export auth and providers
export { auth, googleProvider, facebookProvider };
