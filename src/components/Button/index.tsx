import React, { useCallback } from "react";
import { Box } from "@mui/material";
import { IButtonProps } from "./types";
import {
  Coronavirus,
  FlagCircle,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";

function MinesButton(props: IButtonProps) {
  const { onClick, state, counter } = props;

  const ViewButton = useCallback(() => {
    switch (state) {
      case "flag":
        return <FlagCircle />;
      case "mine":
        return <Coronavirus />;
      case "show":
        return counter ? counter : "";
      default:
        return <CheckBoxOutlineBlank />;
    }
  }, [state, counter]);

  return (
    <Box
      className="button"
      component="span"
      onContextMenu={(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.preventDefault();
        if (state === "show") return;
        onClick(true);
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (state === "show") return;
        onClick();
      }}
    >
      {ViewButton()}
    </Box>
  );
}

export default MinesButton;
