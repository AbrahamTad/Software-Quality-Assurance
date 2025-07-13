// cypress/e2e/form_automation_test.cy.js

describe("Business Registration Form Automation", () => {
  it("should fill out and submit the form successfully", () => {
    // Visit the form URL
    cy.visit("https://form.jotform.com/");

    // Fill out text inputs
    cy.get("#first_3").type("James"); // First Name
    cy.get("#last_3").type("Bond"); // Last Name
    cy.get("#input_4").type("Bond Company"); // Business Name
    cy.get("#input_5_full").type("(000) 000-0000"); // Contact Number
    cy.get("#input_6").type("jbond@example.com"); // Email

    // Fill out address fields
    cy.get("#input_7_addr_line1").type("123 London Street"); // Street Address
    cy.get("#input_7_addr_line2").type("Apt 2"); // Street Address Line 2
    cy.get("#input_7_city").type("London"); // City
    cy.get("#input_7_state").type("Maryland"); // State
    cy.get("#input_7_postal").type("20902"); // Zip Code

    // Select type of business (Store)
    cy.get("#input_8_1").check(); // Store (radio button)

    // Enter message
    cy.get("#input_9").type("This is a sample text.");

    // Submit the form
    cy.get("#input_2").click();

    // Confirm successful submission
    // You might need to verify a URL change or a success message appears
    cy.url().should("include", "submit");
  });
});
