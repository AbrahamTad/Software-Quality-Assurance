import LoginPage from "../pageObjects/LoginPage";

describe("Login Tests - Data-Driven", () => {
  before(() => {
    cy.fixture("loginData").as("users"); // Load test data once
  });

  it("Runs login tests using multiple user credentials", function () {
    this.users.forEach((user) => {
      cy.visit("/web/index.php/auth/login");

      // Perform login
      LoginPage.login(user.username, user.password);

      if (user.valid) {
        // Assert successful login
        cy.url().should("include", "/dashboard");

        // Optional: Logout to reset state
        cy.get(".oxd-userdropdown-tab").click();
        cy.contains("Logout").click();
      } else {
        // Assert error message
        LoginPage.elements.errorMsg().should("contain", "Invalid credentials");
      }
    });
  });
});
