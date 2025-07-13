// This test reads data from an Excel file and logs each row's email and password to the console.
describe("Test suit for excel reading", () => {
  it("Read data from excel file", () => {
    cy.task("readExcelFile", "cypress/fixtures/data/loginData.xlsx").then(
      (data) => {
        data.forEach((row) => {
          cy.log("Email: " + row.email);
          cy.log("Password: " + row.password);
        });
      }
    );
  });
});
