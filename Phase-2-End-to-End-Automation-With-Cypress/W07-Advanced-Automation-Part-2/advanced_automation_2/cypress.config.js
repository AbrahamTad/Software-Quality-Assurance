const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.AMAZON_EMAIL = process.env.AMAZON_EMAIL;
      config.env.AMAZON_PASSWORD = process.env.AMAZON_PASSWORD;
      return config;
    },
  },
});
