import { RobotState } from "../types";

const printState = (state: RobotState | null) =>
  state !== null ? `${state?.x},${state?.y},${state?.direction}` : null;

export default printState;
