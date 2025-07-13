describe("Order Management Tests", () => {
  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/bookstore/orders");
    cy.get("h1").should("contain", "Orders");
  });

  afterEach(() => {
    // Reset modifications made during the test
    cy.get("body").then(($body) => {
      if ($body.text().includes("Cancelled")) {
        cy.get('[data-testid^="reactivate-"]').first().click();
        cy.get('[data-testid^="order-status-"]')
          .first()
          .should("not.contain", "Cancelled");
      }
    });
  });

  it("Views order details successfully", () => {
    cy.get('[data-testid^="view-"]').first().click();
    cy.url().should("include", "/order-details/");
    cy.get("h1").should("contain", "Order Details");
    cy.get('[data-testid="back-to-orders"]').click();
  });

  it("Cancels an order and verifies status change", () => {
    cy.get('[data-testid^="order-status-"]')
      .first()
      .then(($status) => {
        const initialStatus = $status.text().trim();

        cy.get('[data-testid^="cancel-"]').first().click();
        cy.get('[data-testid^="order-status-"]')
          .first()
          .should("have.text", "Cancelled");

        // Store initial status for afterEach restoration
        cy.wrap(initialStatus).as("initialStatus");
      });
  });
});
