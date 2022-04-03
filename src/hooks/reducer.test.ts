import { Action } from "../types";
import reducer, { ReducerState } from "./reducer";

describe("robot state reducer", () => {
  it("should place the robot", () => {
    const prevState = { robot: null, report: null };
    const action: Action = {
      type: "PLACE",
      payload: { x: 0, y: 1, direction: "EAST" },
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x: 0, y: 1, direction: "EAST" },
      report: null,
    });
  });

  it("should report the robot state", () => {
    const prevState: ReducerState = {
      robot: { x: 0, y: 1, direction: "EAST" },
      report: null,
    };
    const action: Action = {
      type: "REPORT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x: 0, y: 1, direction: "EAST" },
      report: { x: 0, y: 1, direction: "EAST" },
    });
  });

  it("should move the robot", () => {
    const prevState: ReducerState = {
      robot: { x: 0, y: 1, direction: "NORTH" },
      report: { x: 0, y: 1, direction: "NORTH" },
    };
    const action: Action = {
      type: "MOVE",
      payload: null,
    };

    const currentState = reducer(prevState, action);

    expect(currentState).toEqual({
      robot: { x: 0, y: 2, direction: "NORTH" },
      report: null,
    });

    const nextAction: Action = {
      type: "RIGHT",
      payload: null,
    };

    const nextState = reducer(currentState, nextAction);

    expect(reducer(nextState, { type: "MOVE", payload: null })).toEqual({
      robot: { x: 1, y: 2, direction: "EAST" },
      report: null,
    });
  });

  it("should face the robot left", () => {
    const prevState: ReducerState = {
      robot: { x: 0, y: 1, direction: "EAST" },
      report: null,
    };
    const action: Action = {
      type: "LEFT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x: 0, y: 1, direction: "WEST" },
      report: null,
    });
  });

  it("should face the robot right", () => {
    const prevState: ReducerState = {
      robot: { x: 0, y: 1, direction: "NORTH" },
      report: null,
    };
    const action: Action = {
      type: "RIGHT",
      payload: null,
    };

    expect(reducer(prevState, action)).toEqual({
      robot: { x: 0, y: 1, direction: "EAST" },
      report: null,
    });
  });
});
