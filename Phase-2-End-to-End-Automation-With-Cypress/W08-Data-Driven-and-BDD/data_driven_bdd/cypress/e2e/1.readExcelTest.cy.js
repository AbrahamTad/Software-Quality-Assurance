// Define a test suite named "Read Excel Data Test"
describe("Read Excel Data Test", () => {
  // Define a test case that will log each row from the Excel file
  it("Logs each row from Excel", () => {
    // Use the custom Cypress command to read data from the Excel file
    cy.readExcel("cypress/fixtures/data/testData.xlsx").then((data) => {
      // Iterate over each row of the Excel data
      data.forEach((row) => {
        // Log the username and password from each row to the Cypress test runner output
        cy.log(`Username: ${row.username}, Password: ${row.password}`);
      });
    });
  });
});
