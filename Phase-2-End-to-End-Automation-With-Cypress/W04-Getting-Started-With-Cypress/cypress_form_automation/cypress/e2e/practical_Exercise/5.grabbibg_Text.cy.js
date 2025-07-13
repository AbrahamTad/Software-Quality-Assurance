describe('Checkbox selection and unselection test', () => {
  it('should check and uncheck a checkbox, verifying its state', () => {
    // Step 1: Visit the page
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    // Step 2: Select the checkbox (e.g., Option1)
    cy.get('input#checkBoxOption1')
      .check()
      .should('be.checked')            // Verify it is checked
      .and('have.value', 'option1');   // Optional: verify the value

    // Step 3: Unselect the checkbox
    cy.get('input#checkBoxOption1')
      .uncheck()
      .should('not.be.checked');       // Verify it is unchecked
  });
});
