// ✅ cypress/e2e/vacancyTest.cy.js

import vacanciesData from "../fixtures/vacancyData.json";
import vacancyPage from "../support/Pages/VacanciesPage";
import { setupVacancyTestEnvironment } from "../support/functions";

describe("Recruitment - Vacancy Tests", () => {
  beforeEach(() => {
    setupVacancyTestEnvironment();
  });

  it("TC_VAC_001 - should add a new vacancy successfully", () => {
    const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_001");

    // Remove jobTitle and hiringManager before passing to method
    const { jobTitle, hiringManager, ...vacancyDataWithoutExtras } = vacancy;
    vacancyPage.addVacancy(vacancyDataWithoutExtras);
  });

  it("TC_VAC_002 - Validate Mandatory Fields", () => {
    vacancyPage.addVacancy({
      vacancyName: "",
      numberOfPositions: "",
    });
    vacancyPage.verifyValidationErrors();
  });

  it("TC_VAC_003 - should search vacancies using filters", () => {
    const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_003");

    // Remove jobTitle and hiringManager before using
    const { jobTitle, hiringManager, ...searchFiltersWithoutExtras } = vacancy;
    vacancyPage.searchVacancy(searchFiltersWithoutExtras);
  });
});

// // ✅ cypress/e2e/vacancyTest.cy.js

// import vacanciesData from "../fixtures/vacancyData.json";
// import vacancyPage from "../support/Pages/VacanciesPage";
// import { setupVacancyTestEnvironment } from "../support/functions";

// describe("Recruitment - Vacancy Tests", () => {
//   beforeEach(() => {
//     setupVacancyTestEnvironment();
//   });

//   it("TC_VAC_001 - should add a new vacancy successfully", () => {
//     const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_001");

//     // Remove jobTitle and hiringManager before passing to method
//     const { jobTitle, hiringManager, ...vacancyDataWithoutExtras } = vacancy;
//     vacancyPage.addVacancy(vacancyDataWithoutExtras);
//   });

//   it("TC_VAC_002 - Validate Mandatory Fields", () => {
//     vacancyPage.addVacancy({
//       vacancyName: "",
//       numberOfPositions: ""
//     });
//     vacancyPage.verifyValidationErrors();
//   });

//   it("TC_VAC_003 - should search vacancies using filters", () => {
//     const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_003");

//     // Remove jobTitle and hiringManager before using
//     const { jobTitle, hiringManager, ...searchFiltersWithoutExtras } = vacancy;
//     vacancyPage.searchVacancy(searchFiltersWithoutExtras);
//   });
// });

// // ✅ cypress/e2e/vacancyTest.cy.js

// import vacanciesData from "../fixtures/vacancyData.json";
// import vacancyPage from "../support/Pages/VacanciesPage";
// import { setupVacancyTestEnvironment } from "../support/functions";

// describe("Recruitment - Vacancy Tests", () => {
//   beforeEach(() => {
//     setupVacancyTestEnvironment();
//   });

//   it("TC_VAC_001 - should add a new vacancy successfully", () => {
//     const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_001");
//     vacancyPage.addVacancy(vacancy);
//   });

//   it("TC_VAC_002 - Validate Mandatory Fields", () => {
//     vacancyPage.addVacancy({
//       jobTitle: "",
//       vacancyName: "",
//       hiringManager: "",
//       numberOfPositions: "",
//     });
//     vacancyPage.verifyValidationErrors();
//   });

//   it("TC_VAC_003 - should search vacancies using filters", () => {
//     const vacancy = vacanciesData.find((v) => v.id === "TC_VAC_003");
//     vacancyPage.searchVacancy(vacancy);
//   });
// });

// import VacanciesPage from "../support/Pages/VacanciesPage";

// const vacanciesPage = new VacanciesPage();

// describe("🧪 Recruitment > Vacancies Module", () => {
//   beforeEach(() => {
//     cy.login();
//     cy.ensureJobTitle("QA Engineer");
//     cy.ensureHiringManager("Abraham Tadese");

//     cy.intercept("GET", "**/api/v2/recruitment/vacancies?**").as(
//       "getVacancies"
//     );

//     cy.visit("/web/index.php/recruitment/viewJobVacancy");
//     cy.wait("@getVacancies").its("response.statusCode").should("eq", 200);
//   });

//   it("✅ Add Vacancy with Valid Data & Verify", () => {
//     cy.fixture("vacancyData").then((data) => {
//       const { jobTitle, vacancyName, hiringManager, numberOfPositions } =
//         data.validVacancy;

//       vacanciesPage.clickAddButton();
//       vacanciesPage.selectJobTitle(jobTitle);
//       vacanciesPage.typeVacancyName(vacancyName);
//       vacanciesPage.typeHiringManager(hiringManager);
//       vacanciesPage.typeNumberOfPositions(numberOfPositions);
//       vacanciesPage.clickSaveButton();

//       // ✅ Verify toast success with DOM retries
//       cy.get(".oxd-toast", { timeout: 10000 })
//         .should("be.visible")
//         .and("contain.text", "Successfully Saved");
//     });
//   });

//   it("⚠️ Show Validation Error for Required Fields", () => {
//     vacanciesPage.clickAddButton();
//     vacanciesPage.clickSaveButton();

//     vacanciesPage.getRequiredFieldErrors().each(($el) => {
//       cy.wrap($el).should("contain.text", "Required");
//     });
//   });

//   it("🔍 Search Vacancy by Name", () => {
//     cy.fixture("vacancyData").then((data) => {
//       const { vacancyName } = data.validVacancy;

//       vacanciesPage.searchByVacancyName(vacancyName);
//       vacanciesPage.clickSearchButton();

//       cy.wait("@getVacancies");

//       // ✅ Robust result verification
//       cy.get("div.orangehrm-container table tbody", { timeout: 10000 })
//         .find("tr")
//         .should("have.length.at.least", 1)
//         .first()
//         .should("contain.text", vacancyName);
//     });
//   });
// });

// import loginPage from "../support/Pages/LoginPage";
// import vacanciesPage from "../support/Pages/VacanciesPage";

// describe("🔍 Recruitment → Vacancies Tests", () => {
//   beforeEach(() => {
//     // Always login before each test
//     cy.visit("/web/index.php/auth/login");
//     loginPage.login("Abraham", "\"!Password1!");
//   });

//   it("✅ Search Vacancy by filters", () => {
//     cy.visit("/web/index.php/recruitment/viewJobVacancy");

//     cy.fixture("vacancyData").then((vacancy) => {
//       vacanciesPage.enterSearchFilters(vacancy[0]);
//       vacanciesPage.submitSearch();

//       cy.get(".oxd-table-body").then(($table) => {
//         if ($table.find(".oxd-table-row").length > 0) {
//           cy.log("✅ Search results found");
//           cy.get(".oxd-table-row").should("have.length.at.least", 1);
//         } else {
//           cy.log("⚠️ No records found");
//           cy.get(".oxd-table-body").should("contain.text", "No Records Found");
//         }
//       });
//     });
//   });

//   it("➕ Add New Vacancy", () => {
//     cy.visit("/web/index.php/recruitment/viewJobVacancy");

//     cy.fixture("vacancyData").then((data) => {
//       vacanciesPage.addNewVacancy(data[0]);
//     });
//   });
// });
