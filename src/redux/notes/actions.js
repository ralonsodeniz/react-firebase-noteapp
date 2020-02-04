import { NOTES } from "./types";
import {
  addNoteInFs,
  deleteNoteInFs,
  updateNoteBodyInFs,
  updateNoteTitleInFs
} from "../../firebase/firebase";

export const getNotesSuccess = notes => ({
  type: NOTES.GET_NOTES_SUCCESS,
  payload: notes
});

export const getNotesFailure = error => ({
  type: NOTES.GET_NOTES_FAILURE,
  payload: error
});

export const setSelectedNote = selectedNote => ({
  type: NOTES.SET_SELECTED_NOTE,
  payload: selectedNote
});

export const addNoteStart = title => async dispatch => {
  try {
    const newNoteId = await addNoteInFs(title);
    dispatch(
      setSelectedNote({
        title,
        id: newNoteId,
        body: ""
      })
    );
  } catch (error) {
    console.log(`adding note failed, ${error}`);
    dispatch(addNoteFailure(error));
  }
};

export const addNoteFailure = error => ({
  type: NOTES.ADD_NOTE_FAILURE,
  payload: error
});

export const deleteNoteStart = noteId => async dispatch => {
  try {
    await deleteNoteInFs(noteId);
  } catch (error) {
    console.log(`removing note failed, ${error}`);
    dispatch(deleteNoteFailure(error));
  }
};

export const deleteNoteFailure = error => ({
  type: NOTES.REMOVE_NOTE_FAILURE,
  payload: error
});

export const updateNoteBodyStart = (noteId, noteBody) => async dispatch => {
  dispatch({
    type: NOTES.UPDATE_NOTE_START
  });
  try {
    await updateNoteBodyInFs(noteId, noteBody);
    // const updatedNote = await updateNoteBodyInFs(noteId, noteBody);
    // updatedNote && dispatch(setSelectedNote(updatedNote));
    dispatch({
      type: NOTES.UPDATE_NOTE_SUCCESS
    });
  } catch (error) {
    console.log(`updating note failed, ${error}`);
    dispatch(updateNoteFailure(error));
  }
};

export const updateNoteTitleStart = (noteId, noteTitle) => async dispatch => {
  dispatch({
    type: NOTES.UPDATE_NOTE_START
  });
  try {
    await updateNoteTitleInFs(noteId, noteTitle);
    // const updatedNote = await updateNoteTitleInFs(noteId, noteTitle);
    // updatedNote && dispatch(setSelectedNote(updatedNote));
    dispatch({
      type: NOTES.UPDATE_NOTE_SUCCESS
    });
  } catch (error) {
    console.log(`updating note failed, ${error}`);
    dispatch(updateNoteFailure(error));
  }
};

export const updateNoteFailure = error => ({
  type: NOTES.UPDATE_NOTE_FAILURE,
  payload: error
});
