import "cypress-iframe";

describe("Main page and iframe interaction - Rahul Shetty Academy", () => {
  const iframeSelector = "#courses-iframe";

  beforeEach(() => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });

  it("Interacts with main page and iframe", () => {
    // === Step 1: Main Page Checkbox ===
    cy.get("#checkBoxOption1")
      .scrollIntoView()
      .check({ force: true })
      .should("be.checked");

    // === Step 2: Iframe - Click Mentorship ===
    cy.frameLoaded(iframeSelector);

    cy.iframe(iframeSelector).find('a[href*="mentorship"]').first().click();

    // === Step 3: Wait for iframe to update and assert header ===
    cy.wait(3000); // give iframe time to load new page

    cy.iframe(iframeSelector)
      .find("h1")
      .should("exist")
      .and("contain.text", "Mentorship");

    // === Step 4: Main Page Autocomplete Box ===
    cy.get("#autocomplete")
      .scrollIntoView()
      .type("India")
      .should("have.value", "India");
  });
});
