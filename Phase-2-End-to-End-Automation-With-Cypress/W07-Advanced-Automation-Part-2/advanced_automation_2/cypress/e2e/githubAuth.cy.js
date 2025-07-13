// describe("GitHub Authentication Flow", () => {
//   before(() => {
//     // Step 1: Navigate to GitHub login
//     cy.visit("https://github.com/login");

//     // Step 2: Enter credentials from env variables
//     cy.get("#login_field").type(Cypress.env("GITHUB_USER"));
//     cy.get("#password").type(Cypress.env("GITHUB_PASS"), { log: false }); // Hide password in logs
//     cy.get(".position-relative > .btn").click();

//     // Step 3: Verify successful login
//     cy.get('[data-test-selector="avatar-dropdown"]').should("be.visible");
//   });

//   it("1. Checks if Dashboard is accessible", () => {
//     cy.contains("Dashboard").should("exist");
//   });

//   it("2. Validates repository access", () => {
//     cy.visit(`/${Cypress.env("GITHUB_USER")}?tab=repositories`);
//     cy.get('[data-tab-item="repositories"]').should("be.visible");
//   });

//   after(() => {
//     // Step 4: Log out
//     cy.get('[data-test-selector="avatar-dropdown"]').click();
//     cy.contains("Sign out").click();
//     cy.url().should("include", "logged_out");
//   });
// });

// Cypress.on("uncaught:exception", (err) => {
//   if (
//     err.message.includes("No embedded data provided") ||
//     err.message.includes("Cannot read properties of undefined") ||
//     err.message.includes("Cannot set properties of undefined")
//   ) {
//     return false;
//   }
// });

describe("GitHub Auth Flow", () => {
  const user = Cypress.env("GITHUB_USER");
  const pass = Cypress.env("GITHUB_PASS");

  before(() => {
    cy.visit("https://github.com/login");
    cy.get("#login_field").type(user);
    cy.get("#password").type(pass, { log: false });
    cy.get("input[type='submit']").click();

    // Wait for dashboard load
    cy.url().should("include", "github.com");
    cy.contains(" repositories", { timeout: 3000 }).should("exist");
  });

  it("Accesses dashboard", () => {
    cy.contains("Dashboard").should("exist");
  });

  after(() => {
    // Log out from GitHub
    cy.get(".Button-label > .avatar").click();
    // Ensure the dropdown is open
    cy.contains("Sign out")
            .should("have.attr", "href", "/logout")
      .click();

    // Wait for logout to complete
    cy.url().should("include", "github.com/logout");
    // cy.get(".ml-2 > .inline-form > .btn").click();
  });
});
