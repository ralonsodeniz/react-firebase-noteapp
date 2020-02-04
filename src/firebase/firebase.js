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
      id: newNoteSnapshot.id,
      // this generates a timestamp in the server side
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
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

export const updateNoteBodyInFs = async (noteId, noteBody) => {
  let noteUpdated = null;
  try {
    const noteRef = firestore.doc(`notes/${noteId}`);
    const noteSnapshot = await noteRef.get();
    const storedNoteBody = noteSnapshot.data().body;
    if (storedNoteBody !== noteBody) {
      await noteRef.update({
        body: noteBody,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      noteUpdated = (await noteRef.get()).data();
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return noteUpdated;
};

export const updateNoteTitleInFs = async (noteId, noteTitle) => {
  let noteUpdated = null;
  try {
    const noteRef = firestore.doc(`notes/${noteId}`);
    const noteSnapshot = await noteRef.get();
    const storedNoteTitle = noteSnapshot.data().title;
    if (storedNoteTitle !== noteTitle) {
      await noteRef.update({
        title: noteTitle,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      noteUpdated = (await noteRef.get()).data();
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return noteUpdated;
};
