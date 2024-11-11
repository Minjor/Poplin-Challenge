Cypress.Commands.add("stripeIframe", () =>
  cy
    .get("iframe[title='Secure payment input frame']")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap)
);
