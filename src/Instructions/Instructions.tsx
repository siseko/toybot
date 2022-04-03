import React from "react";
import styled from "styled-components";
import printState from "../helpers/printState";
import { Action } from "../types";

const Instruction = styled.li<{ isActive: boolean }>(({ isActive }) => ({
  fontWeight: isActive ? "bold" : undefined,
  paddingTop: 5,
}));

interface Props {
  instructions: Action[];
  currentIndex: number;
}

const Instructions = ({ instructions, currentIndex }: Props) => {
  return (
    <ul>
      {instructions.map((i, index) => (
        <Instruction key={index} isActive={index === currentIndex}>
          {i.type} {printState(i.payload)}
        </Instruction>
      ))}
    </ul>
  );
};

export default Instructions;
