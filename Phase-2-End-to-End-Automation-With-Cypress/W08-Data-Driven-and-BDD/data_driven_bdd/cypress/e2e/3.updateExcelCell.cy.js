describe("Update Excel Cell Using Custom Command", () => {
  it("Updates the Salary for Temesgen to 7500", () => {
    cy.updateExcelCell(
      "cypress/fixtures/data/employeeInfo.xlsx", // File path
      "Sheet1",                                  // Sheet name
      3,                                         // Row number (Temesgen)
      "D",                                       // Column "D" = Salary
      7500                                       // New value
    );
  });
});
