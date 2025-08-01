class VacanciesPage {
  elements = {
    addButton: () => cy.contains("Add"),
    jobTitle: () => cy.get("select").first(),
    vacancyName: () => cy.get('[placeholder="Vacancy Name"]'),
    hiringManager: () => cy.get('[placeholder="Type for hints..."]'),
    saveButton: () => cy.contains("Save"),
    successToast: () => cy.contains("Successfully Saved"),
  };

  addVacancy(jobTitle, vacancyName, hiringManager) {
    this.elements.addButton().click();
    this.elements.jobTitle().select(jobTitle);
    this.elements.vacancyName().type(vacancyName);
    this.elements.hiringManager().type(hiringManager).type("{enter}");
    this.elements.saveButton().click();
  }
}

export default new VacanciesPage();
