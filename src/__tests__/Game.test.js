import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

import Game from "../components/Game";

afterEach(cleanup);

// predefined turns to test win and lose
const testMemos = [3, 1, 3, 3, 2, 4, 1];

describe("game should work", () => {
  test("start the game with a board to play", () => {
    const { getByTestId, getByText } = render(<Game />);

    expect(getByTestId(/simon/i)).toBeInTheDocument();
    expect(getByText(/score/i)).toBeInTheDocument();
    expect(getByTestId(/score/i)).toHaveTextContent(/0/);
  });

  test("user clicking the right colors", () => {
    const { getByTestId, getAllByTestId } = render(
      <Game testMemos={testMemos} />
    );

    testMemos.forEach(turn => {
      fireEvent.click(getByTestId(`${turn}`));
      console.log(`turn: ${turn}`);
    });

    expect(getByTestId(/score/i)).toHaveTextContent(/1/);
    // 7 numbers in array plus the first one
    expect(getAllByTestId(/progress-dot/i)).toHaveLength(8);
  });

  test("user clicking the wrong colors", () => {
    const { getByTestId, getByText } = render(<Game testMemos={testMemos} />);

    fireEvent.click(getByTestId(/1/));

    expect(getByTestId(/score/i)).toHaveTextContent(/0/);
    expect(getByText(/That's awesome!/i)).toBeInTheDocument();

    setTimeout(() => {
      expect(getByTestId(/simon/i)).toBeInTheDocument();
    }, 4000);
  });
});
