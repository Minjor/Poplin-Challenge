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
- **/cypress/fixtures/** - Data files used within the tests.
- **/cypress/support/** - Custom Cypress commands and support files.
- **cypress.config.js** - Cypress configuration file.
- **README.md** - Project documentation and usage instructions.

## Framework and Tools
- **Cypress**
- **Node.js**
- **Mocha**

## Test Coverage
The automated tests are based off use cases for the "Order Placed" workflow, found in `useCases.md`: MATCH CASES HERE OR KEEP ONLY `useCases.md`
1. **Core Scenarios**:
   - New customer order placement.
   - Repeat customer order placement.
   
2. **Edge Cases**:
   - Invalid inputs, such as incorrect credit card details.
   - Network connectivity interruptions during the order placement.
   
3. **Input/Output Validation**:
   - Ensures proper handling of inputs and outputs.
   
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

## Notes and assumptions
The `cypress.env.json` file should be added to `gitignore`and those environment variables handled in a more secure way.

Talk about POM vs Page Action Model, link Gleb remarks on this. Use POM then switch to page actions if time allows. Explain decision.

For mobile automation, 

cutting corners because of time constrian

Regarding assumptions, new and repeat customer only differentiated in the type of order they made, although it is understandable that a new customer should setup everything from scratch (i.e. no preloaded profile), this had to be overlooked because of time constrains.
