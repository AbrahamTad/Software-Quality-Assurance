/// <reference types="cypress" />

describe("Amazon Shopping Cart State Management", () => {
    const amazonUrl = "https://www.amazon.com/";
    const searchItem = "Cypress book"; // An item to search and add
  
    beforeEach(() => {
      // Clear all cookies and local storage to ensure a clean state
      cy.clearAllCookies();
      cy.clearLocalStorage();
  
      // Visit Amazon's homepage
      cy.visit(amazonUrl);
  
      // Optional: Implement a more robust cart reset if necessary
      // For Amazon, clearing cookies/local storage usually suffices for an anonymous cart.
      // If logged in state needs to be managed, you'd add logout steps here.
  
      // Verify the cart is empty after reset (initial check)
      // This is a common pattern to ensure the beforeEach setup worked.
      cy.get("#nav-cart-count").should("have.text", "0");
    });
  
    it("should verify that the cart begins empty", () => {
      // The verification that the cart begins empty is already done in beforeEach
      // This test serves as a direct confirmation of that initial state.
      cy.get("#nav-cart-count").should("have.text", "0");
    });
  
    it("should add an item to the cart and confirm the item count updates", () => {
      // Search for an item
      cy.get("#twotabsearchtextbox").type(searchItem);
      cy.get("#nav-search-submit-button").click();
  
      // Wait for search results to load and click on the first item
      cy.get('[data-component-type="s-search-result"]').first().click();
  
      // Add the item to the cart
      // Ensure the 'add to cart' button is visible and clickable
      cy.get("#add-to-cart-button").should("be.visible").click();
  
      // A small wait might be necessary for the cart update to reflect on the UI
      cy.wait(2000); // Adjust as needed based on Amazon's responsiveness
  
      // Confirm the item count updates correctly (should be '1' or more if item is a bundle)
      // We'll assert for '1' assuming a single item purchase
      cy.get("#nav-cart-count").should("have.text", "1");
  
      // Optional: Verify the item is indeed in the cart by navigating to the cart page
      cy.get("#nav-cart").click();
      cy.contains(searchItem).should("be.visible");
    });
  });
  