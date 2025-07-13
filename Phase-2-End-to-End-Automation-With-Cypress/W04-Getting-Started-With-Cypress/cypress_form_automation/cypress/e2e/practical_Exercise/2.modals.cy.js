describe("Modal Visibility Test", () => {
  // Handle any uncaught exceptions globally (like third-party script errors)
  before(() => {
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Script error")) return false; // Prevent test failure
    });
  });

  it("Exercise 2: Verify modal is hidden by default and visible after button click", () => {
    // Step 1: Visit the demo modal page
    cy.visit("https://demoqa.com/modal-dialogs");

    // Step 2: Ensure modal is not visible before any interaction
    cy.get(".modal-content").should("not.exist");

    // Step 3: Click the button to show the Small Modal
    cy.get("#showSmallModal").click();

    // Step 4: Assert that modal becomes visible with correct title
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-title").should("contain", "Small Modal");

    // Step 5: Click the close button to hide the modal
    cy.get("#closeSmallModal").click();

    // Step 6: Ensure modal is no longer visible after closing
    cy.get(".modal-content").should("not.exist");
  });
});
