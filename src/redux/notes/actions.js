import { NOTES } from "./types";
import {
  addNoteInFs,
  deleteNoteInFs,
  updateNoteInFs
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

export const updateNoteStarts = (noteId, noteBody) => async dispatch => {
  try {
    await updateNoteInFs(noteId, noteBody);
  } catch (error) {
    console.log(`updating note failed, ${error}`);
    dispatch(updateNoteFailure(error));
  }
};

export const updateNoteFailure = error => ({
  type: NOTES.UPDATE_NOTE_FAILURE,
  payload: error
});
