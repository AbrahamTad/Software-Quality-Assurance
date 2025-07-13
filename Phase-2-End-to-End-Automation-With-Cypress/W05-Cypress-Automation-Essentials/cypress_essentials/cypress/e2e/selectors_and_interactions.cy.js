describe('Cypress Selectors & Interactions', () => {

  it('1. Locate and interact with elements using ID, class, and attribute', () => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    cy.get('#name').type('Abraham');
    cy.get('.form-control').eq(1).type('abraham@example.com');
    cy.get('[name="name"]').clear().type('Abraham T');
  });

  it('2. Verify modal visibility toggle', () => {
    cy.visit('https://demoqa.com/modal-dialogs');
    cy.get('#example-modal-sizes-title-sm').should('not.exist');
    cy.get('#showSmallModal').click();
    cy.get('.modal-title').should('be.visible');
  });

  it('3. Verify error message for invalid login', () => {
    cy.visit('https://www.facebook.com');
    cy.get('#email').type('wronguser@example.com');
    cy.get('#pass').type('wrongpassword');
    cy.get('button[name="login"]').click();
    cy.get('.error-message').should('contain', 'Invalid username or password');
  });

  it('4. Verify a link with correct href "/shop"', () => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    cy.get('a[href="/shop"]').should('exist');
  });

  it('5. Select and unselect checkbox, verify state', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#checkBoxOption1').check().should('be.checked');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
  });

  it('6. Select multiple checkboxes and verify', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('input[type="checkbox"]').check(['option1', 'option2', 'option3']);
    cy.get('input[type="checkbox"]').each((checkbox) => {
      cy.wrap(checkbox).should('be.checked');
    });
  });

  it('7. Select dropdown option by visible text', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#dropdown-class-example').select('Option2').should('have.value', 'option2');
  });

  it('8. Verify #termsCheckbox is disabled, enable and check it', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#termsCheckbox').should('be.disabled');
    // Uncomment and implement enabling logic if applicable
    // cy.get('#enableTermsBtn').click();
    // cy.get('#termsCheckbox').should('not.be.disabled').check().should('be.checked');
  });

});
