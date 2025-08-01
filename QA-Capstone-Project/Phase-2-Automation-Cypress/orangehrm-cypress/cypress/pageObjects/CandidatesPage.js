class CandidatesPage {
  elements = {
    addButton: () => cy.contains("Add"),
    firstName: () => cy.get('[name="firstName"]'),
    lastName: () => cy.get('[name="lastName"]'),
    email: () => cy.get('[type="email"]'),
    saveButton: () => cy.contains("Save"),
    successToast: () => cy.contains("Successfully Saved"),
  };

  addCandidate(first, last, email) {
    this.elements.addButton().click();
    this.elements.firstName().type(first);
    this.elements.lastName().type(last);
    this.elements.email().type(email);
    this.elements.saveButton().click();
  }
}

export default new CandidatesPage();
