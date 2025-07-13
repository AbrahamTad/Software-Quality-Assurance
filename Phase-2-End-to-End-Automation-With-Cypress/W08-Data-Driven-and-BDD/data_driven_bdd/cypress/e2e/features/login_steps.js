import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Visit Facebook login page
Given("the Facebook login page is open", () => {
  cy.visit("/");
});

// Fill in email and password fields
When("the user enters valid {string} and {string}", (email, password) => {
  cy.get("#email").clear().type(email);
  cy.get("#pass").clear().type(password);
});

// Click login button
When("clicks the login button", () => {
  cy.get("button[name='login']").click();
});

// Verify outcome
Then("the user should see an error or home page", () => {
  cy.url().then((url) => {
    if (url.includes("login")) {
      cy.contains("The password you’ve entered is incorrect")
        .should("exist")
        .or("be.visible");
    } else {
      cy.log("Login success or redirected");
    }
  });
});
