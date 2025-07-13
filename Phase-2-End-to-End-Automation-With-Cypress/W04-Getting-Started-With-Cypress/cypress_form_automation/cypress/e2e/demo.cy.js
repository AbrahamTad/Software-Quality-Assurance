describe("Verify login functionality", () => {
  it("should visit the login page", () => {
    cy.visit("https://www.evangadi.com/");
    cy.get("._hero-section--secondary-btn_13pfy_72").click();
    cy.get(
      ":nth-child(1) > div > ._input__container_i8yxx_1 > ._input_i8yxx_1"
    ).type("mukera@mail.com");
    cy.get(
      ":nth-child(2) > div > ._input__container_i8yxx_1 > ._input_i8yxx_1"
    ).type("Test@123");
    cy.get("._btn-primary_1dtki_1").click();
    
  });
});
