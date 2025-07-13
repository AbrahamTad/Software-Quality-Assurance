describe("Disabled Checkbox Test", () => {
  it("should check if checkbox is disabled, then enable and verify", () => {
    // Visit the practice site
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Check if the checkbox is initially disabled
    cy.get("#termsCheckbox").should("be.disabled");

    // Enable the checkbox using JavaScript
    cy.get("#termsCheckbox").invoke("prop", "disabled", false);

    // Verify the checkbox is now enabled
    cy.get("#termsCheckbox").should("not.be.disabled");

    // Check the checkbox and verify it's checked
    cy.get("#termsCheckbox").check().should("be.checked");
  });
});
