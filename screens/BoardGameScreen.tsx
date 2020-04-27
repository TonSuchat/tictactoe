import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BackgroundComponent from "../components/Background";
import Button from "../components/Button";
import Tile from "../components/Tile";
import Slot from "../components/Slot";
import { winnerPatters } from "../utility";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boardgame: {
    flex: 9,
    padding: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 3,
    marginHorizontal: 36,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  footer: {
    flex: 1,
    padding: 40,
  },
});

const row = [0, 1, 2];
const col = [...row];

type BoardGameState = {
  player: string;
  slots: any[][];
  winner: string;
  isEnd: boolean;
};

const BoardGameScreen: React.FC = () => {
  const getInitialSlots = () => {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };

  const getInitialState = () => {
    return {
      player: "X", // initial player will be 'X'
      slots: getInitialSlots(),
      winner: "",
      isEnd: false,
    };
  };

  const [state, setState] = useState<BoardGameState>(getInitialState());

  const onResetPress = () => {
    setState({ ...getInitialState() });
  };

  const onSlotPress = (row: any, col: any) => {
    const player = state.player;
    const slots = [...state.slots];
    slots[row][col] = player;
    // check if there's a winner
    setState({
      player: player === "X" ? "O" : "X",
      slots,
      winner: checkWinner(),
      isEnd: checkGameIsEnded(),
    });
  };

  const checkWinner = (): string => {
    let winner = "";
    const slots = state.slots;
    winnerPatters.every((pattern) => {
      pattern.every((item) => {
        const child1 = item[0];
        const child2 = item[1];
        const child3 = item[2];
        if (
          slots[child1[0]][child1[1]] == slots[child2[0]][child2[1]] &&
          slots[child1[0]][child1[1]] == slots[child3[0]][child3[1]]
        ) {
          winner = slots[child1[0]][child1[1]];
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

  const checkGameIsEnded = () => {
    const slots = [...state.slots];
    let result = true;
    slots.every((row) => {
      row.every((col) => {
        if (!col || col === undefined) {
          result = false;
          return false;
        }
        return true;
      });
      if (!result) return false;
      else return true;
    });
    return result;
  };

  return (
    <BackgroundComponent>
      <View style={styles.container}>
        <Tile player={state.player} winner={state.winner} isEnd={state.isEnd} />
        <View style={styles.boardgame}>
          {row.map((itemRow) => {
            return (
              <View
                key={itemRow}
                style={itemRow == 2 ? [styles.row, styles.lastRow] : styles.row}
              >
                {col.map((itemCol) => {
                  return (
                    <Slot
                      key={`${itemRow + itemCol}`}
                      onSlotPress={() =>
                        state.slots[itemRow][itemCol] || state.winner
                          ? null
                          : onSlotPress(itemRow, itemCol)
                      }
                      text={state.slots[itemRow][itemCol]}
                      isMiddle={itemCol === 1 ? true : false}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.footer}>
          <Button onPress={() => onResetPress()} text={"Reset"} />
        </View>
      </View>
    </BackgroundComponent>
  );
};

export default BoardGameScreen;
