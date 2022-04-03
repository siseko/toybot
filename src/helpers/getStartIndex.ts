import { Action } from "../types";
import isWithinBounds from "./isWithinBounds";

const getStartIndex = (actions: Action[]) => {
  let startIndex = -1;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (
      action.type === "PLACE" &&
      action.payload &&
      isWithinBounds(action.payload)
    ) {
      startIndex = i;
      break;
    }
  }

  return startIndex;
};

export default getStartIndex;
