import { useState } from "react";

export const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const set = (value) => {
    setState({
      ...state,
      ...(value instanceof Function ? value(state) : value),
    });
  };

  return [state, set];
};
