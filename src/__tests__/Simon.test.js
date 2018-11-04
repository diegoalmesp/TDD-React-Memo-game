import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

import Simon from "../components/Simon";

afterEach(cleanup);

describe("Simon should be on the page", () => {
  const mockFn = jest.fn();
  test("it should display 4 blocks game", () => {
    const { getByTestId } = render(<Simon onClick={mockFn} />);

    expect(getByTestId(/simon/)).toBeInTheDocument();

    fireEvent.click(getByTestId(/1/));
    fireEvent.click(getByTestId(/2/));
    fireEvent.click(getByTestId(/3/));
    fireEvent.click(getByTestId(/4/));

    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(mockFn).toHaveBeenLastCalledWith(4);
  });
});
