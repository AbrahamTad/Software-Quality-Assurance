// cypress/support/e2e.js

// This is processed and loaded automatically before your test files.
// You can use this file to import global commands or setup logic.

import "./commands"; // Import  custom commands here




Cypress.on("uncaught:exception", (err) => {
  // Ignore network errors (Axios)
  if (
    err.name === "AxiosError" ||
    err.message.includes("Network Error") ||
    err.message.includes("Cannot read properties of undefined") ||
    err.message.includes("reading 'response'")
  ) {
    return false; // Prevent test from failing
  }

  // Let any other error fail the test
  return true;
});


// Global hooks
before(() => {
  cy.task('readExcel', 'cypress/fixtures/loginData.xlsx');
});

beforeEach(() => {
  cy.visit('/');
});

afterEach(() => {
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot();
  }
});

after(() => {
  // Cleanup test data
});