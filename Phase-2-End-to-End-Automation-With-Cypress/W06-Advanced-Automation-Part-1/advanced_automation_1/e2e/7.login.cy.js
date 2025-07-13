describe("Login using fixture data - Rahul Shetty Academy", () => {
  // Runs before each test in this block
  beforeEach(() => {
    // Step 1: Visit the login page
    cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
  });

  it("Logs in using credentials from fixture and verifies successful login", () => {
    // Step 2: Load test data from fixture file (loginData.json under cypress/fixtures)
    cy.fixture("loginData").then((data) => {
      // Step 3: Enter the username into the input field with id 'username'
      cy.get("#username")
        .type(data.username) // data.username is taken from fixture file
        .should("have.value", data.username); // Optional: Verify typed value

      // Step 4: Enter the password into the input field with id 'password'
      cy.get("#password")
        .type(data.password) // data.password is taken from fixture file
        .should("have.value", data.password); // Optional: Verify typed value

      // Step 5: Agree to the terms by checking the checkbox with id 'terms'
      cy.get("#terms")
        .check() // Clicks the checkbox
        .should("be.checked"); // Verifies that checkbox is now checked

      // Step 6: Click the Sign In button with id 'signInBtn'
      cy.get("#signInBtn").click();

      // Step 7: After login, verify that the user is redirected successfully.
      // The actual URL contains 'shop', not 'dashboard' — so we check for that.
      cy.url()
        .should("include", "shop") // Confirms successful redirection
        .then((url) => {
          cy.log("User redirected to:", url); // Optional: Log URL for debug
        });

      // Step 8: Additional verification (optional):
      // Confirm that a key element from the shop page exists — helps confirm login.
      cy.get("#navbarResponsive").should("exist"); // Checks navigation bar is present
    });
  });
});
