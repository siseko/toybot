import isWithinBounds from "../helpers/isWithinBounds";
import { Action, Direction, RobotState } from "../types";

export interface ReducerState {
  robot: RobotState | null;
  report: RobotState | null;
}

const coordinateOffset: { [key in Direction]: [number, number] } = {
  NORTH: [0, 1],
  SOUTH: [0, -1],
  EAST: [1, 0],
  WEST: [-1, 0],
};

const move = ({ x, y, direction }: RobotState) => {
  const [xOffset, yOffset] = coordinateOffset[direction];
  return {
    x: x + xOffset,
    y: y + yOffset,
    direction,
  };
};

const reducer = (state: ReducerState, action: Action) => {
  let nextState: ReducerState;
  switch (action.type) {
    case "PLACE":
      nextState = { ...state, robot: action.payload, report: null };
      break;
    case "REPORT":
      nextState = { ...state, report: state.robot };
      break;
    case "RIGHT":
      nextState = {
        ...state,
        robot: state.robot
          ? { ...state.robot, direction: "EAST" }
          : state.robot,
        report: null,
      };
      break;
    case "LEFT":
      nextState = {
        ...state,
        robot: state.robot
          ? { ...state.robot, direction: "WEST" }
          : state.robot,
        report: null,
      };
      break;
    case "MOVE":
      nextState = {
        ...state,
        robot: state.robot ? move(state.robot) : state.robot,
        report: null,
      };
      break;
  }

  return nextState.robot !== null && isWithinBounds(nextState.robot)
    ? nextState
    : state;
};

export default reducer;
