import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzdJhPjvp2UQe3W27Pal9Ztc9YqU_4UQM',
  authDomain: 'edusynthpro.firebaseapp.com',
  projectId: 'edusynthpro',
  storageBucket: 'edusynthpro.appspot.com',
  messagingSenderId: '375546912831',
  appId: '1:375546912831:web:7f6f41f83e3674d480d88a'
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export { app, auth, db, functions }
