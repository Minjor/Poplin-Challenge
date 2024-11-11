import {
  certifyLaundry,
  chooseDeliverySpeed,
  choosePreferredLaundryPro,
  chooseProfile,
  enterBagCount,
  enterOversizedItems,
  payWithCard,
  login,
  startOrder,
  selectProtectionPlan,
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

  it("New Order", () => {
    login(email, password)
    cy.fixture("newOrder").then((order) => {
      startOrder(order.type)
  
      // Choose profile
      chooseProfile()
  
      // Choose delivery speed
      chooseDeliverySpeed(order.deliverySpeed)
  
      // Enter bag count
      enterBagCount(order.bagCount)
  
      // Enter oversized items (optional)
      enterOversizedItems(order.oversizedItems)
  
      // Certify laundry
      certifyLaundry()
  
      // Choose preferred laundry professional
      choosePreferredLaundryPro(order.type)
  
      // Select protection plan
      selectProtectionPlan(order.protectionPlan)
  
      // Review order
      reviewOrder(order)
  
      // Enter payment details and pay
      payWithCard(order.paymentDetails)
      cy.wait("@stripePayment").its("response.statusCode").should("eq", 200)
    })
  })

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
      cy.wait("@stripePayment").its("response.statusCode").should("eq", 200)
    })
  })
})
