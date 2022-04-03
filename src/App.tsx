import React, { useEffect, useState } from "react";
import getStartIndex from "./helpers/getStartIndex";
import useRobotState from "./hooks/useRobotState";
import { Table } from "./Table";
import { Action } from "./types";

const actions: Action[] = [
  { type: "PLACE", payload: { x: 0, y: 0, direction: "EAST" } },
  { type: "MOVE", payload: null },
  { type: "REPORT", payload: null },
  { type: "MOVE", payload: null },
];

function App() {
  const [actionIndex, setActionIndex] = useState(getStartIndex(actions));

  const { robot, report } = useRobotState({ actions, actionIndex });

  useEffect(() => {
    const listener = (e: KeyboardEvent) =>
      e.key === "Enter" &&
      setActionIndex((index) =>
        index < actions.length - 1 ? index + 1 : index
      );

    document.addEventListener("keypress", listener);
    return () => document.removeEventListener("keypress", listener);
  }, []);

  return (
    <>
      <div>
        press <strong>Enter &crarr;</strong> to play the next instruction
      </div>
      <Table robot={robot} />
      {report !== null ? (
        <p>{`${robot?.x}, ${robot?.y}, ${robot?.direction}`}</p>
      ) : null}
    </>
  );
}

export default App;
