// Cypress test suite for handling various JavaScript alerts (alert, confirm, prompt)
// on the Vinoth QA Academy demo site.
describe("Vinoth QA Academy - Alert & Popup Handling", () => {
  // Test Case 1: Handle a simple JavaScript alert (OK-only)
  it("handles simple Alert", () => {
    // Step 1: Navigate to the alert and popup demo page
    cy.visit("https://vinothqaacademy.com/alert-and-popup/");

    // Step 2: Listen for the 'window:alert' event and validate the alert message
    cy.on("window:alert", (almsg) => {
      expect(almsg).to.equal("I am an alert box!"); // Validate the alert text
    });

    // Step 3: Click the button that triggers the alert popup
    cy.get(".elementor-element-fc8696a button").click();

    // Step 4: Verify the result message shown after clicking "OK" on the alert
    cy.get("#demotwo").should("have.text", "You clicked on OK!");
  });

  // Test Case 2: Handle a JavaScript confirm box (OK and Cancel buttons)
  it("handles simple confirm", () => {
    // Step 1: Navigate to the alert and popup demo page
    cy.visit("https://vinothqaacademy.com/alert-and-popup/");

    // Step 2: Listen for the 'window:confirm' event and validate the confirmation text
    cy.on("window:confirm", (almsg) => {
      expect(almsg).to.equal("Confirm pop up with OK and Cancel button");
      return true; // Simulate clicking "OK"
    });

    // Step 3: Click the button that triggers the confirmation popup
    cy.get(".elementor-element-01aedcf button").click();

    // Step 4: Verify the result message displayed after clicking "OK" on the confirmation
    cy.get("#demo").should("have.text", "You clicked on OK!");
  });

  // Test Case 3: Handle a JavaScript prompt (text input + OK/Cancel buttons)
  it("handles simple prompt", () => {
    // Step 1: Navigate to the alert and popup demo page
    cy.visit("https://vinothqaacademy.com/alert-and-popup/");

    // Step 2: Stub the native window.prompt function to simulate user input
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("yes"); // Simulate user typing "yes" and clicking OK
    });

    // Step 3: Click the button that triggers the prompt popup
    cy.get(".elementor-element-d0c9145 button").click();

    // Step 4: Verify the result message shown after submitting the prompt
    // (The site automatically appends the entered text to a confirmation message.)
    cy.get("#demoone").should("have.text", "Thanks for Liking Automation");
  });
});
