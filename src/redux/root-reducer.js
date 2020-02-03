import notesReducer from "./notes/reducer";
import { NOTES_INITIAL_STATE } from "./notes/reducer";
import { logger } from "./middlewares";

export const INITIAL_STATE = {
  notes: NOTES_INITIAL_STATE
};

const rootReducer = (state = INITIAL_STATE, action) => {
  const { notes } = state;
  const currentState = {
    notes: notesReducer(notes, action)
  };

  logger(state, currentState, action);

  return currentState;
};

export default rootReducer;
