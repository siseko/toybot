import { Action, Direction, RobotState } from "../types";

export interface ReducerState {
  robot: RobotState | null;
  report: RobotState | null;
}

const moveMap: { [key in Direction]: [number, number] } = {
  NORTH: [0, 1],
  SOUTH: [0, -1],
  EAST: [1, 0],
  WEST: [-1, 0],
};

const move = ({ x, y, direction }: RobotState) => {
  const [xOffset, yOffset] = moveMap[direction];
  return {
    x: x + xOffset,
    y: y + yOffset,
    direction,
  };
};

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "PLACE":
      return { ...state, robot: action.payload, report: null };
    case "REPORT":
      return { ...state, report: state.robot };
    case "RIGHT":
      return {
        ...state,
        robot: state.robot
          ? { ...state.robot, direction: "EAST" }
          : state.robot,
        report: null,
      };
    case "LEFT":
      return {
        ...state,
        robot: state.robot
          ? { ...state.robot, direction: "WEST" }
          : state.robot,
        report: null,
      };
    case "MOVE":
      return {
        ...state,
        robot: state.robot ? move(state.robot) : state.robot,
        report: null,
      };
    default:
      return state;
  }
};

export default reducer;
