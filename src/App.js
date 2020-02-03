import React, { useEffect } from "react";
import { firestore } from "./firebase/firebase";

import { useStoreContext } from "./redux/store";
import { getNotesSuccess, getNotesFailure } from "./redux/notes/actions";

import Editor from "./components/editor/editor";
import Sidebar from "./components/sidebar/sidebar";

import "./App.css";

function App() {
  const { dispatch } = useStoreContext();

  useEffect(() => {
    const unsubscribe = firestore.collection(`notes`).onSnapshot(snapshot => {
      try {
        const notes = snapshot.docs.map(note => {
          const data = note.data();
          const enhancedData = { ...data, id: note.id };
          return enhancedData;
        });
        dispatch(getNotesSuccess(notes));
      } catch (error) {
        dispatch(getNotesFailure(error));
        console.log("error while getting notes from db", error);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
