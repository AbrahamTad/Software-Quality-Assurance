describe("Load and Display Data from Multiple Excel Sheets", () => {
  it("Loads data from LoginData, EmployeeInfo, and SalaryInfo sheets", () => {
    const filePath = "cypress/fixtures/data/multiSheetData.xlsx";
    const sheets = ["LoginData", "EmployeeInfo", "SalaryInfo"];

    // Use the custom command to load all sheet data
    cy.loadMultipleSheets(filePath, sheets).then((data) => {
      // Display each sheet's content in the Cypress test runner
      cy.log(" Login Data:");
      cy.log(JSON.stringify(data.LoginData));

      cy.log(" Employee Info:");
      cy.log(JSON.stringify(data.EmployeeInfo));

      cy.log(" Salary Info:");
      cy.log(JSON.stringify(data.SalaryInfo));
    });
  });
});
