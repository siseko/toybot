import React, { useEffect, useState } from "react";
import getStartIndex from "./helpers/getStartIndex";
import useRobotState from "./hooks/useRobotState";
import { Table } from "./Table";
import { Action } from "./types";
import styled from "styled-components";
import { Instructions } from "./Instructions";
import printState from "./helpers/printState";

const Layout = styled.div(() => ({
  display: "flex",
  gap: 50,
}));

const actions: Action[] = [
  { type: "PLACE", payload: { x: 0, y: 0, direction: "NORTH" } },
  { type: "MOVE", payload: null },
  { type: "REPORT", payload: null },
  { type: "MOVE", payload: null },
  { type: "LEFT", payload: null },
  { type: "MOVE", payload: null },
  { type: "REPORT", payload: null },
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
    <Layout>
      <div>
        <div>
          press <strong>Enter &crarr;</strong> to play the next instruction
        </div>
        <Table robot={robot} />
        {report !== null ? <p>{printState(robot)}</p> : null}
      </div>
      <Instructions instructions={actions} currentIndex={actionIndex} />
    </Layout>
  );
}

export default App;
