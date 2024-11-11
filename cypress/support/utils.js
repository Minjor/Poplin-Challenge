export const login = (email, password) => {
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
  cy.get("#meter-canvas").should("not.exist")
  cy.get(".laundry-grid").should("exist")
}

export const startOrder = (orderType) => {
  cy.get("#new-order-button").click()
  if (orderType === "repeat") {
    cy.contains("#item-element", "Repeat").click()
    cy.url().should("contain", "choose-preferred-laundry-pro")
  } else if (orderType === "new") {
    cy.contains("#item-element", "new").click()
  }
}

export const chooseProfile = () => {
  cy.url().should("contain", "choose-profile")
  cy.get("#choose-profile-continue-button").click()
}

export const chooseDeliverySpeed = (speedValue) => {
  cy.url().should("contain", "delivery-speed")
  cy.get(`[value='${speedValue}']`).click()
  cy.get("#delivery-continue-button").click()
}

export const enterBagCount = (bagCount) => {
  cy.url().should("contain", "bag-count")
  Object.entries(bagCount).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      cy.get(`#stepper-${type}-wrapper [icon='plus_custom']`).click();
    }
  });
  cy.get("#bag-continue-button").click();
}

export const enterOversizedItems = (oversizedItems) => {
  // TODO: Implement oversized items
  cy.url().should("contain", "oversized-items");
  cy.get("#oversized-continue-button").click()
}

export const certifyLaundry = () => {
  cy.get("ion-checkbox").each(($checkbox) => {
    cy.wrap($checkbox).click();
  });
  cy.get("#drawer-modal-continue-button").click()
}

export const choosePreferredLaundryPro = (orderType) => {
  // TODO: Implement professional selection, currently using default
  cy.url().should("contain", "choose-preferred-laundry-pro")
  cy.get("#preferred-continue-button").click()
  if (orderType === "new") {
    cy.get("ion-modal").find("#preferred-continue-button").click()
  }
}

export const selectProtectionPlan = (plan) => {
  // TODO: Implement enum for possible plans
  cy.url().should("contain", "coverage")
  cy.contains("poplin-radio-button", plan).click()
  cy.get("#coverage-continue-button").click()
}

export const reviewOrder = (order) => {
  // TODO: Add fixture based assertions
  cy.url().should("contain", "review-order")
  if (order.type === "repeat") {
    cy.contains("#notification-element button", "Dismiss").click()
  }
  cy.get(".estimated-cost:first").invoke('text').should("not.contain", "$0.00")
  cy.get("#place-order-button").click()
}

export const payWithCard = (paymentDetails) => {
  const { cardNumber, expDate, cvc } = paymentDetails
  cy.wait("@stripeElements", { timeout: 30000 })
    .its("response.statusCode")
    .should("eq", 200)
  cy.stripeIframe().find("#Field-numberInput").type(cardNumber)
  cy.stripeIframe().find("#Field-expiryInput").type(expDate)
  cy.stripeIframe().find("#Field-cvcInput").type(cvc)
  cy.get("#stripe-pay-button-wrapper").click()
}

export const typeInvalidCardDetails = (paymentDetails) => {
  const { cardNumber, expDate, cvc } = paymentDetails
  cy.wait("@stripeElements", { timeout: 30000 })
    .its("response.statusCode")
    .should("eq", 200)
  cy.stripeIframe().find("#Field-numberInput").type(cardNumber)
  cy.stripeIframe().find("#Field-expiryInput").type(expDate)
  cy.stripeIframe().find("#Field-cvcInput").type(cvc)
  cy.stripeIframe().find("#Field-numberInput").click()
  cy.stripeIframe().find("#Field-numberError").should("exist")
  cy.stripeIframe().find("#Field-expiryError").should("exist")
  cy.stripeIframe().find("#Field-cvcError").should("exist")
  cy.get("#stripe-pay-button-wrapper").click()
}
