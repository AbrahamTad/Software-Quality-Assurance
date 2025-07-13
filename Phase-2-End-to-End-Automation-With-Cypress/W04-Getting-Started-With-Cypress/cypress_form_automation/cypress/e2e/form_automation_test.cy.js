// cypress/e2e/form_automation_test.cy.js


describe("Business Registration Form Automation", () => {
  it("fills and submits the form with valid data", () => {
    cy.visit("https://form.jotform.com/242354571450554"); //form URL

    // Fill in text fields
    cy.get("#first_4").type("James");
    cy.get("#last_4").type("Bond");
    cy.get("#input_6").type("Bond Company");
    cy.get("#input_12_full").type("(000) 000-0000");
    cy.get("#input_5").type("jbond@example.com");

    // Address fields
    cy.get("#input_3_addr_line1").type("123 London Street");
    cy.get("#input_3_addr_line2").type("Apt 2");
    cy.get("#input_3_city").type("London");
    cy.get("#input_3_state").type("Maryland");
    cy.get("#input_3_postal").type("20902");

    // Dropdown
    cy.get("#input_11").select("Store");

    // Message
    cy.get("#input_8").type("This is a sample text.");

    // Submit
    cy.get("#input_14").click();
  });
});

