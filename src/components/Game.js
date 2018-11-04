import React, { useReducer } from "react";
import PropTypes from "prop-types";

import { STATUS, COLORS } from "../constants";
import { randomBtn } from "../helpers";
import Simon from "./Simon";

function Game({ testMemos }) {
  const init = testMemos ? testMemos : [randomBtn()];

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "NEXT_TURN":
          return {
            ...state,
            turns: state.turns + 1
          };
        case "SCORE":
          return {
            ...state,
            memos: [...state.memos, randomBtn()],
            turns: 0,
            score: state.score + 1
          };
        case "FINISHED":
          return {
            ...state,
            status: STATUS.FINISHED
          };
        case "RESET":
          return {
            turns: 0,
            memos: init,
            score: 0,
            status: STATUS.PLAYING
          };
        default:
          return state;
      }
    },
    {
      turns: 0,
      memos: init,
      score: 0,
      status: STATUS.PLAYING
    }
  );

  function onClick(button) {
    dispatch({ type: "NEXT_TURN" });

    if (state.memos.length - 1 === state.turns) {
      dispatch({ type: "SCORE" });
    }

    if (state.memos[state.turns] !== button) {
      dispatch({ type: "FINISHED" });
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 4000);
    }
  }

  return (
    <React.Fragment>
      <h2>
        Score: <span data-testid="score">{state.score}</span>
      </h2>
      <span>progress:</span>
      <div className="progression">
        {state.memos.map((val, i) => (
          <div data-testid="progress-dot" key={i} className="dot" />
        ))}
        <div classname="arrow"> > </div>
        <div>{COLORS[state.memos[state.memos.length - 1]]}</div>
      </div>
      <br />
      {
        {
          PLAYING: <Simon onClick={onClick} memos={state.memos} />,
          FINISHED: <p>You score {state.score}! That's awesome!</p>
        }[state.status]
      }
    </React.Fragment>
  );
}

Game.propTypes = {
  testMemos: PropTypes.array
};

export default Game;
