const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: "cypress/e2e/practical_Exercise/**/*.cy.{js,jsx,ts,tsx}", // Default spec pattern for Cypress tests
    /* specPattern: "cypress/testProject/.cy.js" */
    // specPattern: "cypress/test_script/**/*.cy.{js,jsx,ts,tsx}",
    // specPattern: "cypress/practical_Exercise/**/*.cy.{js,jsx,ts,tsx}",
  },
});
