describe('template spec', () => {
  it('passes', () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/"); //navigate to the URL
    // cy.get(".products").find(".product").eq(2)
    cy.get(".products").find(".product").should("have.length",30); //assert that there are 30 products
    cy.get('.search-keyword').type('banana').should("be.visible"); //search for banana
    // cy.get(".search-button").click(); //click on the search button
    
}); 
});