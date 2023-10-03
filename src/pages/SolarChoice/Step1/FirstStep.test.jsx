import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FirstStep from "./FirstStep";
beforeEach(() => {
  jest.clearAllMocks();
});
jest.useFakeTimers();

describe("<FirstStep />", () => {
  it("renders without crashing", () => {
    render(<FirstStep nextStep={() => {}} />);
  });

  it("renders the introductory animated text correctly", () => {
    render(<FirstStep nextStep={() => {}} />);
    expect(screen.getByTestId("animated-text")).toBeInTheDocument();
  });

  it("sets loading state and triggers nextStep after clicking the start button", async () => {
    const nextStepMock = jest.fn();
    render(<FirstStep nextStep={nextStepMock} />);

    const startButton = screen.getByTestId("start-button");
    userEvent.click(startButton);

    expect(screen.getByTestId("custom-spinner-container")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(nextStepMock).toHaveBeenCalled();
  });

  it("sets loading state and triggers nextStep after clicking the next button", async () => {
    const nextStepMock = jest.fn();
    render(<FirstStep nextStep={nextStepMock} />);

    const nextButton = screen.getByTestId("next-button");
    userEvent.click(nextButton);

    expect(screen.getByTestId("custom-spinner-container")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(nextStepMock).toHaveBeenCalled();
  });

  it("triggers the nextStep function upon pressing the arrow right key", () => {
    const nextStepMock = jest.fn();
    render(<FirstStep nextStep={nextStepMock} />);

    fireEvent.keyDown(window, { keyCode: 39 });

    act(() => {
      jest.advanceTimersByTime(3000); // Fast forward time
    });

    expect(nextStepMock).toHaveBeenCalled();
  });
});
