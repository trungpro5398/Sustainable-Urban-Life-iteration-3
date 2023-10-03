describe("SolarChoice E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/solar-choice"); // Replace with the path to SolarChoice in your app.
  });

  it("should load the SolarChoice component", () => {
    cy.get(".first-step-container").should("be.visible");
  });

  it("should navigate to the BillCycle step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();
  });

  it("should navigate to the Electricity step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
  });
  it("should navigate to the Location step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
  });
  it("should navigate to the PostcodeInfo step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
    cy.get(".postcode-info").should("be.visible");
    // For Pie Chart:
    cy.get(".recharts-sector").first().trigger("mouseover");
    // Check if tooltip is visible (this depends on how recharts renders tooltips)
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    // For Bar Chart:
    cy.get(".recharts-rectangle").first().trigger("mouseover");

    // Check if tooltip is visible for the bar chart
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    cy.get(".next-button").click();
  });
  it("should navigate to the Battery choice step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
    // For Pie Chart:
    cy.get(".recharts-sector").first().trigger("mouseover");
    // Check if tooltip is visible (this depends on how recharts renders tooltips)
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    // For Bar Chart:
    cy.get(".recharts-rectangle").first().trigger("mouseover");

    // Check if tooltip is visible for the bar chart
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    cy.get(".next-button").click();

    cy.get(".battery-choice").should("be.visible");
    // Click on the 'Yes' option
    cy.get('[data-testid="Yes-option"]').click();
  });
  it("should navigate to the Recommendation step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
    // For Pie Chart:
    cy.get(".recharts-sector").first().trigger("mouseover");
    // Check if tooltip is visible (this depends on how recharts renders tooltips)
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    // For Bar Chart:
    cy.get(".recharts-rectangle").first().trigger("mouseover");

    // Check if tooltip is visible for the bar chart
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    cy.get(".next-button").click();

    cy.get(".battery-choice").should("be.visible");
    // Click on the 'No' option
    cy.get('[data-testid="No-option"]').click();
    cy.get(".recommendation-container").should("be.visible");

    // Select battery choice: "Yes"
    cy.get('[data-testid="Yes"]').should("be.visible");

    // Filter by solar system size
    // Example: select 3kWh (adjust as per actual values)
    cy.get(".filter-section-solar .custom-radio-group").within(() => {
      cy.contains("3kWh").click();
    });

    // Sort by price: Low to High
    cy.get(".sort-section-price").within(() => {
      cy.get('[data-testid="low"]').click();
    });

    // Click on the first installer's "Discover cost savings" button
    cy.get(".installer-card")
      .first()
      .within(() => {
        cy.get('[data-testid="compare-button"]').click();
      });
  });
  it("should allow user to input values and calculate annual bill savings", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
    // For Pie Chart:
    cy.get(".recharts-sector").first().trigger("mouseover");
    // Check if tooltip is visible (this depends on how recharts renders tooltips)
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    // For Bar Chart:
    cy.get(".recharts-rectangle").first().trigger("mouseover");

    // Check if tooltip is visible for the bar chart
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    cy.get(".next-button").click();

    cy.get(".battery-choice").should("be.visible");
    // Click on the 'No' option
    cy.get('[data-testid="No-option"]').click();
    cy.get(".recommendation-container").should("be.visible");

    // Select battery choice: "Yes"
    cy.get('[data-testid="Yes"]').should("be.visible");

    // Filter by solar system size
    // Example: select 3kWh (adjust as per actual values)
    cy.get(".filter-section-solar .custom-radio-group").within(() => {
      cy.contains("3kWh").click();
    });

    // Sort by price: Low to High
    cy.get(".sort-section-price").within(() => {
      cy.get('[data-testid="low"]').click();
    });

    // Click on the first installer's "Discover cost savings" button
    cy.get(".installer-card")
      .first()
      .within(() => {
        cy.get('[data-testid="compare-button"]').click();
      });
    // Assuming you want to test selecting a direction for the solar panel
    cy.get(".compass-container .direction-box.N").click();

    // Adjusting the angle slider
    cy.get(".angle .annual-slider")
      .as("angleSlider")
      .trigger("mousedown", { which: 1, pageX: 300, pageY: 0 })
      .trigger("mousemove", { which: 1, pageX: 350, pageY: 0 }) // change 350 to whatever value moves the handle to your desired position
      .trigger("mouseup", { force: true });

    // Adjusting the cost slider
    cy.get(".cost .annual-slider")
      .as("angleSlider")
      .trigger("mousedown", { which: 1, pageX: 300, pageY: 0 })
      .trigger("mousemove", { which: 1, pageX: 350, pageY: 0 }) // change 350 to whatever value moves the handle to your desired position
      .trigger("mouseup", { force: true });

    // Filling in the electricity cost
    cy.get(".cost input").first().type("10000");

    // Assuming there's another input for the supply charge
    cy.get(".cost input").eq(1).type("25");

    // Clicking the calculate button
    cy.get("button").contains("Calculate").click();
    cy.wait(4000);

    cy.get(".next-button").click();
  });
  it("should navigate to the Quiz step and interact", () => {
    cy.get('[data-testid="step-item-1"]').should("be.visible");
    cy.get('[data-testid="step-item-1"]').click();
    // 2. Wait for the modal to appear. You can target the modal by its title or some other unique selector.
    cy.contains("Do you want to move to this step?").should("be.visible");

    // 3. Click the "Ok" button on the modal.
    // This assumes the "Ok" button can be uniquely identified by its text within the context of the modal.
    cy.contains("OK").click();
    // Check if we're at the BillCycle step
    cy.get(".bill-step").should("be.visible");

    // Interact with Billing Cycle Options
    cy.get('[data-testid="monthly-cycle-container"]').parent().click();

    // Interact with the ElectricityUsage input
    cy.get('[data-testid="electricity-usage-input"]').type("500"); // You can replace "500" with any desired value.
    cy.get(".next-button").click();
    // Check if we're at the Location step
    cy.get(".location-step").should("be.visible");

    // Interact with the location select dropdown.
    // First, click the select to open dropdown options.
    cy.get('[data-testid="suburb-select"]').click();

    // Then select an option. For demonstration, I'm selecting the first option.
    // You can modify this step to select any desired suburb.
    cy.get('[data-testid="suburb-option"]').first().click();

    // Click the next button to move to the next step.
    // Make sure your next button has a unique identifier or a data-testid.
    cy.get(".next-button").click();
    // For Pie Chart:
    cy.get(".recharts-sector").first().trigger("mouseover");
    // Check if tooltip is visible (this depends on how recharts renders tooltips)
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    // For Bar Chart:
    cy.get(".recharts-rectangle").first().trigger("mouseover");

    // Check if tooltip is visible for the bar chart
    cy.get(".recharts-default-tooltip").should("be.visible"); // Modify the selector if recharts uses a different class

    cy.get(".next-button").click();

    cy.get(".battery-choice").should("be.visible");
    // Click on the 'No' option
    cy.get('[data-testid="No-option"]').click();
    cy.get(".recommendation-container").should("be.visible");

    // Select battery choice: "Yes"
    cy.get('[data-testid="Yes"]').should("be.visible");

    // Filter by solar system size
    // Example: select 3kWh (adjust as per actual values)
    cy.get(".filter-section-solar .custom-radio-group").within(() => {
      cy.contains("3kWh").click();
    });

    // Sort by price: Low to High
    cy.get(".sort-section-price").within(() => {
      cy.get('[data-testid="low"]').click();
    });

    // Click on the first installer's "Discover cost savings" button
    cy.get(".installer-card")
      .first()
      .within(() => {
        cy.get('[data-testid="compare-button"]').click();
      });
    // Assuming you want to test selecting a direction for the solar panel
    cy.get(".compass-container .direction-box.N").click();

    // Adjusting the angle slider
    cy.get(".angle .annual-slider")
      .as("angleSlider")
      .trigger("mousedown", { which: 1, pageX: 300, pageY: 0 })
      .trigger("mousemove", { which: 1, pageX: 350, pageY: 0 }) // change 350 to whatever value moves the handle to your desired position
      .trigger("mouseup", { force: true });

    // Adjusting the cost slider
    cy.get(".cost .annual-slider")
      .as("angleSlider")
      .trigger("mousedown", { which: 1, pageX: 300, pageY: 0 })
      .trigger("mousemove", { which: 1, pageX: 350, pageY: 0 }) // change 350 to whatever value moves the handle to your desired position
      .trigger("mouseup", { force: true });

    // Filling in the electricity cost
    cy.get(".cost input").first().type("10000");

    // Assuming there's another input for the supply charge
    cy.get(".cost input").eq(1).type("25");

    // Clicking the calculate button
    cy.get("button").contains("Calculate").click();
    cy.wait(4000);
    cy.get(".next-button").click();
    const questions = [
      "Are you the owner-occupier of an existing property where the solar panel (PV) system is to be installed or the owner of a home currently under construction where the solar panel (PV) system is to be installed?",
      "Does the combined taxable income of all the owners of the house amount to less than $210,000 per year?",
      "Have you or any other owner-occupier of the property received a solar panel (PV) rebate or solar battery rebate under the Solar Homes Program in the past?",
      "Is the market value of the property less than $3 million, or if the home is under construction, will it be valued at less than $3 million upon completion?",
      "Has the property address ever received a solar panel (PV) rebate or a solar battery rebate under the Solar Homes Program in the past?",
      "Has a solar panel (PV) system been installed in the property after 1 November 2009?",
    ];

    // Check if questions are displayed
    questions.forEach((question, index) => {
      cy.contains(question).should("be.visible");

      // Answering all questions as 'Yes'
      cy.get(".question")
        .eq(index)
        .find(".button-group button")
        .contains("Yes")
        .click();

      // Validate that the button has the class 'selected'
      cy.get(".question")
        .eq(index)
        .find(".button-group button.selected")
        .contains("Yes");
    });

    // Submit the quiz
    cy.get(".buttonSubmit").click();

    const yearToInput = 2025;

    // Check if installation form is visible
    cy.get(".installation-year").should("be.visible");

    // Input the year
    cy.get('.installation-year input[type="number"]')
      .type(yearToInput)
      .should("have.value", yearToInput.toString());

    // Click on Calculate Rebate button
    cy.get(".installation-year button").contains("Calculate Rebate").click();
  });

  it("should click the Solutions navbar and move to Solar Energy Benefit", () => {
    // Hover over the Solutions navbar item to reveal the dropdown
    cy.get('.nav-item:contains("Solutions")').trigger("mouseover");

    // Click on Solar Energy Benefit from the dropdown menu
    cy.get('.menu-item:contains("Solar Energy Benefit")').click();

    // Check if we've navigated to the Solar Energy Benefit page
    cy.url().should("include", "/solar-energy-benefit");
  });

  it("should click the Solutions navbar and move to Government Support Program", () => {
    // Hover over the Solutions navbar item to reveal the dropdown
    cy.get('.nav-item:contains("Solutions")').trigger("mouseover");

    // Click on Government Support Program from the dropdown menu
    cy.get('.menu-item:contains("Government Support Program")').click();

    // Check if we've navigated to the Government Support Program page
    cy.url().should("include", "/government-support");
  });
  it("should click the Calculate Solar Potential and interact", () => {
    // Hover over the Solutions navbar item to reveal the dropdown
    cy.get('.nav-item:contains("Solutions")').trigger("mouseover");

    // Click on Government Support Program from the dropdown menu
    cy.get('.menu-item:contains("Calculate Solar Potential")').click();

    // Check if we've navigated to the Government Support Program page
    cy.url().should("include", "/estimation");
    cy.wait(2000);

    // Type in the address
    cy.get('input[placeholder="Enter your address here"]').type(
      "Unit 6, 26 panorama street, clayton vic"
    );
    cy.wait(1000);
    cy.get('input[placeholder="Enter your address here"]').type(
      "{downarrow}{enter}"
    );

    // Wait a bit for the Google Map to load and be ready for interaction (this might need adjustment)
    cy.wait(2000);

    // Emulate drawing 2 rectangles on the map (coordinates will need adjustments)
    // First rectangle
    // Draw the first rectangle on the map
    cy.get(".ggMap").click(200, 200);
    cy.wait(1000);

    cy.get(".ggMap").click(250, 200);
    cy.wait(1000);

    cy.get(".ggMap").click(250, 250);
    cy.wait(1000);

    cy.get(".ggMap").click(200, 250);
    cy.wait(1000);

    cy.get(".ggMap").click(200, 200);
    cy.wait(1000);

    // Draw the second rectangle on the map
    cy.get(".ggMap").click(300, 200);
    cy.wait(1000);

    cy.get(".ggMap").click(350, 200);
    cy.wait(1000);

    cy.get(".ggMap").click(350, 250);
    cy.wait(1000);

    cy.get(".ggMap").click(300, 250);
    cy.wait(1000);

    cy.get(".ggMap").click(300, 200);
    cy.wait(1000);

    // Delete the second polygon
    // Assuming you have a delete button for each polygon in the PolygonInfo component
    cy.get(".polygon-management button").eq(1).click();
  });
});
