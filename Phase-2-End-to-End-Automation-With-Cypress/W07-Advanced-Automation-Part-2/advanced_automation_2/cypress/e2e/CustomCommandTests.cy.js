// Test Suite: Custom Command Tests
describe("Test suite for custom command", () => {
  it("Test case for custom command", function () {
    // Correct usage: pass product name as a string
    cy.addTocart("Blackberry");
  });
});
