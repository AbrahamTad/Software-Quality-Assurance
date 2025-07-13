// cypress/e2e/screenshot.cy.js
describe("Screenshot Test", () => {
  it("takes a screenshot of React homepage", () => {
    cy.visit("https://reactjs.org");
    cy.screenshot("react-homepage"); // Saves as "react-homepage.png"
  });
});
