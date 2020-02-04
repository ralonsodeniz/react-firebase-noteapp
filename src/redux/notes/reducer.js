import { NOTES } from "./types";

export const NOTES_INITIAL_STATE = {
  notesArray: [],
  selectedNote: null,
  noteUpdating: false,
  error: ""
};

const notesReducer = (state = NOTES_INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTES.GET_NOTES_SUCCESS:
      return {
        ...state,
        notesArray: action.payload,
        error: ""
      };
    case NOTES.GET_NOTES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case NOTES.SET_SELECTED_NOTE:
      return {
        ...state,
        selectedNote: action.payload
      };
    case NOTES.ADD_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case NOTES.REMOVE_NOTE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case NOTES.UPDATE_NOTE_START:
      return {
        ...state,
        noteUpdating: true
      };
    case NOTES.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        noteUpdating: false
      };
    case NOTES.UPDATE_NOTE_FAILURE:
      return {
        ...state,
        noteUpdating: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default notesReducer;
