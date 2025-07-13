describe("Checkbox Table Interaction - Vinoth QA Academy", () => {
  // Test 1: Select checkboxes for rows where role is 'Software Engineer'
  it("Should select specific checkboxes based on conditions", () => {
    // Step 1: Visit the target webpage containing the table
    cy.visit("https://vinothqaacademy.com/webtable/");

    // Step 2: Ensure the table is fully loaded and visible before interacting
    cy.get("table").should("be.visible");

    // Step 3: Iterate over each table row within the tbody
    cy.get("table tbody tr").each(($row) => {
      // Step 4: Extract the text content of specific columns
      const name = $row.find("td").eq(1).text().trim(); // Full Name is in the 2nd column (index 1)
      const role = $row.find("td").eq(3).text().trim(); // Role is in the 4th column (index 3)

      // Step 5: Check if the role matches 'Software Engineer'
      if (role === "Software Engineer") {
        // Step 6: Find the checkbox in the first column and check it
        cy.wrap($row).find('td input[type="checkbox"]').check();

        // Step 7: Verify the checkbox is now checked
        cy.wrap($row).find('td input[type="checkbox"]').should("be.checked");

        // Step 8: Log selected person's name and role for debugging
        cy.log(`Selected ${name} who is an ${role}`);
      }
    });
  });

  // Test 2: Check all checkboxes in the table body
  it("Should check all checkboxes in the table", () => {
    // Visit the page again to reset the state
    cy.visit("https://vinothqaacademy.com/webtable/");

    // Select all checkbox inputs inside the table body and check them
    cy.get('table tbody input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).check().should("be.checked"); // Assert each is checked
    });
  });

  // Test 3: Uncheck all checkboxes in the table body
  it("Should uncheck all checkboxes in the table", () => {
    // Visit the page again to reset the state
    cy.visit("https://vinothqaacademy.com/webtable/");

    // Find all checkbox inputs inside the table body and uncheck them
    cy.get('table tbody input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).uncheck().should("not.be.checked"); // Assert each is unchecked
    });
  });

  // Test 4: Use a precise CSS locator to select checkbox in second row, first column
  it("Should check the checkbox in the second row, first column using specific locator", () => {
    // Visit the webpage with the table
    cy.visit("https://vinothqaacademy.com/webtable/");

    // Confirm the table is visible before interacting
    cy.get("table").should("be.visible");

    // Use CSS selector to target second row's first cell's checkbox directly
    cy.get('tbody > :nth-child(2) > :nth-child(1) input[type="checkbox"]')
      .check() // Check the checkbox
      .should("be.checked"); // Verify checkbox is checked
  });
});
