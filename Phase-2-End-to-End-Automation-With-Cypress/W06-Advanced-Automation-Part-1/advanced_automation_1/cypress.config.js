const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Example:
      // on('task', {
      //   log(message) {
      //     console.log(message)
      //     return null
      //   }
      // })
    },
    // Test files pattern
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",

    // Base URL for all tests (can be overridden with cy.visit())
    baseUrl: "https://the-internet.herokuapp.com",

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Default command timeout (milliseconds)
    defaultCommandTimeout: 5000,

    // Screenshots and videos configuration
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    videoCompression: 32,

    // Whether to retry failed tests
    retries: {
      runMode: 1, // Retry failed tests once in run mode (cypress run)
      openMode: 0, // Don't retry in open mode (cypress open)
    },

    // Environment variables
    env: {
      // Add any global environment variables here
      // Example:
      // apiUrl: "https://api.example.com"
    },
  },
});
