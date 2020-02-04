import React, { useEffect, useMemo } from "react";
import { firestore } from "./firebase/firebase";
import { createStructuredSelector } from "reselect";

import { useStoreContext } from "./redux/store";
import { getNotesSuccess, getNotesFailure } from "./redux/notes/actions";
import { selectNote } from "./redux/notes/selectors";

import Editor from "./components/editor/editor";
import Sidebar from "./components/sidebar/sidebar";

import "./App.css";

const selectAppData = createStructuredSelector({
  selectedNote: selectNote
});

const App = () => {
  const { state, dispatch } = useStoreContext();

  const { selectedNote } = selectAppData(state);

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

  return useMemo(
    () => (
      <div>
        <Sidebar />
        {selectedNote && <Editor />}
      </div>
    ),
    [selectedNote]
  );
};

export default App;
