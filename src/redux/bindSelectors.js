const bindSelectors = (selectors, state) => {
  const bindSlector = (selector, state) => {
    return () => selector(state);
  };

  if (typeof selectors === "function")
    return { [selectors.name]: bindSlector(selectors, state) };

  if (typeof selectors !== "object" || selectors === null) {
    throw new Error(
      `bindSelectors expected an object or a function, instead received ${
        selectors === null ? "null" : typeof selectors
      }`
    );
  }

  const boundSelectors = {};
  for (const key in selectors) {
    const selector = selectors[key];
    if (typeof selector === "function") {
      boundSelectors[key] = bindSlector(selector, state);
    }
  }
  return boundSelectors;
};

export default bindSelectors;
