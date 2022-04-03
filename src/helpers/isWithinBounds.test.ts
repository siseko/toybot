import { TABLE_HEIGHT, TABLE_WIDTH } from "../constants";
import { RobotState } from "../types";
import isWithinBounds from "./isWithinBounds";

const coords = (x: number, y: number): RobotState => ({
  x,
  y,
  direction: "NORTH",
});

describe("isWithinBounds", () => {
  it("(-1, 0) -> false", () => {
    expect(isWithinBounds(coords(-1, 0))).toBe(false);
  });

  it("(0, -1) -> false", () => {
    expect(isWithinBounds(coords(0, -1))).toBe(false);
  });

  it("(5, 0) -> false", () => {
    expect(isWithinBounds(coords(TABLE_WIDTH, 0))).toBe(false);
  });

  it("(0, 5) -> false", () => {
    expect(isWithinBounds(coords(0, TABLE_HEIGHT))).toBe(false);
  });

  it("(0, 0) -> true", () => {
    expect(isWithinBounds(coords(0, 0))).toBe(true);
  });

  it("within table -> true", () => {
    const x = Math.floor(Math.random() * TABLE_WIDTH);
    const y = Math.floor(Math.random() * TABLE_HEIGHT);
    expect(isWithinBounds(coords(x, y))).toBe(true);
  });
});
