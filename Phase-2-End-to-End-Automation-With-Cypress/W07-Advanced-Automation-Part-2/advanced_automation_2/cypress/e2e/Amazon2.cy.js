describe("Amazon Shopping Cart State Management", () => {
  beforeEach(() => {
    cy.login("mukera@mail.com", "123456");

    // Clear the cart before each test
    cy.get("._cart_1pyyw_113").should("be.visible").click();
  });

  it("starts with an empty cart", () => {
  
    // cy.get("._cart_1pyyw_113").should("have.text", 0);
    cy.get("._cart_1pyyw_113").should("contain", 0);
  });

  it("adds an item to the cart and updates count", () => {
    cy.get("._category_py5b4_1")
    cy.get("._fixed_1pyyw_6v").first().contains("Add to Cart").click();
    cy.get("._cart_1pyyw_113").should("contain", 1);
  });
});
