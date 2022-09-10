import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import MinesButton from "./components/Button";
import { IButton } from "./types";
import { size, bombs } from "./constants";
import { startGame, isValid, getCount } from "./utils";

function Minesweeper() {
  const [playArea, setPlayArea] = useState(startGame(size, bombs));
  const [countBombs, setCountBombs] = useState(bombs);
  const [countFlag, setCountFlag] = useState(0);
  const [win, setWin] = useState(false);
  const [loose, setLoose] = useState(false);

  const open = function (newState: IButton[][], column: IButton) {
    if (newState[column.x][column.y].state === "show") return;
    newState[column.x][column.y].state = "show";
    const count = getCount(column.x, column.y, playArea);
    newState[column.x][column.y].counter = count;
    if (!count) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (isValid(column.x + x, column.y + y)) {
            open(newState, newState[column.x + x][column.y + y]);
          }
        }
      }
    }
  };

  const onClick = (column: IButton, rightButton?: boolean) => {
    if (win || loose) return;
    const newState = [...playArea];

    if (rightButton) {
      if (column.state === "show") return;
      if (column.state !== "flag") {
        newState[column.x][column.y].state = "flag";
        if (newState[column.x][column.y].isMine) {
          setCountBombs((prev) => prev - 1);
        }
        setCountFlag((prev) => prev + 1);
      } else {
        setCountFlag((prev) => prev - 1);
        newState[column.x][column.y].state = "hidden";
      }
    } else {
      if (newState[column.x][column.y].isMine) {
        newState[column.x][column.y].state = "mine";
        setLoose(true);
      } else {
        open(newState, column);
      }
    }
    setPlayArea(newState);
  };

  useEffect(() => {
    if (!countBombs && countFlag === bombs) {
      setWin(true);
    }
  }, [countFlag, countBombs]);

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" className="header">
        Minesweeper
      </Typography>
      <Typography component="p" className="box-center">
        {win ? "WIN wow" : loose ? "Game Over" : "Playing"}
      </Typography>
      <Typography component="p" className="box-center">
        Mines {bombs} / {countFlag}
      </Typography>
      <Typography component="p" className="holder-button">
        <Button
          onClick={() => {
            setPlayArea(startGame(size, bombs));
            setCountBombs(bombs);
            setCountFlag(0);
            setWin(false);
            setLoose(false);
          }}
          variant="outlined"
        >
          Reset
        </Button>
      </Typography>
      <Box className="holder">
        <Box
          className="field"
          sx={{ gridTemplateColumns: `repeat(${size}, 37px)` }}
        >
          {playArea.map((row) =>
            row.map((column) => (
              <MinesButton
                onClick={(mouseButton?: boolean) =>
                  onClick(column, mouseButton)
                }
                key={`${column.x}${column.y}`}
                state={column.state}
                counter={column.counter}
              />
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Minesweeper;
