
/// <reference types="cypress" />
import loginPage from '../support/Pages/LoginPage';
import CandidatesPage from '../support/Pages/CandidatesPage';

const candidatesPage = new CandidatesPage();

describe("Candidates Menu", () => {
  let testData;

  before(() => {
    cy.fixture("candidateData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    loginPage.login("Admin", "admin123");
    candidatesPage.navigate();
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      cy.screenshot(`failed-${this.currentTest.title}`);
    }
  });

  it("✅ Add Candidate - Valid Data", () => {
    const candidate = testData[0];
    candidatesPage.addCandidate(candidate);
    candidatesPage.verifySuccessMessage();
  });

  it("❌ Add Candidate - Missing Mandatory Fields", () => {
    candidatesPage.clickAddButton();
    // No input
    cy.get("button[type='submit']").click();
    cy.get(".oxd-input-field-error-message")
      .should("exist")
      .and("contain", "Required");
  });

  it("🔍 Search by Name", () => {
    const candidate = testData[0];
    candidatesPage.searchCandidateByName(candidate.firstName);
    cy.get(".oxd-table-body").should("contain", candidate.firstName);
  });
});




// /// <reference types="cypress" />
// import loginPage from '../support/Pages/LoginPage';
// import CandidatesPage from '../support/Pages/CandidatesPage';

// const candidatesPage = new CandidatesPage();

// describe("Candidates Menu", () => {
//   let testData;

//   before(() => {
//     cy.fixture("candidateData").then((data) => {
//       testData = data;
//     });
//   });

//   beforeEach(() => {
//     cy.visit("/");
//     loginPage.login("Admin", "admin123");
//     candidatesPage.navigate();
//   });

//   afterEach(function () {
//     if (this.currentTest.state === "failed") {
//       cy.screenshot(`failed-${this.currentTest.title}`);
//     }
//   });

//   it("✅ Add Candidate - Valid Data", () => {
//     const candidate = testData[0];
//     candidatesPage.addCandidate(candidate);
//     candidatesPage.verifySuccessMessage();
//   });

//   it("❌ Add Candidate - Missing Mandatory Fields", () => {
//     candidatesPage.clickAddButton();
//     // No input
//     cy.get("button[type='submit']").click();
//     cy.get(".oxd-input-field-error-message")
//       .should("exist")
//       .and("contain", "Required");
//   });

//   it("🔍 Search by Name", () => {
//     const candidate = testData[0];
//     candidatesPage.searchCandidateByName(candidate.firstName);
//     cy.get(".oxd-table-body").should("contain", candidate.firstName);
//   });
// });


/********************** */


// /// <reference types="cypress" />

// import loginPage from "../support/Pages/LoginPage";
// import CandidatesPage from "../support/Pages/CandidatesPage";

// describe("Candidates Menu", () => {
//   const candidatesPage = new CandidatesPage();
//   let fixtureData;

//   before(() => {
//     cy.fixture("candidateData").then((data) => {
//       fixtureData = data;
//     });
//   });

//   beforeEach(() => {
//     cy.visit("/");
//     loginPage.login("Admin", "admin123");
//     candidatesPage.navigate();
//   });

//   afterEach(function () {
//     if (this.currentTest.state === "failed") {
//       cy.screenshot(`failed-${this.currentTest.title}`);
//     }
//   });

//   it("✅ Add Candidate - Valid Data", () => {
//     candidatesPage.addCandidate(fixtureData[0]);
//     candidatesPage.verifySuccessMessage();
//   });

//   it("❌ Add Candidate - Missing Mandatory Fields", () => {
//     candidatesPage.addCandidate(fixtureData[1]);
//     candidatesPage.verifyRequiredFieldErrors();
//   });

//   it("🔍 Search by Name", () => {
//     candidatesPage.searchCandidateByName("John");
//     candidatesPage.verifySearchResultContains("John");
//   });

//   it("🔍 Search by Status", () => {
//     candidatesPage.searchByStatus("Shortlisted");
//     candidatesPage.verifySearchResultStatus("Shortlisted");
//   });

//   it("✏️ Create, Edit, and Verify Candidate", () => {
//     const original = {
//       firstName: "Editable",
//       lastName: "Candidate",
//       email: "editable@example.com",
//       contact: "1122334455",
//     };

//     const updated = {
//       newFirstName: "UpdatedEditable",
//       newEmail: "updated.editable@example.com",
//     };

//     candidatesPage.addCandidate(original);
//     candidatesPage.verifySuccessMessage();

//     candidatesPage.searchCandidateByName(original.firstName);
//     candidatesPage.verifySearchResultContains(original.firstName);

//     candidatesPage.editCandidate(updated);
//     candidatesPage.verifyCandidateUpdated(updated.newFirstName);
//   });
// });

/********************************************** */
// import loginPage from "../support/Pages/LoginPage";
// import vacanciesPage from "../support/Pages/VacanciesPage";

// const vacanciesPage = new VacanciesPage();

// describe("🔍 Vacancy Search Test", () => {
//   before(() => {
//     cy.fixture("loginData").then((logins) => {
//       const user = logins.find((u) => u.type === "valid");
//       cy.customLogin(user.username, user.password);
//     });
//   });

//   it("✅ Search Vacancy by filters", () => {
//     cy.visit("/web/index.php/recruitment/viewVacancies");
//     cy.fixture("vacancyData").then((vacancy) => {
//       vacanciesPage.enterSearchFilters(vacancy[0]);
//       vacanciesPage.submitSearch();
//       vacanciesPage.validateSearchResult(vacancy[0]);
//     });
//   });
// });
