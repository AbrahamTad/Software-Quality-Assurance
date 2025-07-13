// Custom command to reset Amazon cart state
Cypress.Commands.add("resetAmazonCart", () => {
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.visit("https://www.amazon.com/gp/cart/view.html", {
    headers: { "Accept-Encoding": "gzip, deflate" },
    failOnStatusCode: false,
  });

  const cleanCart = () => {
    cy.get("body", { timeout: 10000 }).then(($body) => {
      if ($body.find('[data-action="delete"]').length > 0) {
        cy.get('[data-action="delete"]').first().click({ force: true });
        cy.get(".sc-list-item-removed-msg", { timeout: 5000 }).should("be.visible");
        cleanCart(); // recurse
      } else {
        cy.get("#nav-cart-count", { timeout: 5000 }).should("contain", "0");
      }
    });
  };

  cleanCart();
});

describe("Amazon Cart State Management", () => {
  const TEST_PRODUCT_ASIN = "B08N5WRWNW"; // Replace with a valid product if 404

  beforeEach(() => {
    cy.resetAmazonCart();
    cy.visit("https://www.amazon.com", {
      headers: { "Accept-Encoding": "gzip, deflate" },
      failOnStatusCode: false,
    });
  });

  it("1. Verifies empty cart state", () => {
    cy.get("#nav-cart-count", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "0");

    cy.visit("https://www.amazon.com/gp/cart/view.html", {
      failOnStatusCode: false,
    });

    // Check for known empty cart elements (Amazon changes class names often)
    cy.get("body").then(($body) => {
      if ($body.find(".sc-empty-cart-header").length > 0) {
        cy.get(".sc-empty-cart-header")
          .should("be.visible")
          .and("contain.text", "empty");
      } else if ($body.find("#sc-active-cart").length > 0) {
        cy.get("#sc-active-cart")
          .should("exist")
          .within(() => {
            cy.get(".sc-list-item").should("not.exist");
            cy.contains("Proceed to Checkout").should("not.exist");
          });
      } else {
        throw new Error("Unable to determine cart state");
      }
    });
  });

  it("2. Validates cart updates when adding items", () => {
    cy.visit(`https://www.amazon.com/dp/${TEST_PRODUCT_ASIN}`, {
      failOnStatusCode: false,
    });

    // Ensure product page loaded
    cy.get("body").then(($body) => {
      if ($body.find("#add-to-cart-button").length === 0) {
        throw new Error("Add to Cart button not found. Product may be unavailable.");
      }
    });

    cy.get("#add-to-cart-button", { timeout: 10000 }).click();

    cy.get("body").then(($body) => {
      if ($body.find("#attachSiNoCoverage").length) {
        cy.get("#attachSiNoCoverage input").click();
      }
      if ($body.find("#attach-close_sideSheet-link").length) {
        cy.get("#attach-close_sideSheet-link").click();
      }
    });

    cy.get("#nav-cart-count", { timeout: 10000 })
      .should("be.visible")
      .and("not.have.text", "0");

    cy.visit("https://www.amazon.com/gp/cart/view.html", {
      failOnStatusCode: false,
    });

    cy.get(".sc-list-item", { timeout: 10000 })
      .should("have.length.at.least", 1)
      .within(() => {
        cy.get(`[data-asin="${TEST_PRODUCT_ASIN}"]`).should("exist");
        cy.get(".sc-product-title").should("exist");
        cy.get(".sc-quantity-textfield").should("have.value", "1");
      });
  });
});
