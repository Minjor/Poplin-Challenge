import { 
  login, 
  startOrder, 
  choosePreferredLaundryPro, 
  reviewOrder, 
  payWithCard, 
  typeInvalidCardDetails 
} from "../support/utils";
import { email, password } from "../constants";

describe("Network Error", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb")
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.intercept({
      method: "POST",
      url: "https://identitytoolkit.googleapis.com/**",
    }, (req) => {
      req.headers["referer"] = Cypress.config("baseUrl");
    }).as("googleApiRequest")
    cy.intercept("GET", "https://api.stripe.com/v1/elements/sessions?**").as("stripeElements")
    cy.intercept("POST", "https://api.stripe.com/v1/payment_intents/*/confirm", {
      statusCode: 500,
      body: {}
    }).as("stripePayment")
  });

  it("Unable to place order due to Stripe server error", () => {
    login(email, password)
    cy.fixture("repeatOrder").then((order) => {
      startOrder(order.type)
  
      // Choose preferred laundry professional
      choosePreferredLaundryPro()
  
      // Review order
      reviewOrder(order)

      // Enter payment details and pay
      payWithCard(order.paymentDetails)
      cy.wait("@stripePayment", { timeout: 30000 })
        .its("response.statusCode")
        .should("eq", 500)

      // Check and close payment error message
      cy.get("[class*=alert-wrapper]:first").within((alert) => {
        cy.wrap(alert).contains("An unexpected error occurred").should("exist")
        cy.wrap(alert).contains("button", "OK").click()
      })
      cy.get("[class*=alert-wrapper]:first").should("not.exist")
    })
  })
})