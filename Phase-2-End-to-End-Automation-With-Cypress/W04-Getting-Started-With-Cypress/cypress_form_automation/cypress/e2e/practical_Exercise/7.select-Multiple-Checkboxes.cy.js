describe("Select Multiple Checkboxes and Verify", () => {
  it("should check multiple checkboxes and verify they are checked", () => {
    // Visit the practice site
    cy.visit("https://www.rahulshettyacademy.com/AutomationPractice/");

    // Define the checkbox values to be selected
    const values = ["option1", "option2", "option3"];

    // Loop through each value and select the corresponding checkbox
    values.forEach((val) => {
      cy.get(`input[type="checkbox"][value="${val}"]`)
        .check() // Check the checkbox
        .should("be.checked"); // Verify it's checked
    });
  });
});
