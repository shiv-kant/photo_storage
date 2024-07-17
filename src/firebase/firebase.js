import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqfqyKyHlmYdz51vGmviTwQxt_7jRdStc",
  authDomain: "photo-gallery-ce8cb.firebaseapp.com",
  projectId: "photo-gallery-ce8cb",
  storageBucket: "photo-gallery-ce8cb.appspot.com",
  messagingSenderId: "562681981113",
  appId: "1:562681981113:web:59eee71a0e2e519198d368",
  measurementId: "G-RW6Y3K8SVB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, storage, database };