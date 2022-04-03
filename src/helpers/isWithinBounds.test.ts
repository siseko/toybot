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
    expect(isWithinBounds(coords(5, 0))).toBe(false);
  });

  it("(0, 5) -> false", () => {
    expect(isWithinBounds(coords(0, 5))).toBe(false);
  });

  it("(0, 0) -> true", () => {
    expect(isWithinBounds(coords(0, 0))).toBe(true);
  });

  it("(2, 3) -> true", () => {
    expect(isWithinBounds(coords(2, 3))).toBe(true);
  });
});
