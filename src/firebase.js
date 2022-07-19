// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCG-zgHkJlQrLLSJlFKVF3MQcNHab-WMTg',
  authDomain: 'todo-list-d7b07.firebaseapp.com',
  databaseURL: 'https://todo-list-d7b07-default-rtdb.firebaseio.com',
  projectId: 'todo-list-d7b07',
  storageBucket: 'todo-list-d7b07.appspot.com',
  messagingSenderId: '465390582528',
  appId: '1:465390582528:web:f4f1a65e07dff1748411e5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()
