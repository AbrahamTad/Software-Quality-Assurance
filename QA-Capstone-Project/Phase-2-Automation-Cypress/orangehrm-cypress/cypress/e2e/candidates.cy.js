import CandidatesPage from "../pageObjects/CandidatesPage";

describe("Recruitment - Candidates Tests", () => {
  before(() => {
    cy.fixture("candidatesData").as("candidates");
  });

  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.get('[name="username"]').type("Admin");
    cy.get('[name="password"]').type("admin123");
    cy.get('[type="submit"]').click();
    cy.visit("/web/index.php/recruitment/viewCandidates");
  });

  it("Data-Driven Candidate Creation", function () {
    this.candidates.forEach((candidate) => {
      cy.visit("/web/index.php/recruitment/viewCandidates");

      CandidatesPage.addCandidate(
        candidate.firstName,
        candidate.lastName,
        candidate.email
      );

      if (candidate.valid) {
        CandidatesPage.elements.successToast().should("exist");
      } else {
        cy.get(".oxd-input-group__message").should("exist"); // Field validation error
      }
    });
  });
});
