import { useEffect, useReducer } from "react";
import { Action } from "../types";
import reducer from "./reducer";

interface Props {
  actions: Action[];
  actionIndex: number;
}

const useRobotState = ({ actions, actionIndex }: Props) => {
  const [state, dispatch] = useReducer(reducer, { robot: null, report: null });

  useEffect(() => {
    dispatch(actions[actionIndex]);
  }, [actions, actionIndex]);

  return state;
};

export default useRobotState;
