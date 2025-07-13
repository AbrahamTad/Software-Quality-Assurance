import "cypress-iframe";

describe("Checkbox Table inside iframe - Vinoth QA Academy", () => {
  const iframeSelector = 'iframe[src*="webtable"]'; // Use specific src to match correct iframe

  beforeEach(() => {
    cy.visit("https://vinothqaacademy.com/iframe/");
    cy.frameLoaded(iframeSelector); // Ensure this iframe is loaded
  });

  it("Selects checkboxes for Software Engineers", () => {
    cy.iframe(iframeSelector)
      .find("table tbody tr")
      .each(($row) => {
        const role = $row.find("td").eq(3).text().trim();
        if (role === "Software Engineer") {
          cy.wrap($row)
            .find('input[type="checkbox"]')
            .check()
            .should("be.checked");
        }
      });
  });

  it("Checks all checkboxes", () => {
    cy.iframe(iframeSelector)
      .find('input[type="checkbox"]')
      .check()
      .should("be.checked");
  });

  it("Unchecks all checkboxes", () => {
    cy.iframe(iframeSelector)
      .find('input[type="checkbox"]')
      .uncheck()
      .should("not.be.checked");
  });
});
