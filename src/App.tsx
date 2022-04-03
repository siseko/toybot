import React, { useEffect, useState } from "react";
import getStartIndex from "./helpers/getStartIndex";
import useRobotState from "./hooks/useRobotState";
import { Table } from "./Table";
import { Action } from "./types";
import styled from "styled-components";
import { Instructions } from "./Instructions";
import printState from "./helpers/printState";
import { fetchInstructions } from "./service/instructions";

const Layout = styled.div(() => ({
  display: "flex",
  gap: 50,
}));

function App() {
  const [actions, setActions] = useState<Action[]>([]);
  const [actionIndex, setActionIndex] = useState(-1);

  const { robot, report } = useRobotState({ actions, actionIndex });

  useEffect(() => {
    fetchInstructions().then((actions) => {
      setActions(actions);
      setActionIndex(getStartIndex(actions));
    });

    const listener = (e: KeyboardEvent) =>
      e.key === "Enter" &&
      setActionIndex((index) =>
        index < actions.length - 1 ? index + 1 : index
      );

    document.addEventListener("keypress", listener);
    return () => document.removeEventListener("keypress", listener);
  }, [actions.length]);

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
