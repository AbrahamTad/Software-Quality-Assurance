// Week-6/alert.cy.js
describe("Cypress Alert Handling Tests", () => {
  beforeEach(() => {
    // Visit the test page before each test
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
  });

  it("should handle a basic JS alert", () => {
    // Set up the alert handler before triggering the alert
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("I am a JS Alert");
    });

    // Click the button that triggers the alert
    cy.get(":nth-child(1) > button").click();

    // Verify the result message
    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  it("should handle a JS confirm alert - Accept", () => {
    // Stub the confirm to return true (OK)
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("I am a JS Confirm");
      return true; // Accept the confirm alert
    });

    // Click the button that triggers the confirm
    cy.get(":nth-child(2) > button").click();

    // Verify the result message
    cy.get("#result").should("have.text", "You clicked: Ok");
  });

  it("should handle a JS confirm alert - Cancel", () => {
    // Stub the confirm to return false (Cancel)
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).to.equal("I am a JS Confirm");
      return false; // Cancel the confirm alert
    });

    // Click the button that triggers the confirm
    cy.get(":nth-child(2) > button").click();

    // Verify the result message
    cy.get("#result").should("have.text", "You clicked: Cancel");
  });

  it("should handle a JS prompt alert", () => {
    const promptText = "Hello prompt!";

    cy.window().then((win) => {
      // Stub the prompt to return our text
      cy.stub(win, "prompt").returns(promptText);
    });

    // Set up the alert handler for the initial prompt
    cy.on("window:prompt", (promptMessage) => {
      expect(promptMessage).to.equal("I am a JS prompt");
    });

    // Click the button that triggers the prompt
    cy.get(":nth-child(3) > button").click();

    // Verify the result message
    cy.get("#result").should("have.text", `You entered: ${promptText}`);
  });
});
