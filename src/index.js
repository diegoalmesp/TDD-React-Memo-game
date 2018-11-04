import React from "react";
import ReactDOM from "react-dom";

import Game from "./components/Game";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>React Memo game</h1>
      <Game />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
