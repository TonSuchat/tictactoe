import { winnerPatters, placeSymbolInSlots } from "./utility";

export const countSymbol = (state: string[][], symbol: string): number => {
  return state.reduce(
    (count, row) => count + row.filter((x) => x === symbol).length,
    0
  );
};

export const getPlayer = (state: string[][]): string => {
  if (!state) return "X";
  const countX = countSymbol(state, "X");
  const countO = countSymbol(state, "O");
  if (countO == countX) return "X";
  return countX > countO ? "O" : "X";
};

export const getActions = (state: string[][]): number[][] => {
  const actions: number[][] = [];
  for (var row = 0; row < state.length; row++) {
    for (var col = 0; col < state[0].length; col++) {
      if (!state[row][col]) actions.push([row, col]);
    }
  }
  return actions;
};

export const getResult = (state: string[][], action: number[]): string[][] => {
  if (!state) return [];
  const newState = state.map((item) => [...item]);
  newState[action[0]][action[1]] = getPlayer(newState);
  return newState;
};

export const isTerminal = (state: string[][]): boolean => {
  if (getWinner(state)) return true;
  return !state.some((row) => row.some((col) => !col));
};

export const getWinner = (state: string[][]): string => {
  let winner = "";
  winnerPatters.every((pattern) => {
    pattern.every((item) => {
      const child1 = item[0];
      const child2 = item[1];
      const child3 = item[2];
      if (
        state[child1[0]][child1[1]] == state[child2[0]][child2[1]] &&
        state[child1[0]][child1[1]] == state[child3[0]][child3[1]]
      ) {
        winner = state[child1[0]][child1[1]];
        return false; // return false for break the loop
      }
      return true; // return true for keep iterate
    });
    if (winner) return false;
    // return false for break the loop
    else return true; // return true for keep iterate
  });
  return winner;
};

export const getMove = (state: string[][]): number[] => {
  const player = getPlayer(state);
  if (player === "X") return maxValue(state).move;
  return minValue(state).move;
};

type minimaxResult = {
  v: number;
  move: number[];
};

const minValue = (state: string[][]): minimaxResult => {
  if (isTerminal(state)) return { v: utility(state), move: [] };
  let v = 2;
  let move: number[] = [];
  getActions(state).forEach((action) => {
    const result = maxValue(getResult(state, action));
    if (result.v < v) {
      move = action;
      v = result.v;
    }
  });
  return { v, move };
};

const maxValue = (state: string[][]): minimaxResult => {
  if (isTerminal(state)) return { v: utility(state), move: [] };
  let v = -2;
  let move: number[] = [];
  getActions(state).forEach((action) => {
    const result = minValue(getResult(state, action));
    if (result.v > v) {
      move = action;
      v = result.v;
    }
  });
  return { v, move };
};

const utility = (state: string[][]): number => {
  const winner = getWinner(state);
  if (winner === "X") return 1;
  else if (winner === "O") return -1;
  return 0;
};
