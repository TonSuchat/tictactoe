import {
  countSymbol,
  getPlayer,
  getActions,
  getResult,
  isTerminal,
  getWinner,
  getMove,
} from "./logic";
import expect from "expect";
import { getInitialSlots, placeSymbolInSlots } from "./utility";

describe("logic", () => {
  describe("countSymbol", () => {
    it("should count 'X' and 'O' symbol properly when 0", () => {
      const state = [...getInitialSlots()];
      const xResult = countSymbol(state, "X");
      const oResult = countSymbol(state, "O");
      expect(xResult).toBe(0);
      expect(oResult).toBe(0);
    });

    it("should count 'X' and 'O' symbol properly when is not 0", () => {
      const state = [...getInitialSlots()];
      state[0][0] = "X";
      state[1][0] = "O";
      state[0][1] = "X";
      state[2][1] = "X";
      const xResult = countSymbol(state, "X");
      const oResult = countSymbol(state, "O");
      expect(xResult).toBe(3);
      expect(oResult).toBe(1);
    });
  });

  describe("getPlayer", () => {
    it("should get X player when start the game", () => {
      const state = [...getInitialSlots()];
      expect(getPlayer(state)).toBe("X");
    });

    it("should get O player when second turn", () => {
      const state = [...getInitialSlots()];
      state[0][1] = "X";
      expect(getPlayer(state)).toBe("O");
    });

    it("should get X player when both equal", () => {
      const state = [...getInitialSlots()];
      state[0][1] = "X";
      state[1][1] = "O";
      state[2][2] = "X";
      state[1][2] = "O";
      expect(getPlayer(state)).toBe("X");
    });
  });

  describe("getActions", () => {
    it("should get actions properly", () => {
      let state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["", "O", "X"],
        ["X", "O", "O"]
      );
      let result = getActions(state);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual([1, 0]);

      state = placeSymbolInSlots(["", "", ""], ["", "X", "O"], ["X", "O", ""]);
      result = getActions(state);
      expect(result.length).toBe(5);
      let expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [2, 2],
      ];
      expect(result).toEqual(expected);
    });
  });

  describe("getResult", () => {
    it("should get result properly", () => {
      let state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["", "O", "X"],
        ["X", "O", "O"]
      );
      let expected = [
        ["O", "X", "X"],
        ["X", "O", "X"],
        ["X", "O", "O"],
      ];
      let result = getResult(state, [1, 0]);
      expect(result).toEqual(expected);

      state = placeSymbolInSlots(["", "X", "X"], ["", "O", "X"], ["", "", "O"]);
      expected = [
        ["O", "X", "X"],
        ["", "O", "X"],
        ["", "", "O"],
      ];
      result = getResult(state, [0, 0]);
      expect(result).toEqual(expected);
    });
  });

  describe("isTerminal", () => {
    it("should return false when is not terminal", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["", "O", "O"],
        ["X", "O", "X"]
      );
      expect(isTerminal(state)).toBe(false);
    });

    it("should return true when is terminal", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["X", "O", "X"],
        ["X", "O", "O"]
      );
      expect(isTerminal(state)).toBe(true);
    });

    it("should return false when the game just begin", () => {
      const state = getInitialSlots();
      expect(isTerminal(state)).toBe(false);
    });
  });

  describe("getWinner", () => {
    it("should get O as winner diagonal", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["", "O", "X"],
        ["X", "O", "O"]
      );
      expect(getWinner(state)).toBe("O");
    });

    it("should get X as winner vertical", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["", "O", "X"],
        ["X", "O", "X"]
      );
      expect(getWinner(state)).toBe("X");
    });

    it("should get X as winner horizontal", () => {
      const state = placeSymbolInSlots(
        ["X", "X", "X"],
        ["", "O", "O"],
        ["X", "O", "X"]
      );
      expect(getWinner(state)).toBe("X");
    });

    it("should get nothing when it's draw", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "X"],
        ["X", "O", "O"],
        ["X", "O", "X"]
      );
      expect(getWinner(state)).toBe("");
    });
  });

  describe("getMove", () => {
    it("should get move properly", () => {
      const state = placeSymbolInSlots(
        ["", "X", "O"],
        ["O", "X", ""],
        ["X", "", "O"]
      );
      expect(getMove(state)).toEqual([2, 1]);
    });

    it("should get draw move rather than lose move", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "O"],
        ["X", "X", ""],
        ["", "O", "X"]
      );
      expect(getMove(state)).toEqual([1, 2]);
    });

    it("should get winning move rather than draw move", () => {
      const state = placeSymbolInSlots(
        ["O", "X", "O"],
        ["X", "O", "X"],
        ["X", "", ""]
      );
      expect(getMove(state)).toEqual([2, 2]);
    });
  });
});
