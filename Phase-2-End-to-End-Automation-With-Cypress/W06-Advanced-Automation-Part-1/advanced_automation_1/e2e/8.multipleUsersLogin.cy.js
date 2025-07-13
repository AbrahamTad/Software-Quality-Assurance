describe("Login with multiple users - Rahul Shetty Academy", () => {
    let users;
  
    before(() => {
      // Load login data from fixture
      cy.fixture("loginData").then((data) => {
        users = data;
      });
    });
  
    it("Should log in with each user and show success or error (አማርኛ መልእክት ጨምሯል)", () => {
      users.forEach((user) => {
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
  
        cy.get("#username").clear().type(user.username);
        cy.get("#password").clear().type(user.password);
        cy.get("#terms").check();
        cy.get("#signInBtn").click();
  
        cy.url().then((url) => {
          if (url.includes("shop")) {
            // ✅ Login success
            cy.get("h1").should("exist");
            cy.log(`✅ Login successful for ${user.username} (${user.role})`);
            cy.log(`🎉 መግቢያ ተሳክቷል ለ ${user.username} (${user.role})`);
          } else {
            // ❌ Login failed
            cy.get(".alert-danger")
              .should("be.visible")
              .then((alert) => {
                const errorMsg = alert.text();
                cy.log(`❌ Login failed for ${user.username}: ${errorMsg}`);
                cy.log(`⚠️ መግቢያ አልተሳካም ለ ${user.username}። መልእክት፦ ${errorMsg}`);
              });
          }
        });
      });
    });
  });
  

// describe("Login with multiple users - Rahul Shetty Academy", () => {
//   // Load fixture data and dynamically create tests
//   it("Should log in successfully with each user from fixture", () => {
//     cy.fixture("multipleUsers").then((users) => {
//       users.forEach((user) => {
//         cy.visit("https://rahulshettyacademy.com/loginpagePractise/");

//         cy.get("#username")
//           .clear()
//           .type(user.username)
//           .should("have.value", user.username);

//         cy.get("#password")
//           .clear()
//           .type(user.password)
//           .should("have.value", user.password);

//         cy.get("#terms").check().should("be.checked");

//         cy.get("#signInBtn").click();

//         cy.url().should("include", "shop");

//         cy.get("h1").should("exist");

//         // Optional: log out if needed (if the site supports it)
//       });
//     });
//   });
// });
