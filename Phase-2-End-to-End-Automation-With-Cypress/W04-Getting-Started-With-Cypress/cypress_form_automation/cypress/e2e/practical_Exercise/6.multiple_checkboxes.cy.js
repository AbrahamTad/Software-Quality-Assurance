describe("Select and verify multiple checkboxes", () => {
  it("should check multiple checkboxes and verify each is checked", () => {
    // Step 1: Visit the page
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Select multiple checkboxes by value
    const checkboxValues = ["option1", "option2", "option3"];

    checkboxValues.forEach((value) => {
      cy.get(`input[type="checkbox"][value="${value}"]`)
        .check()
        .should("be.checked"); // Verify each is checked
    });
  });
});
