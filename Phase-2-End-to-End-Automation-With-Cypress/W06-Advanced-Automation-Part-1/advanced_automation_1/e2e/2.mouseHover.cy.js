// Test suite for mouse hover interactions on the Rahul Shetty Academy practice page
describe("MouseHover Interaction", () => {
  // Test case to simulate mouse hover behavior using .invoke('show') (since real hover is tricky in Cypress)
  it("mouseover action", () => {
    // Step 1: Visit the target practice website where hover functionality is implemented
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Step 2: Manually display the hidden hover menu using .invoke("show")
    // Why? Because Cypress doesn't support native hover events well, so we simulate it by forcing visibility
    cy.get(".mouse-hover-content")
      .invoke("show") // Programmatically display the hidden hover menu
      .should("be.visible"); // Assert that the hover menu is now visible in the DOM

    // Step 3: Verify that the "Top" option becomes visible as part of the hover menu
    cy.contains("Top").should("be.visible");

    // Step 4: Verify that the "Reload" option is also visible in the same menu
    cy.contains("Reload").should("be.visible");

     });
});
// 