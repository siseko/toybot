import { useReducer } from "react";
import reducer from "./reducer";

const useRobotState = () => {
  const [state, dispatch] = useReducer(reducer, { robot: null, report: null });
  return state;
};

export default useRobotState;
