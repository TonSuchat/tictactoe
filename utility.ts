const rowPatterns = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
];
const colPatterns = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
];
const crossPatterns = [
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
export const winnerPatters = [rowPatterns, colPatterns, crossPatterns];

export const getInitialSlots = (): string[][] => {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};

export const placeSymbolInSlots = (
  row1: string[],
  row2: string[],
  row3: string[]
): string[][] => {
  const state = [...getInitialSlots()];
  // row1
  state[0][0] = row1[0];
  state[0][1] = row1[1];
  state[0][2] = row1[2];

  // row 2
  state[1][0] = row2[0];
  state[1][1] = row2[1];
  state[1][2] = row2[2];

  // row 3
  state[2][0] = row3[0];
  state[2][1] = row3[1];
  state[2][2] = row3[2];

  return state;
};
