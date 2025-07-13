// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// Custom command to add a product to the cart based on its title
Cypress.Commands.add("addTocart", (productName) => {
    // Visit the shop page
    cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
  
    // Wait for the product cards to load
    cy.get(".card-title").each(($el, index) => {
      if ($el.text().includes(productName)) {
        // Match product title and click corresponding "Add to Cart" button
        cy.get(".card-footer .btn.btn-info").eq(index).click();
      }
    });
  });

// Custom command to reset the Amazon cart
// This command clears cookies and local storage, then navigates to the cart page
Cypress.Commands.add("resetAmazonCart", () => {
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.visit("https://www.amazon.com/gp/cart/view.html", {
    failOnStatusCode: false,
  });

  const cleanCart = () => {
    cy.get("body", { timeout: 10000 }).then(($body) => {
      if ($body.find('[data-action="delete"]').length) {
        cy.get('[data-action="delete"]').first().click({ force: true });
        cy.get(".sc-list-item-removed-msg", { timeout: 5000 }).should(
          "be.visible"
        );
        cleanCart();
      } else {
        cy.get("#nav-cart-count", { timeout: 5000 }).should("contain", "0");
      }
    });
  };

  cleanCart();
});
// Custom command to log in to the Amazon frontend application
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://amazonfrontend001.netlify.app/");

  // Wait for the login form to appear
  cy.get('[href="/auth"] > div > p').click();
  cy.get("#email", { timeout: 10000 }).should("be.visible").type(email);
  cy.get("#password").type(password, { log: false });
  cy.get("._login__signInBtn_18k4w_53").click();
});


import "cypress-file-upload";

  
  
