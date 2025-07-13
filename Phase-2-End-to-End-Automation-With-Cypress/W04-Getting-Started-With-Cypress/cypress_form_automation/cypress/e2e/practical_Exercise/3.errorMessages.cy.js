// describe("Facebook Login Error Message Test", () => {
//   it("should show an error message for invalid login credentials", () => {
//     cy.visit("https://www.facebook.com", {
//       failOnStatusCode: false,
//     });

//     cy.visit("https://facebook.com");
//     cy.get('[data-testid="royal-email"]').type("mukera@gmail.com");
//     cy.get('[data-testid="royal-pass"]').type("yetesastePassword");
//     cy.get('[data-testid="royal-login-button"]').click({ force: true });
//     // Verify the error message appears
//     cy.get(".error-message").should(
//       "contain",
//       "The email or mobile number you entered isn't connected to an account."
//     );
//     // cy.get("#email").type("mukera@gmail.com");
//     // cy.get("#pass").type("yetesastePassword{enter}", { force: true });
//   });
// });

// describe("Facebook Login Error Message Test", () => {
//   it("should show an error message for invalid login credentials", () => {
//     // Visit Facebook with language parameter for consistent UI
//     cy.visit("https://www.facebook.com");

//     // Use force:true to bypass element coverage issue
//     cy.get("#email").type("invaliduser@example.com", );
//     cy.get("#pass").type("wrongpassword{enter}", { force: true });

//     // Verify error using Facebook's actual error container
//     cy.get('[data-testid="error_message"]', { timeout: 10000 })
//       .should("be.visible")
//       .invoke("text")
//       .should("match", /invalid|incorrect|not connected/i);
//   });
// });

describe("Login Error Message Test", () => {
  it("should show error for invalid credentials", () => {
    cy.visit("https://practicetestautomation.com/practice-test-login/");
    cy.get("#username").type("mukera@gmail.com");
    cy.get("#password").type("wrongpass");
    
    cy.get("#submit").click();
    cy.get(".show").should("contain", "Your username is invalid!");
  });
});
