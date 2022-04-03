import { TABLE_HEIGHT, TABLE_WIDTH } from "../constants";
import { RobotState } from "../types";

const isWithinBounds = ({ x, y }: RobotState) =>
  x >= 0 && x < TABLE_WIDTH && y >= 0 && y < TABLE_HEIGHT;

export default isWithinBounds;
