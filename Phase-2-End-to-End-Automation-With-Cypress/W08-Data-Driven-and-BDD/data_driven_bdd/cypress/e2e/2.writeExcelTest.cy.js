// Test suite for writing employee data to an Excel file
describe("Write Employee Data", () => {
  // Test case: Writes an array of employee details into an Excel file
  it("Writes to Excel using custom command", () => {
    // Step 1: Define the employee data to be written
    // Each object in the array represents a row in the Excel sheet
    const employeeData = [
      { EmployeeID: 101, Name: "Alice", Department: "HR", Salary: 60000 },
      { EmployeeID: 102, Name: "Bob", Department: "IT", Salary: 75000 },
      {
        EmployeeID: 103,
        Name: "Charlie",
        Department: "Finance",
        Salary: 65000,
      },
    ];

    // Step 2: Use the custom Cypress command `cy.writeExcel` It takes 3 arguments:
    // - file path to save the Excel file
    // - name of the worksheet (tab in Excel)
    // - the JSON data to write
    cy.writeExcel(
      "cypress/fixtures/data/employeeData.xlsx", // Target file path
      "EmployeeDetails", // Worksheet name
      employeeData // Data to write
    );
  });
});
