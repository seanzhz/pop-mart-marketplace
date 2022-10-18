// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCortdZnrQynkuUL6zFEfV5vgyJdcvLoXs",
    authDomain: "pop-item-app.firebaseapp.com",
    projectId: "pop-item-app",
    storageBucket: "pop-item-app.appspot.com",
    messagingSenderId: "132470869612",
    appId: "1:132470869612:web:c57aba79cbc7774a185249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)