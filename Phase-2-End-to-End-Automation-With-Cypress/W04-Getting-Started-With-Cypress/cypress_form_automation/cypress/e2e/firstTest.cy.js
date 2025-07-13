// cypress/e2e/firstTest.cy.js
describe("popular web applications", () => {
  it.only("Google visit", () => {
    cy.visit("https://www.google.com");

    //write here
    cy.get("#APjFqb").type("Automation Testing{enter}");
    cy.get(".FPdoLc > center > .gNO89b").click();

  });

  it("Facebook visit", () => {
    cy.visit("https://www.facebook.com");
  });

  it("Twitter visit", () => {
    cy.visit("https://www.twitter.com");
  });

  it("Evangadi visit", () => {
    cy.visit("https://www.evangadi.com");
  });

  it("LinkedIn visit", () => {
    cy.visit("https://www.linkedin.com");
  });

  it("YouTube visit", () => {
    cy.visit("https://www.youtube.com");
  });
});
