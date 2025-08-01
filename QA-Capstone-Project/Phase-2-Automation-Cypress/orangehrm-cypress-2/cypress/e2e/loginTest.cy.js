// Import the Page Object Model (POM) for login functionality
import loginPage from "../support/Pages/LoginPage";

describe("Login Scenarios | መግቢያ ሙከራዎች", () => {
  // Store Excel data from the sheet
  let loginData = [];

  // Before all tests: Read data from the Excel file using the custom Cypress task
  before(() => {
    cy.task("readExcel", "cypress/fixtures/loginData.xlsx").then((data) => {
      loginData = data.Sheet1; // Access the first sheet
    });
  });

  // Before each test: Visit the login page
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  //  TC_01: Perform a valid login test using credentials from Excel
  it("TC_01: Valid login | ትክክለኛ መግቢያ", () => {
    const validUser = loginData.find((u) => u.expected === "success"); // Find valid user
    expect(validUser, "Valid user not found in Excel").to.exist;

    loginPage.login(validUser.username, validUser.password); // Reusable login function
    cy.get("h6").contains("Dashboard").should("be.visible"); // Verify successful login
  });

  //  TC_02: Test login with invalid credentials
  it("TC_02: Invalid login | የተሳሳተ መግቢያ", () => {
    const invalidUser = loginData.find(
      (u) => u.expected === "failure" && u.username && u.password
    );
    expect(invalidUser, "Invalid user not found in Excel").to.exist;

    loginPage.login(invalidUser.username, invalidUser.password); // Attempt login
    cy.get(".oxd-alert-content-text")
      .should("be.visible")
      .and("contain.text", "Invalid credentials"); // Verify error message
  });

  // TC_03: Verify error messages for empty input fields
  it("TC_03: Empty Fields Validation | ያልተሞላ መስኮቶች ማረጋገጫ", () => {
    loginPage.login("", ""); // Leave both fields empty
    cy.get(".oxd-input-field-error-message").should("have.length.at.least", 1);
    cy.get(".oxd-input-field-error-message").each(($el) => {
      cy.wrap($el).invoke("text").should("include", "Required"); // Check error text
    });
  });

  // 📸 After each test: Take screenshot if test fails (for debugging/reporting)
  afterEach(function () {
    if (this.currentTest.state === "failed") {
      cy.screenshot(`loginTest-${this.currentTest.title}`);
    }
  });
});

// // Import the Page Object Model (POM) for login functionality
// import loginPage from "../support/Pages/LoginPage";

// describe("Login Scenarios - Excel DDT", () => {
//   // Store Excel data from the sheet
//   let loginData = [];

//   // Before all tests: Read data from the Excel file using the custom Cypress task
//   before(() => {
//     cy.task("readExcel", "cypress/fixtures/loginData.xlsx").then((data) => {
//       loginData = data.Sheet1; // Access the first sheet
//     });
//   });

//   // Before each test: Visit the login page
//   beforeEach(() => {
//     cy.visit("/web/index.php/auth/login");
//   });

//   //  TC_01: Perform a valid login test using credentials from Excel
//   it("TC_01: Valid login", () => {
//     const validUser = loginData.find((u) => u.expected === "success"); // Find valid user
//     expect(validUser, "Valid user not found in Excel").to.exist;

//     loginPage.login(validUser.username, validUser.password); // Reusable login function
//     cy.get("h6").contains("Dashboard").should("be.visible"); // Verify successful login
//   });

//   //  TC_02: Test login with invalid credentials
//   it("TC_02: Invalid login", () => {
//     const invalidUser = loginData.find(
//       (u) => u.expected === "failure" && u.username && u.password
//     );
//     expect(invalidUser, "Invalid user not found in Excel").to.exist;

//     loginPage.login(invalidUser.username, invalidUser.password); // Attempt login
//     cy.get(".oxd-alert-content-text")
//       .should("be.visible")
//       .and("contain.text", "Invalid credentials"); // Verify error message
//   });

//   // TC_03: Verify error messages for empty input fields
//   it("TC_03: Empty Fields Validation", () => {
//     loginPage.login("", ""); // Leave both fields empty
//     cy.get(".oxd-input-field-error-message").should("have.length.at.least", 1);
//     cy.get(".oxd-input-field-error-message").each(($el) => {
//       cy.wrap($el).invoke("text").should("include", "Required"); // Check error text
//     });
//   });

//   // 📸 After each test: Take screenshot if test fails (for debugging/reporting)
//   afterEach(function () {
//     if (this.currentTest.state === "failed") {
//       cy.screenshot(`loginTest-${this.currentTest.title}`);
//     }
//   });
// });
