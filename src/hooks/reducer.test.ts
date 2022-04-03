import { TABLE_HEIGHT, TABLE_WIDTH } from "../constants";
import { Action } from "../types";
import reducer, { ReducerState } from "./reducer";

describe("robot state reducer", () => {
  describe("test out of table bounds", () => {
    it("should not place the robot", () => {
      const prevState = { robot: null, report: null };
      const action: Action = {
        type: "PLACE",
        payload: { x: TABLE_WIDTH, y: 0, direction: "EAST" },
      };

      expect(reducer(prevState, action)).toEqual(prevState);
    });

    it("should not move the robot", () => {
      const prevState: ReducerState = {
        robot: { x: 0, y: 0, direction: "WEST" },
        report: null,
      };

      expect(reducer(prevState, { type: "MOVE", payload: null })).toEqual(
        prevState
      );
    });
  });

  let x: number, y: number;
  beforeEach(() => {
    x = Math.floor(Math.random() * TABLE_WIDTH);
    y = Math.floor(Math.random() * TABLE_HEIGHT);
  });

  it("should place the robot", () => {
    const prevState = { robot: null, report: null };
    const action: Action = {
      type: "PLACE",
      payload: { x, y, direction: "EAST" },
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x, y, direction: "EAST" },
      report: null,
    });
  });

  it("should report the robot state", () => {
    const prevState: ReducerState = {
      robot: { x, y, direction: "EAST" },
      report: null,
    };
    const action: Action = {
      type: "REPORT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x, y, direction: "EAST" },
      report: { x, y, direction: "EAST" },
    });
  });

  it("should move the robot", () => {
    const prevState: ReducerState = {
      robot: { x: 0, y: 0, direction: "NORTH" },
      report: { x: 0, y: 0, direction: "NORTH" },
    };
    const action: Action = {
      type: "MOVE",
      payload: null,
    };

    const currentState = reducer(prevState, action);

    expect(currentState).toEqual({
      robot: { x: 0, y: 1, direction: "NORTH" },
      report: null,
    });

    const nextAction: Action = {
      type: "RIGHT",
      payload: null,
    };

    const nextState = reducer(currentState, nextAction);

    expect(reducer(nextState, { type: "MOVE", payload: null })).toEqual({
      robot: { x: 1, y: 1, direction: "EAST" },
      report: null,
    });
  });

  it("should face the robot left", () => {
    const prevState: ReducerState = {
      robot: { x, y, direction: "EAST" },
      report: null,
    };
    const action: Action = {
      type: "LEFT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x, y, direction: "WEST" },
      report: null,
    });
  });

  it("should face the robot right", () => {
    const prevState: ReducerState = {
      robot: { x, y, direction: "NORTH" },
      report: null,
    };
    const action: Action = {
      type: "RIGHT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x, y, direction: "EAST" },
      report: null,
    });
  });

  it("shouldn't change state if robot not on table and not a place command", () => {
    const prevState: ReducerState = {
      robot: null,
      report: null,
    };

    expect(reducer(prevState, { type: "RIGHT", payload: null })).toEqual({
      robot: null,
      report: null,
    });

    expect(reducer(prevState, { type: "RIGHT", payload: null })).toEqual({
      robot: null,
      report: null,
    });

    expect(reducer(prevState, { type: "REPORT", payload: null })).toEqual({
      robot: null,
      report: null,
    });

    expect(reducer(prevState, { type: "MOVE", payload: null })).toEqual({
      robot: null,
      report: null,
    });
  });
});
