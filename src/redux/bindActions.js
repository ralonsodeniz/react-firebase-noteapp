const bindActions = (actions, dispatch) => {
  const bindAction = (action, dispatch) => {
    // since we need to access arguments we cannot use arrow function
    return function() {
      return dispatch(action.apply(null, arguments));
    };
  };

  if (typeof actions === "function")
    return { [actions.name]: bindAction(actions, dispatch) };

  if (typeof actions !== "object" || actions === null) {
    throw new Error(
      `bindActions expected an object or a function, instead received ${
        actions === null ? "null" : typeof actions
      }`
    );
  }

  const boundActions = {};
  for (const key in actions) {
    const action = actions[key];
    if (typeof action === "function") {
      boundActions[key] = bindAction(action, dispatch);
    }
  }
  return boundActions;
};

export default bindActions;
