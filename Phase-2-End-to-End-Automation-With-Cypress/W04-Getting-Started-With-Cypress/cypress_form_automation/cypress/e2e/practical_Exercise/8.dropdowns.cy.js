describe("Check and enable a disabled checkbox", () => {
  it("should verify #termsCheckbox is disabled, enable it, and verify it is enabled", () => {
    // Visit the page
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Inject a dummy checkbox into the page for demonstration
    cy.document().then((doc) => {
      const checkbox = doc.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "termsCheckbox";
      checkbox.disabled = true; // Initially disabled
      doc.body.appendChild(checkbox);
    });

    // Step 1: Verify the checkbox is disabled
    cy.get("#termsCheckbox").should("be.disabled");

    // Step 2: Enable the checkbox using JavaScript
    cy.get("#termsCheckbox").then(($checkbox) => {
      $checkbox.prop("disabled", false);
    });

    // Step 3: Verify it is now enabled
    cy.get("#termsCheckbox").should("exist");
    cy.get("#termsCheckbox").should("not.be.disabled");

    // Step 4: Optionally check the checkbox
    cy.get("#termsCheckbox").check().should("be.checked");
  });
});
