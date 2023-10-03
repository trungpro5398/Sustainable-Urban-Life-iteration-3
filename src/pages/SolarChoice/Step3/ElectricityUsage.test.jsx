import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import ElectricityUsage from "./ElectricityUsage";
import { setupStore } from "../../../../test-utils";

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    Slider: ({ value, onChange, ...props }) => {
      return (
        <input
          type="range"
          data-testid="mockedSlider"
          value={value}
          max={10000} // set a high max value
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      );
    },
    Input: ({ value, onChange, ...props }) => {
      return (
        <input
          type="text"
          data-testid="electricity-usage-input"
          value={value}
          onChange={onChange}
          {...props}
        />
      );
    },
  };
});

describe("<ElectricityUsage />", () => {
  const renderWithRedux = (component) => {
    const store = setupStore();
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("renders without crashing", () => {
    renderWithRedux(
      <ElectricityUsage nextStep={() => {}} previousStep={() => {}} />
    );
  });

  it("updates usage value when slider is changed", async () => {
    renderWithRedux(
      <ElectricityUsage nextStep={() => {}} previousStep={() => {}} />
    );
    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: "25" } }); // Adjusted value
    const input = screen.getByTestId("electricity-usage-input");
    await waitFor(() => expect(input.value).toBe("25"));
  });

  it("updates slider value when input is changed", async () => {
    renderWithRedux(
      <ElectricityUsage nextStep={() => {}} previousStep={() => {}} />
    );
    const input = screen.getByTestId("electricity-usage-input");
    fireEvent.change(input, { target: { value: "12" } });
    const slider = screen.getByRole("slider");

    await waitFor(() => expect(slider.value).toBe("12"));
  });
});
