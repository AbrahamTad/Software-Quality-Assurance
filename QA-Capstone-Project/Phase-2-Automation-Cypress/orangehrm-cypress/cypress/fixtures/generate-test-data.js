const XLSX = require('xlsx');

// ✅ Candidates Test Data
const candidatesData = [
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com", jobTitle: "QA Engineer", valid: true },
  { firstName: "", lastName: "Smith", email: "invalid@example.com", jobTitle: "Tester", valid: false },
  { firstName: "Anna", lastName: "", email: "anna@example.com", jobTitle: "", valid: false }
];

const candidatesSheet = XLSX.utils.json_to_sheet(candidatesData);
const candidatesBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(candidatesBook, candidatesSheet, "Candidates");
XLSX.writeFile(candidatesBook, "cypress/fixtures/candidatesData.xlsx");

// ✅ Vacancies Test Data
const vacanciesData = [
  { jobTitle: "Automation Engineer", hiringManager: "Alice", positions: 2, valid: true },
  { jobTitle: "", hiringManager: "Bob", positions: 1, valid: false },
  { jobTitle: "QA Analyst", hiringManager: "", positions: 0, valid: false }
];

const vacanciesSheet = XLSX.utils.json_to_sheet(vacanciesData);
const vacanciesBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(vacanciesBook, vacanciesSheet, "Vacancies");
XLSX.writeFile(vacanciesBook, "cypress/fixtures/vacanciesData.xlsx");

console.log("✅ candidatesData.xlsx and vacanciesData.xlsx generated successfully!");
