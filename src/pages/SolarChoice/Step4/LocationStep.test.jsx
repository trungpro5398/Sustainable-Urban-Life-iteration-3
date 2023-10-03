// LocationStep.test.jsx

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
// import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import LocationStep from "./LocationStep";

const mockStore = configureMockStore();

const mockData = [
  { place_name: "SuburbA", postcode: "1000" },
  { place_name: "SuburbB", postcode: "2000" },
  { place_name: "SuburbC", postcode: "3000" },
  // ... Add as many mock suburbs as necessary
];

describe("<LocationStep />", () => {
  const store = mockStore({
    solarForm: {
      location: {
        data: null,
        postcode: null,
        suburb: null,
        isCompleted: false,
      },
      // ... other initial states
    },
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <LocationStep
          data={mockData}
          nextStep={jest.fn()}
          previousStep={jest.fn()}
        />
      </Provider>
    );
  });

  it("shows error when proceeding without selecting a suburb", async () => {
    render(
      <Provider store={store}>
        <LocationStep
          data={mockData}
          nextStep={jest.fn()}
          previousStep={jest.fn()}
        />
      </Provider>
    );

    const nextButton = await screen.findByTestId("next-button"); // Adjust this selector as needed
    userEvent.click(nextButton);

    expect(
      screen.getByText(/Please select a suburb before proceeding./i)
    ).toBeInTheDocument();
  });

  it("updates the state when a suburb is selected", async () => {
    render(
      <Provider store={store}>
        <LocationStep
          data={mockData}
          nextStep={jest.fn()}
          previousStep={jest.fn()}
        />
      </Provider>
    );

    const selectInput = screen.getByRole("combobox");
    userEvent.click(selectInput); // Open the dropdown

    const option = await screen.findByText("1000 - SuburbA");
    userEvent.click(option); // Select the option

    // Now, we'll verify that the displayed value in the select input matches our expectation:
    const selectedValue = screen.getByText("1000 - SuburbA");
    expect(selectedValue).toBeInTheDocument();

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "solarForm/updateField",
      payload: { section: "location", field: "suburb", value: "SuburbA" },
    });
  });
});
