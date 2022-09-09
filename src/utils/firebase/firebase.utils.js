// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxKqPDbaaBO6qhbHLlV6Rb6vi_oXMPwKE",
  authDomain: "crwn-clothing-db-45281.firebaseapp.com",
  projectId: "crwn-clothing-db-45281",
  storageBucket: "crwn-clothing-db-45281.appspot.com",
  messagingSenderId: "618774870298",
  appId: "1:618774870298:web:12e760d6f7823ac0da54a3"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

//Class
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

//Function
export const auth = getAuth();

//---------Google Popup----------
export const signInWithGooglePopup =  () => signInWithPopup(auth, googleProvider);

//---------Google Redirect----------
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth)
    return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShop = await getDoc(userDocRef);

  if(!userSnapShop.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    }
    catch(error){
      console.log('error creating user', error.message);
    }
  }
  
  return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password)
    return;

  return await createUserWithEmailAndPassword(auth, email, password);
} 

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password)
    return;

  return await signInWithEmailAndPassword(auth, email, password);
} 

export const signOutUser = async () =>  await signOut(auth);

export const onAuthStateChangedListerner = (callback) => onAuthStateChanged(auth, callback);