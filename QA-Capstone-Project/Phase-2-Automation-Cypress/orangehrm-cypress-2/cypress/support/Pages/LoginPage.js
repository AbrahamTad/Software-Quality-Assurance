class LoginPage {
  visit() {
    // cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.visit("/web/index.php/auth/login");
  }

  login(username, password) {
    if (username) cy.get('input[name="username"]').clear().type(username);
    if (password) cy.get('input[name="password"]').clear().type(password);
    cy.get('button[type="submit"]').click();
  }
}

export default new LoginPage();

// class LoginPage {
//   enterUsername(username) {
//     cy.get('input[name="username"]').clear().type(username);
//   }

//   enterPassword(password) {
//     cy.get('input[name="password"]').clear().type(password);
//   }

//   submit() {
//     cy.get('button[type="submit"]').click();
//   }

//   verifyFailure() {
//     cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
//   }
// }

// export default new LoginPage();

/************** */
// class LoginPage {
//   elements = {
//     username: () => cy.get('input[name="username"]'),
//     password: () => cy.get('input[name="password"]'),
//     loginBtn: () => cy.get('button[type="submit"]'),
//   };

//   login(username, password) {
//     this.elements.username().clear().type(username);
//     this.elements.password().clear().type(password);
//     this.elements.loginBtn().click();
//   }
// }

// export default new LoginPage();
