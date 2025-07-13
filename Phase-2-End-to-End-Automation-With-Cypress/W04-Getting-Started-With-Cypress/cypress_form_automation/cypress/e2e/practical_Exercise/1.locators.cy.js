// This file contains Cypress tests for locating elements using ID, class, and attribute selectors.
// The tests are designed to interact with a practice page from Rahul Shetty Academy.

// 1. Visit the following URL in your test:
//    `https://rahulshettyacademy.com/angularpractice/`
// 2. Use Cypress to locate and interact with elements using:

//    * ID selector
//    * Class selector
//    * Attribute selector
// 3. Add `cy.get()` commands for at least:

//    * Input fields (name, email, password)
//    * Checkbox
//    * Dropdown (select)
//    * Radio buttons
//    * Submit button
//    * Date input field

describe("Locators Practice", () => {
  it("Exercise 1: Locate elements using ID, class, and attribute selectors", () => {
    // Visit the practice page
    cy.visit("https://rahulshettyacademy.com/angularpractice/");

    // Class selector
    cy.get(":nth-child(1) > .form-control").type("Abaham Tadesse"); // Name input field
    cy.get(":nth-child(2) > .form-control").type("mukera@example.com"); // Email input field
    //cy.get(".ng-invalid.ng-dirty > :nth-child(2)").type("mukera@example.com"); // Email input field;

    // ID selectors
    cy.get("#exampleInputPassword1").type("securePassword123"); // Password input field
    cy.get("#exampleCheck1").check(); // Checkbox

    // Class selector
    cy.get(".btn").click(); // Button with class="btn"

    // Select dropdown using ID
    cy.get("#exampleFormControlSelect1").select("Female"); // Dropdown selection

    // Radio buttons using ID
    cy.get("#inlineRadio1").check(); // Radio option 1
    cy.get("#inlineRadio2").check(); // Radio option 2

    // Date input field
    //cy.get(":nth-child(8) > .form-control").type("1999-12-31"); // DOB field

    // Attribute selector for input type date
    cy.get('input[type="date"]').type("1999-12-31"); // Date input field
  });
});
