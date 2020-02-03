import React, {
  createContext,
  useCallback,
  useReducer,
  useContext
} from "react";
import rootReducer, { INITIAL_STATE } from "./root-reducer";
import { asyncer } from "./middlewares";

const StoreContext = createContext({
  state: null,
  dispatch: null
});
export const useStoreContext = () => useContext(StoreContext);

const Provider = ({ children }) => {
  const [state, basicDispatch] = useReducer(rootReducer, INITIAL_STATE);
  const dispatch = useCallback(asyncer(basicDispatch, state), []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default Provider;
