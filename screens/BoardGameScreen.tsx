import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BackgroundComponent from "../components/Background";
import Button from "../components/Button";
import Tile from "../components/Tile";
import Slot from "../components/Slot";
import { getInitialSlots } from "../utility";
import { getPlayer, isTerminal, getWinner, getMove } from "../logic";

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
    marginBottom: 30,
  },
});

const row = [0, 1, 2];
const col = [...row];

type BoardGameState = {
  player: string;
  slots: string[][];
  winner: string;
  isEnd: boolean;
  mode: string;
  turn: string;
};

type BoardGameScreenType = {
  route: any;
};

const BoardGameScreen: React.FC<BoardGameScreenType> = (props) => {
  const getInitialState = () => {
    return {
      player: getPlayer(getInitialSlots()), // initial player will be 'X'
      slots: getInitialSlots(),
      winner: "",
      isEnd: false,
      mode: mode || "human",
      turn: "human",
    };
  };

  const [state, setState] = useState<BoardGameState>(getInitialState());
  const { mode } = props.route.params;

  useEffect(() => {
    setState({ ...state, mode });
  }, [mode]);

  useEffect(() => {
    const { mode, turn, isEnd, slots, player } = state;
    if (mode === "ai" && turn === "ai" && !isEnd) {
      // get move for ai
      const move = getMove(state.slots);
      slots[move[0]][move[1]] = player;
      setState({
        ...state,
        player: player === "X" ? "O" : "X",
        slots,
        winner: getWinner(slots),
        isEnd: isTerminal(slots),
        turn: "human",
      });
    }
  }, [state.turn]);

  const onResetPress = () => {
    setState({ ...getInitialState() });
  };

  const onSlotPress = (row: any, col: any) => {
    const { player, mode, turn } = state;
    const slots = [...state.slots];
    slots[row][col] = player;
    // check if there's a winner
    setState({
      ...state,
      player: player === "X" ? "O" : "X",
      slots,
      winner: getWinner(slots),
      isEnd: isTerminal(slots),
      turn: mode === "ai" && turn === "human" ? "ai" : "human",
    });
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
