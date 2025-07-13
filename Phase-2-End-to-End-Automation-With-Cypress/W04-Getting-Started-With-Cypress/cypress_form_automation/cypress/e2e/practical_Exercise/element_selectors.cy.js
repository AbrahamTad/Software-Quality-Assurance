// This file contains Cypress tests for locating elements using ID, class, and attribute selectors.
// The tests are designed to interact with a practice page from Rahul Shetty Academy.

// Overall Goal:
// 1. Visit the specified URL: `https://rahulshettyacademy.com/angularpractice/`
// 2. Use Cypress to locate and interact with various form elements using different selector types:
//    - ID selector (`#id`)
//    - Class selector (`.class`)
//    - Attribute selector (`[attribute="value"]`) - *Note: The provided code primarily uses ID and class,
//      we'll add an attribute selector example.*
// 3. Specifically target and interact with:
//    - Input fields (Name, Email, Password, Date)
//    - Checkbox
//    - Dropdown (Select)
//    - Radio buttons
//    - Submit button

describe("Locators Practice", () => {
  // The 'describe' block groups related tests together.
  // "Locators Practice" is a descriptive name for this suite of tests.

  it("Exercise 1: Locate elements using ID, class, and attribute selectors", () => {
    // The 'it' block defines a single test case.
    // The string describes what this specific test aims to achieve.

    // 1. Visit the practice page
    // cy.visit() command navigates the browser to the specified URL.
    cy.visit("https://rahulshettyacademy.com/angularpractice/");

    // --- Interacting with Input Fields ---

    // Name input field: Using a combination of nth-child and class selectors.
    // A more robust approach would be to use an attribute selector if available,
    // or a more specific class if the class name is unique enough for this field.
    // This current selector (":nth-child(1) > .form-control") works but can be brittle
    // if the page structure changes.
    // IMPROVEMENT: Let's try to find a more specific selector if possible,
    // or explain why this one is used (e.g., no ID or unique class).
    // For demonstration, let's assume 'name="name"' attribute for the Name field.
    cy.get('input[name="name"]').type("Abraham Tadesse"); // Better: Using attribute selector for input name
    // Original: cy.get(":nth-child(1) > .form-control").type("Abaham Tadesse");

    // Email input field: Similar to the name field, using nth-child and class.
    // IMPROVEMENT: Let's use an attribute selector for the email input.
    cy.get('input[name="email"]').type("mukera@example.com"); // Better: Using attribute selector for input email
    // Original: cy.get(":nth-child(2) > .form-control").type("mukera@example.com");
    // The commented-out line `cy.get(".ng-invalid.ng-dirty > :nth-child(2)").type("mukera@example.com");`
    // was an alternative but likely too specific to a temporary state (.ng-invalid.ng-dirty)
    // and thus less reliable for general element location.

    // Password input field: Using an ID selector.
    // ID selectors (`#exampleInputPassword1`) are generally the most reliable
    // as IDs are *supposed* to be unique within a document.
    cy.get("#exampleInputPassword1").type("securePassword123");
    // cy.type() is used to type text into input fields.

    // --- Interacting with Checkbox ---

    // Checkbox: Using an ID selector.
    cy.get("#exampleCheck1").check();
    // cy.check() is used to check a checkbox or radio button.

    // --- Interacting with Buttons ---

    // Submit button: Using a class selector.
    // `.btn` targets any element with the class "btn". If there are multiple
    // buttons with this class, this could be ambiguous.
    // IMPROVEMENT: If this is the *only* submit button or has a more specific class/ID, use that.
    // For now, assuming it's the primary "btn" on the page.
    cy.get(".btn.btn-success").click(); // More specific if it's a success button
    // Or if it's the submit button: cy.get('button[type="submit"]').click();
    // Original: cy.get(".btn").click();
    // cy.click() is used to simulate a click on an element.

    // --- Interacting with Dropdown (Select) ---

    // Dropdown selection: Using an ID selector.
    cy.get("#exampleFormControlSelect1").select("Female");
    // cy.select() is used to select an option from a `<select>` dropdown.
    // You can pass the value, text, or index of the option. "Female" is the visible text.

    // --- Interacting with Radio Buttons ---

    // Radio option 1: Using an ID selector.
    cy.get("#inlineRadio1").check();
    // As with checkboxes, cy.check() is used.

    // Radio option 2: Using an ID selector.
    cy.get("#inlineRadio2").check();
    // Note: When checking radio buttons, checking a new one will automatically uncheck the previously checked one
    // within the same radio group (assuming they share the same 'name' attribute in HTML).

    // --- Interacting with Date Input Field ---

    // Date input field: Using nth-child and class selector.
    // Similar to the name and email fields, this selector (":nth-child(8) > .form-control")
    // can be brittle.
    // IMPROVEMENT: Use an attribute selector if the date input has a unique name or type attribute.
    // For demonstration, let's assume 'type="date"' and 'name="bday"' for the date field.
    cy.get('input[type="date"]').type("1999-12-31"); // Better: Using attribute selector for input type date
    // Original: cy.get(":nth-child(8) > .form-control").type("1999-12-31");
    // The format "YYYY-MM-DD" is typical for date input fields.
  });
});
