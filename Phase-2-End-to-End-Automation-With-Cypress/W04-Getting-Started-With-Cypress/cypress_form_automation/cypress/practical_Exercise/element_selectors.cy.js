/// <reference types="cypress" />

describe("Element Selection Techniques", () => {
  beforeEach(() => {
    // Visit target website before each test
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
  });

  it("Demonstrates element selection methods", () => {
    // ======================
    // 1. ID SELECTOR
    // ======================
    // Best for unique elements. Fastest and most reliable.
    cy.get("#name") // Targets element with id="name"
      .type("John Doe")
      .should("have.value", "John Doe"); // Verification

    // ======================
    // 2. CLASS SELECTOR
    // ======================
    // Use with caution - classes are often shared
    cy.get(".form-control") // Targets ALL elements with class="form-control"
      .first() // Filters to first matching element (Name field)
      .clear()
      .type("Jane Smith");

    // Alternative: Combine with other attributes for precision
    cy.get(".form-control.ng-pristine") // Chained classes
      .first()
      .should("have.value", "Jane Smith");

    // ======================
    // 3. ATTRIBUTE SELECTOR
    // ======================
    // Powerful for elements with unique attributes
    cy.get('[type="submit"]') // Targets button by type attribute
      .should("be.visible")
      .and("contain", "Submit"); // Additional assertion

    // Combine attribute with value matching
    cy.get('[name="email"]') // Targets exact name attribute
      .type("test@example.com")
      .should("have.attr", "name", "email"); // Attribute verification

    // Partial attribute matching
    cy.get('[class*="btn-success"]') // Contains "btn-success"
      .should("have.class", "btn-success");

    // ======================
    // COMBINED SELECTORS
    // ======================
    // Mix different selector types for precision
    cy.get('input.form-control[name="email"]') // Tag + class + attribute
      .clear()
      .type("new@email.com");

    // Checkbox using ID + attribute
    cy.get('#exampleCheck1[type="checkbox"]').check().should("be.checked");

    // Dropdown selection using compound selector
    cy.get("select#exampleFormControlSelect1") // Tag + ID
      .select("Female")
      .should("have.value", "Female");
  });
});
