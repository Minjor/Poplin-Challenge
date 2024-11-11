const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://nonprod-app.poplin.co/",
    viewportWidth: 360,
    viewportHeight: 740,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    /* blockHosts: [
      "www.googletagmanager.com",
      "analytics.google.com",
      "www.google-analytics.com"
    ] */
  },
});
