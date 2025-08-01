const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "gjsmqj", 
  e2e: {
    baseUrl: "http://localhost/orangehrm/orangehrm",
    setupNodeEvents(on, config) {
      // implement node events here
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: false,
    json: true,
  },
  retries: {
    runMode: 2,
    openMode: 1,
  },
});
