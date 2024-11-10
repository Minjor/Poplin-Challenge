import { email, password } from "../constants";

describe("Place Order", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
    cy.intercept("service-workers.js", { body: "" })
  });
  it("places order", () => {
    cy.login(email, password)
  })
})