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

---

## Project Structure
- **/cypress/e2e/** - Contains test scripts for the "Order Placed" workflow.
- **/cypress/fixtures/** - Data files used within the tests.
- **/cypress/support/** - Custom Cypress commands and support files.
- **cypress.json** - Cypress configuration file.
- **README.md** - Project documentation and usage instructions.

## Framework and Tools
- **Cypress** - Chosen for its modern approach to automation, ease of use, and reliability for end-to-end testing.
- **Node.js** - Dependency management and script execution.
- **Mocha** (default test framework with Cypress) - Test structure and reporting.

## Test Coverage
The automated tests validate:
1. **Core Scenarios**:
   - New customer order placement.
   - Repeat customer order placement.
   
2. **Edge Cases**:
   - Invalid inputs, such as incorrect credit card details.
   - Network connectivity interruptions during the order placement.
   - Address validation failures through Google API issues.
   
3. **Input/Output Validation**:
   - Ensures proper handling of inputs and outputs.
   
Each test case mirrors a manually defined use case, with scripts stored in `/cypress/integration/tests/`.

## Setup and Execution

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/).
2. Clone this repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
3. Install dependencies
   ```bash
   npm install
4. Run tests
   ```bash
   npx cypress run --headed
   