export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface RobotState {
  x: number;
  y: number;
  direction: Direction;
}
