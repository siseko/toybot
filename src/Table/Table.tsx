import React from "react";
import { TABLE_HEIGHT, TABLE_WIDTH } from "../constants";
import { Direction, RobotState } from "../types";
import * as S from "./Table.styled";

interface Props {
  robot: RobotState | null;
}

const directionEntityMap: { [key in Direction]: number } = {
  NORTH: 8593,
  SOUTH: 8595,
  EAST: 8594,
  WEST: 8592,
};

const table = Array.from({ length: TABLE_HEIGHT }).map(() =>
  Array.from({ length: TABLE_WIDTH })
);

const invertYCoordinate = (y: number) => TABLE_HEIGHT - 1 - y;

const Table = ({ robot }: Props) => {
  return (
    <S.Grid gridColumns={TABLE_WIDTH}>
      {table.map((row, y) =>
        row.map((_, x) => {
          const isEmpty = robot?.x !== x || robot?.y !== invertYCoordinate(y);
          const key = `${x}${y}`;

          return (
            <S.Cell isEmpty={isEmpty} key={key}>
              {isEmpty
                ? null
                : String.fromCharCode(directionEntityMap[robot?.direction])}
            </S.Cell>
          );
        })
      )}
    </S.Grid>
  );
};

export default Table;
