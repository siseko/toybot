import styled from "styled-components";

const CELL_SIZE = 50;

export const Grid = styled.ul<{ gridColumns: number }>(({ gridColumns }) => ({
  display: "inline-grid",
  gridTemplateColumns: `repeat(${gridColumns}, ${CELL_SIZE}px)`,
  gap: 3,
  border: `3px solid #ccc`,
  backgroundColor: "#ccc",
  marginTop: 5,
}));

export const Cell = styled.li<{ isEmpty: boolean }>(({ isEmpty }) => ({
  height: CELL_SIZE,
  backgroundColor: isEmpty ? "#fff" : "#000",
  color: "#fff",
}));
