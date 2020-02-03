import { createSelector } from "reselect";

const selectNotes = state => state.notes;

export const selectNotesArray = createSelector(
  [selectNotes],
  notes => notes.notesArray
);

export const selectNote = createSelector(
  [selectNotes],
  notes => notes.selectedNote
);

export const selectNoteId = createSelector(
  [selectNotes],
  notes => notes.selectedNoteId
);

export const selectError = createSelector([selectNotes], notes => notes.error);
