import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Facebook login page", () => {
  cy.visit("https://www.facebook.com");
});

When("I enter an invalid email and password", () => {
  cy.get("#email").type("wronguser@example.com");
  cy.get("#pass").type("wrongpassword");
});

When("I click the login button", () => {
  cy.get('button[name="login"]').click();
});

Then("I should see an error message saying {string}", (expectedMessage) => {
  cy.get("._9ay7, .error-message") // Facebook changes this class often
    .should("exist")
    .and("contain.text", expectedMessage);
});
