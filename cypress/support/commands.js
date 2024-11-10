Cypress.Commands.add("login", (email, password) => {
  // Visit the home page
  cy.visit("/")
  cy.get("img[alt='Poplin Logo']").should("exist")

  // Choose email login
  cy.get("[label='Continue with Email']").click()
  cy.url().should("include", "/auth/email-login")

  // Enter email and password
  Cypress.log({
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${email}`],
  });
  cy.get("input[aria-label='Email Address']").type(email)
  cy.get("[id=email-login-button-wrapper][label='Continue']").click()
  cy.url().should("include", "/auth/enter-password")
  cy.get(".login-item-replay").should("contain", email)
  cy.get("[aria-label='Password']").type(password, { log: false })
  cy.get("[label='Login']").click()

  // Check successful login
  cy.url().should("include", "/laundry")
  // https://nonprod-app.poplin.co/auth/notifications
  cy.get(".laundry-grid").should("exist")
});