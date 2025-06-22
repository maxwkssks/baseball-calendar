// Firebase 설정 및 Firestore 내보내기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsKo_o-bHGFf3VYr3I11rLPkPXKeq0kPg",
  authDomain: "baseball-schedule-58a7d.firebaseapp.com",
  projectId: "baseball-schedule-58a7d",
  storageBucket: "baseball-schedule-58a7d.firebasestorage.app",
  messagingSenderId: "35362116232",
  appId: "1:35362116232:web:7dd2cbfd89066bf041053d",
  measurementId: "G-N77LKB6BFJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
