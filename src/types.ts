export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface RobotState {
  x: number;
  y: number;
  direction: Direction;
}

export interface Action {
  type: "PLACE" | "REPORT" | "MOVE" | "RIGHT" | "LEFT";
  payload: RobotState | null;
}
