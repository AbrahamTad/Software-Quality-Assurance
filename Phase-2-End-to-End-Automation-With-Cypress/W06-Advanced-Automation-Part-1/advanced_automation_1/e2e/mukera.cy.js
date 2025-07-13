// Cypress test suite for handling various JavaScript alerts on Vinoth QA Academy site
describe("Vinoth QA Academy - Alert & Popup Handling", () => {
  // Navigate to the alerts test page before each test
  beforeEach(() => {
    cy.visit("https://vinothqaacademy.com/alert-and-popup/");
    cy.on("windnow:alert", (almsg) => {
      expect(almsg).to.equal("I am an alert box!");
    });
    cy.get(".elementor-element-fc8696a button").click(); // Click the alert button to trigger the alert
    cy.get("result").should("have.text", "You clicked on OK!");
  });

  // Test case: Handle a simple Alert (OK only)
  it("handles JS Alert", () => {
    // Stub the window.alert function to intercept the alert box and track the call
    cy.window().then((win) => cy.stub(win, "alert").as("alertStub"));

    // Click the alert button to trigger the JavaScript alert
    cy.get(".elementor-element-fc8696a button").click();

    // Assert that the stubbed alert was called with the expected message
    cy.get("@alertStub").should("have.been.calledWith", "I am an alert box!");
  });

  // Test case: Handle a JavaScript Confirm dialog by simulating clicking OK
  it("handles JS Confirm - OK", () => {
    // Stub the window.confirm method to return true (simulate clicking OK)
    cy.window().then((win) =>
      cy.stub(win, "confirm").returns(true).as("confirmOK")
    );

    // Click the confirmation button to trigger the confirm dialog
    cy.get(".elementor-element-01aedcf button").click();

    // Assert that the stubbed confirm dialog was called with the correct message
    cy.get("@confirmOK").should(
      "have.been.calledWith",
      "Confirm pop up with OK and Cancel button"
    );

    // Verify that the result message is displayed correctly on the page
    cy.get("#confirm-msg").should("have.text", "You pressed OK!");
  });

  // Test case: Handle a JavaScript Confirm dialog by simulating clicking Cancel
  it("handles JS Confirm - Cancel", () => {
    // Stub the window.confirm method to return false (simulate clicking Cancel)
    cy.window().then((win) =>
      cy.stub(win, "confirm").returns(false).as("confirmCancel")
    );

    // Click the confirmation button again to trigger the confirm dialog
    cy.get(".elementor-element-01aedcf button").click();

    // Assert that the stubbed confirm dialog was called correctly
    cy.get("@confirmCancel").should(
      "have.been.calledWith",
      "Confirm pop up with OK and Cancel button"
    );

    // Verify that the result message reflects the cancel action
    cy.get("#confirm-msg").should("have.text", "You pressed Cancel!");
  });

  // Test case: Handle JavaScript Prompt with both input and cancel scenarios
  it("handles JS Prompt with visible UI messages", () => {
    // Define test cases as [input value, expected result message]
    const testCases = [
      ["Cypress", "Hello Cypress! How are you today?"], // Simulate user typing "Cypress"
      [null, "You cancelled the prompt"], // Simulate user clicking Cancel
    ];

    // Loop through each test case and perform the interaction + assertion
    testCases.forEach(([inputValue, expectedText]) => {
      // Stub the window.prompt method to return a desired value
      cy.window().then((win) =>
        cy.stub(win, "prompt").returns(inputValue).as("promptStub")
      );

      // Click the prompt alert button to trigger the dialog
      cy.get(".elementor-element-d0c9145 button").click();

      // Assert that the stubbed prompt was called with the correct prompt message
      cy.get("@promptStub").should(
        "have.been.calledWith",
        "Do you like Automation ?",
        "Yes/No"
      );

      // Assert that the resulting text on the page matches the expected outcome
      cy.get("#prompt-msg", { timeout: 5000 }).should(
        "have.text",
        expectedText
      );
    });
  });
});
