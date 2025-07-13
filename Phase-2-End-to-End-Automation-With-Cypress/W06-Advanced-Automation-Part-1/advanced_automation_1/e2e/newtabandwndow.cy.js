describe("New Tab and Window", () => {
  it.skip("new tab", () => {
    // Visit the initial page
    cy.visit("https://www.letskodeit.com/practice");
    // Click on the link that opens a new tab
    cy.get("#opentab").invoke("removeAttr", "target").click();
    //assert that the new tab has opened by checking the URL
    cy.url().should("include", "/courses");
    cy.get(".input-group > #search").type("Cypress {enter}");
    cy.go("back"); // Go back to the previous page
    cy.wait(4000); // Wait for 4 seconds to ensure the page is loaded
    cy.go("forward"); // Go forward to the new tab page
  })

  // Test case to handle opening a new window
  it("new window", () => {
    // Visit the initial page
    cy.visit("https://www.letskodeit.com/practice");
    let url = "https://letskodeit.com/courses";

    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        win.location.url = url;
      });
    });
    cy.get("#openwindow").click()
  });
});
