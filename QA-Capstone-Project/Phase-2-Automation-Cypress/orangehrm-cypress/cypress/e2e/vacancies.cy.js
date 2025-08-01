import VacanciesPage from "../pageObjects/VacanciesPage";

describe("Recruitment - Vacancies Tests", () => {
  it("Data-Driven Vacancy Creation", () => {
    cy.fixture("vacanciesData").then((vacancies) => {
      vacancies.forEach((vacancy) => {
        cy.visit("/web/index.php/auth/login");
        cy.get('[name="username"]').type("Admin");
        cy.get('[name="password"]').type("admin123");
        cy.get('[type="submit"]').click();

        cy.visit("/web/index.php/recruitment/viewJobVacancy");
        VacanciesPage.addVacancy(
          vacancy.jobTitle,
          vacancy.vacancyName,
          vacancy.hiringManager
        );

        if (vacancy.valid) {
          VacanciesPage.elements.successToast().should("exist");
        } else {
          cy.get(".oxd-input-group__message").should("exist");
        }
      });
    });
  });
});
