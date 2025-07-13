describe("Click Shop Link Test", () => {
  it("should click the Shop link using nth-child selector", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");

    // Click the Shop link using the nth-child selector
    cy.get(":nth-child(2) > .nav-link").click();

    // Verify the URL includes '/shop'
    cy.url().should("include", "/shop");
  });
});
