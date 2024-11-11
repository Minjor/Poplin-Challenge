# Test Cases for Laundry Service Webpage: "Order Placed" Workflow

## Overview
This document outlines the test cases for the "Order Placed" workflow within the laundry service webpage. The test cases cover scenarios for both new and repeat customers, including edge cases such as invalid credit card details and payment gateway network error.

## Table of Contents
- [Test Cases for Laundry Service Webpage: "Order Placed" Workflow](#test-cases-for-laundry-service-webpage-order-placed-workflow)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [New Customer Order Placement](#new-customer-order-placement)
    - [Preconditions](#preconditions)
    - [Test Steps](#test-steps)
    - [Expected Results](#expected-results)
    - [Post-conditions](#post-conditions)
  - [Repeat Customer Order Placement](#repeat-customer-order-placement)
    - [Preconditions](#preconditions-1)
    - [Test Steps](#test-steps-1)
    - [Expected Results](#expected-results-1)
    - [Post-conditions](#post-conditions-1)
  - [Edge Cases](#edge-cases)
    - [Invalid Credit Card Input](#invalid-credit-card-input)
      - [Preconditions](#preconditions-2)
      - [Test Steps](#test-steps-2)
      - [Expected Results](#expected-results-2)
    - [Network Connectivity Issues](#network-connectivity-issues)
      - [Preconditions](#preconditions-3)
      - [Test Steps](#test-steps-3)
      - [Expected Results](#expected-results-3)

## New Customer Order Placement

### Preconditions
- User is not logged in.
- User has not placed an order before.

### Test Steps
1. Open the web browser and navigate to the Poplin homepage.
2. Select email login.
3. Enter a valid email address and click "Continue".
4. Enter a valid password and click "Login".
5. Click on the "+ New Order" button.
6. Start new order.
7. Choose a profile.
8. Select delivery speed.
9. Enter bag count.
10. Enter oversized items (optional).
11. Certify laundry as safe, sanitary, and without excessive pet hair.
12. Choose a preferred laundry professional from the list.
13. Select protection plan.
14. Review the order details to ensure everything is correct.
15. Enter valid payment details and pay.
16. Review active orders for new placed order.

### Expected Results
- User is successfully logged in.
- Order details are correctly displayed.
- Address is validated and accepted.
- Payment is processed successfully.
- Order details are saved in the user's account.

### Post-conditions
- The user is logged in.
- The order is placed and saved in the system.
- An order confirmation email is sent to the user.

## Repeat Customer Order Placement

### Preconditions
- User is not logged in.
- User has placed an order before.

### Test Steps
1. Open the web browser and navigate to the Poplin homepage.
2. Select email login.
3. Enter a valid email address and click "Continue".
4. Enter a valid password and click "Login".
5. Click on the "+ New Order" button.
6. Start repeat order.
7. Choose a preferred laundry professional from the list.
8. Review the order details to ensure everything is correct.
9. Enter valid payment details and pay.
10. Review active orders for new placed order.

### Expected Results
- Order details are correctly displayed.
- Address is validated and accepted.
- Payment is processed successfully.
- Order confirmation message is displayed.
- Order details are saved in the user's account.

### Post-conditions
- The user is logged in.
- The order is placed and saved in the system.
- An order confirmation email is sent to the user.

## Edge Cases

### Invalid Credit Card Input

#### Preconditions
- User is on the order placement page.

#### Test Steps
1. Enter an invalid credit card number.
2. Enter an invalid expiration date.
3. Enter an invalid cvc code.
4. Submit payment.

#### Expected Results
- Appropriate error messages are displayed for each invalid input.
- Alert modal pops up stating error.
- Payment not made.

### Network Connectivity Issues

#### Preconditions
- User is on the order placement page.
- Connection to payment gateway has been intercepted.

#### Test Steps
1. Mock payment gateway connection.
2. Attempt to place an order.

#### Expected Results
- An error message is displayed indicating network connectivity issues.
