export const asyncer = (dispatch, state) => action => {
  typeof action === "function" ? action(dispatch, state) : dispatch(action);
};

export const logger = (prevState, currentState, action) => {
  console.groupCollapsed("Logger");
  console.log("%c Action:", "color:blue", action);
  console.log("%c Previous State:", "color:red", prevState);
  console.log("%c Current State", "color:green", currentState);
  console.groupEnd();
};
