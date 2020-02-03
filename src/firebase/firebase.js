import firebase from "firebase/app";
import "firebase/firestore";

// firebase init
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
firebase.firestore();

// firebase firestore functions
export const addNoteInFs = async title => {
  try {
    const newNoteRef = firestore.collection("notes").doc();
    const newNoteSnapshot = await newNoteRef.get();
    await newNoteRef.set({
      title,
      body: "",
      id: newNoteSnapshot.id
    });
    return newNoteSnapshot.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteNoteInFs = async noteId => {
  try {
    const noteREf = firestore.doc(`notes/${noteId}`);
    await noteREf.delete();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateNoteInFs = async (noteId, noteBody) => {
  try {
    const noteRef = firestore.doc(`notes/${noteId}`);
    await noteRef.update({
      body: noteBody
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
