import { 
    login, 
    startOrder, 
    choosePreferredLaundryPro, 
    reviewOrder,
    typeInvalidCardDetails 
  } from "../support/utils";
  import { email, password } from "../constants";
  
  describe("Invalid input", () => {
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
    });
  
    it("Invalid credit card details", () => {
      login(email, password)
      cy.fixture("repeatOrder").then((order) => {
        startOrder(order.type)
    
        // Choose preferred laundry professional
        choosePreferredLaundryPro()
    
        // Review order
        reviewOrder(order)
  
        // Enter invalid payment details and try to pay
        typeInvalidCardDetails({
          cardNumber: "424242424242",
          expDate: "1223",
          cvc: "A1F"
        })
  
        // Check and close payment error message
        cy.get("[class*=alert-wrapper]:first").within((alert) => {
          cy.wrap(alert).contains("Your card number is incomplete").should("exist")
          cy.wrap(alert).contains("button", "OK").click()
        })
        cy.get("[class*=alert-wrapper]:first").should("not.exist")
      })
    })
  })