describe("About locators", () => {
  it("Facebook login", () => {
    cy.visit("https://facebook.com");
    // cy.get("#email").type("This is using id name");
    cy.get('[data-testid="royal-email"]').type("This is from test runner");
    cy.get('[data-testid="royal-pass"]').type("This is password");
    cy.get('[data-testid="royal-login-button"]').click();
  });
});
