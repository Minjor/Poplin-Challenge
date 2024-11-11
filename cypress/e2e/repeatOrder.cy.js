import {
  choosePreferredLaundryPro,
  payWithCard,
  login,
  startOrder,
  reviewOrder
} from "../support/utils";
import { email, password } from "../constants";

describe("Place Order", () => {
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
    cy.intercept("POST", "https://api.stripe.com/v1/payment_intents/*/confirm").as("stripePayment")
  });

  it("Repeat Order", () => {
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
        .should("eq", 200)
    })
  })
})
