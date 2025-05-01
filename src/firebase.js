// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, runTransaction } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCw7WyTKa8K_zWTqe5G-P5d5YBVoAh2oB8",
  authDomain: "saygiylasunarreactions.firebaseapp.com",
  databaseURL: "https://saygiylasunarreactions-default-rtdb.firebaseio.com",
  projectId: "saygiylasunarreactions",
  storageBucket: "saygiylasunarreactions.appspot.com",
  messagingSenderId: "671750121223",
  appId: "1:671750121223:web:a4f5b5f5e0aab228e6c7a2"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db, ref, onValue, runTransaction }