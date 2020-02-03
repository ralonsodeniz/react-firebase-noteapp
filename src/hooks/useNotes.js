import * as actions from "../store/notes/actions";
import * as selectors from "../store/notes/selectors";
import { useStoreContext } from "../store/store";
import bindActions from "../store/bindActions";
import bindSelectors from "../store/bindSelectors";

const useNotes = () => {
  const { state, dispatch } = useStoreContext();
  const notesActions = bindActions(actions, dispatch);
  const notesSelectors = bindSelectors(selectors, state);

  return { ...notesSelectors, ...notesActions };
};

export default useNotes;
