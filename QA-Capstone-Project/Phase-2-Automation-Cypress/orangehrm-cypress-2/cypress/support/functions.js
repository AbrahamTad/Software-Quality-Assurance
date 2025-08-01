// ✅ cypress/support/functions.js

/**
 * Sets up the environment for running Vacancy tests:
 * - Logs in as Admin
 * - Ensures the given job title exists
 * - Ensures the given hiring manager exists (creates if missing)
 * - Navigates to the Job Vacancy page
 */
export function setupVacancyTestEnvironment({
  jobTitle = "QA Engineer",
  hiringManager = "Abraham Tadese",
} = {}) {
  // ✅ Login using stored session or fresh login
  cy.login();

  // ✅ Ensure the required Job Title exists in the system
  cy.ensureJobTitle(jobTitle);

  // ✅ Ensure the specified Hiring Manager exists (or creates a new employee)
  cy.ensureHiringManager(hiringManager);

  // ✅ Navigate to the Recruitment → Job Vacancy page
  cy.visit("/web/index.php/recruitment/viewJobVacancy");

  // ✅ Assert that the page loaded successfully
  cy.get(".orangehrm-paper-container").should("be.visible");
}

// // cypress/support/functions.js

// export function setupVacancyTestEnvironment() {
//   cy.login();
//   cy.ensureJobTitle("QA Engineer");
//   cy.ensureHiringManager("Abraham Tadese");

//   cy.intercept("GET", "**/api/v2/recruitment/vacancies?**").as("getVacancies");
//   cy.visit("/web/index.php/recruitment/viewJobVacancy");
//   cy.wait("@getVacancies");
// }
