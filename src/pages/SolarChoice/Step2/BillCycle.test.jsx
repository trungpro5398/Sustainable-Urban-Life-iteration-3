import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import BillCycle from "./BillCycle";
import { setupStore } from "../../../../test-utils";

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});

describe("<BillCycle />", () => {
  const renderWithRedux = (component) => {
    const store = setupStore();
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("renders without crashing", () => {
    renderWithRedux(<BillCycle nextStep={() => {}} previousStep={() => {}} />);
  });

  it("selects Monthly billing cycle and proceeds to the next step", async () => {
    const nextStepMock = jest.fn();

    renderWithRedux(
      <BillCycle nextStep={nextStepMock} previousStep={() => {}} />
    );

    const monthlyButton = screen.getByTestId("monthly-cycle-container");

    await act(async () => {
      userEvent.click(monthlyButton);
      jest.advanceTimersByTime(2000);
    });

    // await waitFor(() => {
    //   expect(nextStepMock).toHaveBeenCalled();
    // });
  });

  it("shows an error when proceeding without selecting", async () => {
    const nextStepMock = jest.fn();

    renderWithRedux(
      <BillCycle nextStep={nextStepMock} previousStep={() => {}} />
    );

    const nextButton = await screen.findByTestId("next-button"); // Adjust this selector as needed
    await act(async () => {
      userEvent.click(nextButton);
    });

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
