import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import BatteryChoice from "./BatteryChoice";
import { updateFieldAsync } from "../../../reduxToolkit/Thunks/solarFormThunks";

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  solarForm: {
    batteryChoice: {
      wantBattery: null,
      batterySize: 5,
      isCompleted: false,
    },
  },
});

jest.mock("../../../reduxToolkit/Thunks/solarFormThunks");

// Common setup utility
const setup = (store) => {
  const nextStepMock = jest.fn();
  render(
    <Provider store={store}>
      <BatteryChoice nextStep={nextStepMock} previousStep={jest.fn()} />
    </Provider>
  );
  return nextStepMock;
};

describe("<BatteryChoice />", () => {
  // Reset all mocks and timers before each test
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("moves to next step when 'Yes' is clicked", async () => {
    updateFieldAsync.mockResolvedValueOnce(true);
    const nextStepMock = setup(store);

    const yesButton = screen.getByTestId("Yes");
    userEvent.click(yesButton);

    expect(screen.getByTestId("custom-spinner-container")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(nextStepMock).toHaveBeenCalled();
    });
  });

  it("moves to next step when 'No' is clicked", async () => {
    updateFieldAsync.mockResolvedValueOnce(true);
    const nextStepMock = setup(store);

    const noButton = screen.getByTestId("No");
    userEvent.click(noButton);

    expect(screen.getByTestId("custom-spinner-container")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(nextStepMock).toHaveBeenCalled();
    });
  });

  it("handles keydown events for arrow right and left", async () => {
    updateFieldAsync.mockResolvedValueOnce(true);
    const nextStepMock = setup(store);

    // Simulating arrow right key press
    fireEvent.keyDown(window, { keyCode: 39 });

    expect(screen.getByTestId("custom-spinner-container")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(nextStepMock).toHaveBeenCalled();
    });
  });
});
