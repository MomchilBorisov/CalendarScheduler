import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxM4uMb9PlEeLZHnVzo6eyjYCCjvYI2LM",
  authDomain: "calendar-workers.firebaseapp.com",
  projectId: "calendar-workers",
  storageBucket: "calendar-workers.firebasestorage.app",
  messagingSenderId: "213094904003",
  appId: "1:213094904003:web:0200f1204db3758391b276",
  measurementId: "G-W2DF2DPK4E"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
