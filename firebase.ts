import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Auth helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
export const signUpWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
export const logOut = () => signOut(auth)
export const onAuthChange = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)

// Firestore helpers
export const createUserProfile = async (userId: string, data: any) => {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    createdAt: serverTimestamp(),
    credits: 5,
    plan: 'free',
    videosGenerated: 0,
  })
}

export const getUserProfile = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId))
  return docSnap.exists() ? docSnap.data() : null
}

export const updateUserProfile = async (userId: string, data: any) => {
  await updateDoc(doc(db, 'users', userId), data)
}

export const addVideoHistory = async (userId: string, videoData: any) => {
  await addDoc(collection(db, 'users', userId, 'videos'), {
    ...videoData,
    createdAt: serverTimestamp(),
  })
}

export const getVideoHistory = async (userId: string, limitCount: number = 20) => {
  const q = query(
    collection(db, 'users', userId, 'videos'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export { app }
