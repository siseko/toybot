import { Action } from "../types";
import getStartIndex from "./getStartIndex";

describe("getStartIndex", () => {
  it("should return -1 if no actions", () => {
    const actions: Action[] = [];

    expect(getStartIndex(actions)).toBe(-1);
  });

  it("should return -1 if no valid place commands", () => {
    const actions: Action[] = [
      { type: "PLACE", payload: { x: -1, y: 0, direction: "EAST" } },
      { type: "PLACE", payload: { x: 0, y: 5, direction: "EAST" } },
    ];

    expect(getStartIndex(actions)).toBe(-1);
  });

  it("should find first place command", () => {
    const actions: Action[] = [
      { type: "LEFT", payload: null },
      { type: "REPORT", payload: null },
      { type: "PLACE", payload: { x: 0, y: 0, direction: "EAST" } },
    ];

    expect(getStartIndex(actions)).toBe(2);
  });

  it("should skip all other commands including invalid placing", () => {
    const actions: Action[] = [
      { type: "LEFT", payload: null },
      { type: "PLACE", payload: { x: -1, y: 0, direction: "EAST" } },
      { type: "REPORT", payload: null },
      { type: "PLACE", payload: { x: 0, y: 0, direction: "EAST" } },
      { type: "REPORT", payload: null },
    ];

    expect(getStartIndex(actions)).toBe(3);
  });
});
