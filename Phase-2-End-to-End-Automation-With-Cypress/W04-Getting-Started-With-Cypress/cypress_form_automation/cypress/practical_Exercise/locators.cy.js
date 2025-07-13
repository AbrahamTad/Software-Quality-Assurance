describe("Locators Practice", () => {
  it("Exercise 1: Locate elements using ID, class, and attribute", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.get("#name").type("John Doe"); // ID
    cy.get(".form-control").eq(1).type("test@example.com"); // Class
    cy.get('[name="email"]').clear().type("demo@example.com"); // Attribute
  });

  it("Exercise 4: Verify /shop link", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    cy.get('a[href="/shop"]').should("have.attr", "href", "/shop");
  });
});
