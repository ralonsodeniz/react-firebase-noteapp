import { useState, useEffect } from "react";

// debounce hook to not write to the db until the user has stopped writting a note for a certain ammount of time

export const useDebounce = (value, delay) => {
  // state and setter for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // we create a handler to set debouncedValue to value after the specified delay and to be able to cancel it in the cleanup function
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      // the cleanup function will clean the timeout everytime the input value changes. this prevents debouncedValue to be changed while the delay period
      // useEffect cleanup function is executed on component unmounts and also it cleans up effects from the previous render before runing effects next time (renders or executions)
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// function that removes html tags for the note preview
export const removeHTMLTags = str => {
  return str.replace(/<[^>]*>?/gm, "");
};
