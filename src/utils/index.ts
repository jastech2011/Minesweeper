import { IButton } from "../types";
import { size } from "../constants";

export const startGame = (size: number, minesCount: number) => {
  let x = [];
  const mines = generateMines(size, minesCount);
  for (let i = 0; i < size; i++) {
    const y = [];
    for (let j = 0; j < size; j++) {
      y.push({
        x: i,
        y: j,
        state: "hidden",
        isMine: isMine(i, j, mines, size),
        isFlag: false,
        isShow: false,
        counter: 0,
      });
    }
    x.push(y);
  }
  return x;
};
export const isValid = function (row: number, col: number) {
  return row >= 0 && row < size && col >= 0 && col < size;
};

export const generateMines = (size: number, bomb_count: number) => {
  const cellsCount = size * size;
  return Array.from(Array(cellsCount).keys())
    .sort(() => Math.random() - 0.5)
    .slice(0, bomb_count);
};

export const isMine = (x: number, y: number, mines: number[], size: number) => {
  return mines.indexOf(x * size + y) !== -1;
};

export const getCount = function (
  row: number,
  col: number,
  fields: IButton[][]
) {
  let count = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (isValid(row + x, col + y) && fields[row + x][col + y].isMine) {
        count++;
      }
    }
  }
  return count;
};
