import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'testing/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'testing/cypress/fixtures',
    supportFile: 'testing/cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
