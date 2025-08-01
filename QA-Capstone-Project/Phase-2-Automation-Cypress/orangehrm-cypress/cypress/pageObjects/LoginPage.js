class LoginPage {
  elements = {
    username: () => cy.get('[name="username"]'),
    password: () => cy.get('[name="password"]'),
    loginBtn: () => cy.get('[type="submit"]'),
    errorMsg: () => cy.get(".oxd-alert-content-text"),
  };

  login(username, password) {
    this.elements.username().clear().type(username);
    this.elements.password().clear().type(password);
    this.elements.loginBtn().click();
  }
}

export default new LoginPage();
