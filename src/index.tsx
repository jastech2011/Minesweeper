import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Minesweeper from "./Minesweeper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Minesweeper />
  </React.StrictMode>
);
