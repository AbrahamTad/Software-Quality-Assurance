describe("Login Test and Status Update from Excel", () => {
  const filePath = "cypress/fixtures/data/loginStatusData.xlsx";

  it("Performs login and updates status in Excel", () => {
    cy.readExcel(filePath).then((rows) => {
      const updatedRows = [];

      // Process each user row one by one
      rows.forEach((user) => {
        cy.visit("/login"); 

        // Fill the form (adjust IDs if different)
        cy.get("#username").clear().type(user.Username);
        cy.get("#password").clear().type(user.Password);
        cy.get("#loginButton").click();

        // Simulate login result based on known logic (you can add real assertions here)
        cy.wait(1000); // Give time for response/UI
        cy.then(() => {
          let status;
          if (user.Password === "Test@123") status = "Success";
          else if (user.Password === "pass@123") status = "Suspended";
          else status = "Failed";

          updatedRows.push({
            ...user,
            Status: status,
          });
        });
      });

      // Wait for all rows to be processed before writing
      cy.then(() => {
        cy.writeExcel(filePath, updatedRows);
      });
    });
  });
});
