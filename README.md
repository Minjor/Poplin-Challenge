# Poplin App QA Automation Challenge: "Order Placed" Workflow

## Overview
This repository contains the automated test suite for the "Order Placed" workflow within the Poplin App. This suite is built with Cypress and covers scenarios for new and repeat customers. This README provides setup instructions, test coverage details, and notes on extending the tests.

## Table of Contents
- [Poplin App QA Automation Challenge: "Order Placed" Workflow](#poplin-app-qa-automation-challenge-order-placed-workflow)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Framework and Tools](#framework-and-tools)
  - [Test Coverage](#test-coverage)
  - [Setup and Execution](#setup-and-execution)
    - [Prerequisites](#prerequisites)
  - [Notes and assumptions](#notes-and-assumptions)

---

## Project Structure
- **/cypress/e2e/** - Contains test scripts for the "Order Placed" workflow.
- **/cypress/constants/** - Constants accessible by all tests.
- **/cypress/fixtures/** - Data files used within the tests.
- **/cypress/support/** - Custom Cypress commands and support files.
- **cypress.config.js** - Cypress configuration file.
- **cypress.env.json** - Cypress environment variables.
- **README.md** - Project documentation and usage instructions.

## Framework and Tools
- **Cypress**
- **Node.js**
- **Mocha**

## Test Coverage
The automated tests are based off use cases for the "Order Placed" workflow, found in `useCases.md`:
1. **Core Scenarios**:
   - New customer/order placement.
   - Repeat customer/order placement.
   
2. **Edge Cases**:
   - Invalid inputs: incorrect credit card details.
   - Network connectivity error in payment gateway integration.
   
Each test case mirrors a manually defined use case, with scripts stored in `/cypress/e2e/`.

## Setup and Execution

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads).
2. Clone this repository:
   ```bash
   git clone https://github.com/Minjor/Poplin-Challenge
   cd <repo-directory>
3. Install dependencies
   ```bash
   npm install
4. Run tests
   ```bash
   npx cypress run --headed
   ```
   or if you want to execute manually
   ```
   npx cypress open
   ```

## Notes and assumptions
The `cypress.env.json` file should be added to `gitignore` and those environment variables handled in a more secure way. This was assumed as out of scope for this challenge.

Regarding automation strategy, an approach similar to Page Object Model was taken, where instead of classes it uses custom commands/actions. With enough time, an App Action approach would have been taken, as suggested in [this article](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions) by Gleb Bahmutov, ex VP of Engineering in Cypress.

I had to cut some corners due to time constrains, ideally all "TODO" items should have been taken care of and test flakyness should have been mitigated. In case too many tests are failing, please run them manually using `npx cypress open`. See `output.txt` for a fully successful run log.

Regarding assumptions, new and repeat customer where differentiated only by the type of order they made, although it is understandable that a new customer should setup everything from scratch (i.e. no preloaded profile), this had to be overlooked because of time constrains.

A resolution of 360 x 740px was used under the assumption that most users use the application in their mobile phone. I did not see too many differences when using desktop resolution, but changes should be made to support this.

Strange behavior was seen when using Cypress, an example is that while solving this challenge, out of nowhere the requests made to https://identitytoolkit.googleapis.com/ had no referer, so I had to set it back manually.

One suggestion to improve user experience would be that right after placing an order this was highlighted in some way on the "Active Orders" list, there was no clear way to identify which order I had just created, other than assuming it was the last in the list (which not everybody thinks of).
