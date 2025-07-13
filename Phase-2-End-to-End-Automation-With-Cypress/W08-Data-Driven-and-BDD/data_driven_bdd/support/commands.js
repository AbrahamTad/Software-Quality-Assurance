// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import XLSX if needed (optional in this case since the task is handled in Node context)
const xlsx = require("xlsx");

//  Custom command to read Excel data
Cypress.Commands.add("readExcel", (filePath) => {
  return cy.task("readExcelFile", filePath); // Calls the read task
});

//  Custom command to write Excel data
Cypress.Commands.add("writeExcel", (filePath, sheetName, data) => {
  return cy.task("writeToExcelWithSheet", {
    filePath,
    sheetName,
    data,
  });
});

// Custom command to update a specific cell in an Excel file
Cypress.Commands.add(
  "updateExcelCell",
  (filePath, sheetName, row, column, newValue) => {
    return cy.task("updateExcelCell", {
      filePath,
      sheetName,
      row,
      column,
      newValue,
    });
  }
);

// Custom command to load data from multiple sheets
Cypress.Commands.add("loadMultipleSheets", (filePath, sheetNames) => {
  return cy.task("loadMultipleSheets", { filePath, sheets: sheetNames });
});

// Custom command to overwrite an existing sheet with updated data
Cypress.Commands.add("readExcel", (filePath) => {
  return cy.task("readExcelFile", filePath);
});

Cypress.Commands.add("writeExcel", (filePath, data) => {
  return cy.task("writeExcelFile", { filePath, data });
});

Cypress.Commands.add("filterDepartment", (department) => {
  cy.task("filterEmployeesByDepartment", department);
});
