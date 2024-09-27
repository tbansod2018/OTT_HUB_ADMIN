// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaOGDve2D9kGwNlZxKdgIVG13BODMznYA",
    authDomain: "otthub-ba9cc.firebaseapp.com",
    projectId: "otthub-ba9cc",
    storageBucket: "otthub-ba9cc.appspot.com",
    messagingSenderId: "260527336015",
    appId: "1:260527336015:web:8e1cf4e1653e892ee3d83a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };