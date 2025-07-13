describe("MouseHover Interaction", () => {
  it("mouseover action", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get(".mouse-hover-content").invoke("show").should("be.visible");
    cy.contains("Top").should("be.visible");
    cy.contains("Reload").should("be.visible");
  });
});
