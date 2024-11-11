const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config = cypressBrowserPermissionsPlugin(on, config)
    },
    baseUrl: "https://nonprod-app.poplin.co",
    viewportWidth: 360,
    viewportHeight: 740,
    defaultCommandTimeout: 25000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
