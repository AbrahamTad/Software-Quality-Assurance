class VacanciesPage {
  // Locators
  addButton = 'button:has-text("Add")';
  vacancyNameInput = 'input[name="addVacancy[vacancy_name]"]';
  numberOfPositionsInput = 'input[name="addVacancy[number_of_positions]"]';
  saveButton = 'button[type="submit"]';

  vacancyNameSearchInput = 'input[placeholder="Vacancy"]';
  searchButton = 'button:has-text("Search")';
  resultTable = "table";

  // Actions
  clickAddButton() {
    cy.get(this.addButton).click();
  }

  addVacancy(vacancy) {
    this.clickAddButton();

    if (vacancy.vacancyName) {
      cy.get(this.vacancyNameInput).clear().type(vacancy.vacancyName);
    }

    if (vacancy.numberOfPositions) {
      cy.get(this.numberOfPositionsInput)
        .clear()
        .type(vacancy.numberOfPositions);
    }

    cy.get(this.saveButton).click();
  }

  verifyValidationErrors() {
    cy.get("span.oxd-input-field-error-message").should("exist");
  }

  searchVacancy(filters) {
    if (filters.vacancyName) {
      cy.get(this.vacancyNameSearchInput).clear().type(filters.vacancyName);
    }

    cy.get(this.searchButton).click();

    cy.get(this.resultTable).should("be.visible");
  }
}

export default new VacanciesPage();

// class VacanciesPage {
//   navigate() {
//     cy.contains("Recruitment").click();
//     cy.contains("Vacancies").click();
//     cy.url().should("include", "/recruitment/viewJobVacancy");
//   }

//   addVacancy({ jobTitle, vacancyName, hiringManager, positions, description }) {
//     cy.contains("Add").click();
//     cy.url().should("include", "/recruitment/addJobVacancy");

//     // Robust dropdown for Job Title
//     if (jobTitle) {
//       cy.get("label")
//         .contains("Job Title")
//         .parentsUntil(".oxd-grid-item") // safely traverse to dropdown container
//         .find(".oxd-select-text")
//         .should("exist")
//         .click();

//       cy.get(".oxd-select-dropdown").contains(jobTitle).click();
//     }

//     if (vacancyName) cy.get("input[name='name']").type(vacancyName);
//     if (hiringManager)
//       cy.get("input[placeholder='Type for hints...']").type(hiringManager);
//     if (positions) cy.get("input[name='noOfPositions']").type(positions);
//     if (description) cy.get("textarea").type(description);

//     cy.get("button[type='submit']").click();
//   }

//   verifySuccessMessage() {
//     cy.get(".oxd-toast-content-text")
//       .should("be.visible")
//       .and("contain.text", "Successfully Saved");
//   }

//   verifyErrorMessages(expectedMessages = []) {
//     cy.get(".oxd-input-field-error-message").each(($el) => {
//       cy.wrap($el)
//         .invoke("text")
//         .then((text) => {
//           expect(expectedMessages.some((msg) => text.includes(msg))).to.be.true;
//         });
//     });
//   }

//   searchByJobTitle(jobTitle) {
//     cy.get("label")
//       .contains("Job Title")
//       .parentsUntil(".oxd-grid-item")
//       .find(".oxd-select-text")
//       .should("exist")
//       .click();

//     cy.get(".oxd-select-dropdown").contains(jobTitle).click();

//     cy.get("button").contains("Search").click();
//   }

//   verifySearchResult(expectedVacancy) {
//     cy.get(".oxd-table-body").should("contain.text", expectedVacancy);
//   }
// }

// export default VacanciesPage;

/*************************** */

// class VacanciesPage {
//   elements = {
//     jobTitleDropdown: () =>
//       cy.get("div.oxd-form-row div.oxd-select-text").eq(0),
//     vacancyDropdown: () => cy.get("div.oxd-form-row div.oxd-select-text").eq(1),
//     hiringManagerInput: () => cy.get('input[placeholder="Type for hints..."]'),
//     statusDropdown: () => cy.get("div.oxd-form-row div.oxd-select-text").eq(2),
//     searchBtn: () => cy.contains("Search"),
//     addButton: () => cy.contains("Add"),
//   };

//   enterSearchFilters(vacancy) {
//     this.elements.jobTitleDropdown().click();
//     cy.contains(".oxd-select-option", vacancy.jobTitle).click();

//     this.elements.vacancyDropdown().click();
//     cy.get(".oxd-select-option")
//       .contains(vacancy.vacancy)
//       .should("be.visible")
//       .click();

//     this.elements
//       .hiringManagerInput()
//       .type(vacancy.hiringManager, { force: true });
//     cy.wait(500); // Wait for suggestions
//     cy.get(".oxd-autocomplete-option").contains(vacancy.hiringManager).click();

//     this.elements.statusDropdown().click();
//     cy.contains(".oxd-select-option", vacancy.status).click();
//   }

//   submitSearch() {
//     this.elements.searchBtn().click();
//   }

//   addNewVacancy(data) {
//     this.elements.addButton().click();
//     // Add logic for filling vacancy form here
//   }
// }

// export default new VacanciesPage();
