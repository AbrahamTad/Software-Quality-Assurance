// CandidatesPage.js
class CandidatesPage {
  navigate() {
    cy.contains("Recruitment").click();
    cy.contains("Candidates").click();
    cy.url().should("include", "/recruitment/viewCandidates");
  }

  clickAddButton() {
    cy.get("button").contains("Add").click();
  }

  addCandidate({ firstName, lastName, email, contact }) {
    this.clickAddButton();
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("label")
      .contains("Email")
      .parents(".oxd-input-group")
      .find("input")
      .type(email);
    cy.get("label")
      .contains("Contact")
      .parents(".oxd-input-group")
      .find("input")
      .type(contact);
    cy.get("button[type='submit']").click();
  }

  verifySuccessMessage() {
    cy.get(".oxd-toast-content-text", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Successfully Saved");
  }

  searchCandidateByName(name) {
    cy.visit("/web/index.php/recruitment/viewCandidates");
    cy.get("input[placeholder='Type for hints...']", { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(name);
    cy.get("button").contains("Search").click();
  }

  verifySearchResultContains(name) {
    cy.get(".oxd-table-body").should("contain.text", name);
  }

  // searchByStatus(status) {
  //   cy.contains("label", "Status")
  //     .should("be.visible")
  //     .parent()
  //     .find(".oxd-select-text")
  //     .click();

  //   cy.get(".oxd-select-dropdown")
  //     .contains(status)
  //     .click();

  //   cy.get("button").contains("Search").click();
  // }

  // editCandidate({ newFirstName, newEmail }) {
  //   cy.get(".oxd-table-body button").first().click();

  //   cy.get("input[name='firstName']", { timeout: 10000 }).then(($input) => {
  //     if ($input.is(":disabled")) {
  //       throw new Error("❌ Candidate form is not editable. Use a newly added candidate.");
  //     }
  //   });

  //   if (newFirstName) {
  //     cy.get("input[name='firstName']")
  //       .clear()
  //       .type(newFirstName);
  //   }

  //   if (newEmail) {
  //     cy.get("label")
  //       .contains("Email")
  //       .parents(".oxd-input-group")
  //       .find("input")
  //       .clear()
  //       .type(newEmail);
  //   }

  //   cy.get("button[type='submit']").click();
  // }

  verifyCandidateUpdated(expectedName) {
    cy.visit("/web/index.php/recruitment/viewCandidates");
    this.searchCandidateByName(expectedName);
    this.verifySearchResultContains(expectedName);
  }
}

export default CandidatesPage;

// class CandidatesPage {
//   // ✅ Navigate to Candidates menu
//   navigate() {
//     cy.contains("Recruitment").click();
//     cy.contains("Candidates").click();
//     cy.url().should("include", "/recruitment/viewCandidates");
//   }

//   // ✅ Add a candidate with dynamic test data
//   addCandidate(data) {
//     cy.contains("button", "Add").click();

//     if (data.firstName) cy.get("input[name='firstName']").type(data.firstName);
//     if (data.lastName) cy.get("input[name='lastName']").type(data.lastName);

//     if (data.email) {
//       cy.get("label")
//         .contains("Email")
//         .parents(".oxd-input-group")
//         .find("input")
//         .type(data.email);
//     }

//     if (data.contact) {
//       cy.get("label")
//         .contains("Contact")
//         .parents(".oxd-input-group")
//         .find("input")
//         .type(data.contact);
//     }

//     cy.get("button[type='submit']").click();
//   }

//   // ✅ Verify candidate added successfully
//   verifySuccessMessage() {
//     cy.contains("Successfully Saved", { timeout: 10000 }).should("be.visible");
//   }

//   // ✅ Validate required fields display error
//   verifyRequiredFieldErrors() {
//     cy.get(".oxd-input-group__message").contains("Required").should("exist");
//   }

//   // ✅ Search candidate by name (includes safe navigation)
//   searchCandidateByName(name) {
//     cy.url().then((url) => {
//       if (!url.includes("/recruitment/viewCandidates")) {
//         cy.visit("/web/index.php/recruitment/viewCandidates");
//       }
//     });

//     cy.get("input[placeholder='Type for hints...']", { timeout: 10000 })
//       .should("be.visible")
//       .clear()
//       .type(name);

//     cy.get("button").contains("Search").click();
//   }

//   // ✅ Verify candidate appears in results
//   verifySearchResultContains(name) {
//     cy.get(".oxd-table-body", { timeout: 10000 }).should("contain.text", name);
//   }

//   // ✅ Search by candidate status from dropdown
//   searchByStatus(status) {
//     cy.get("label")
//       .contains("Status")
//       .parents(".oxd-grid-item")
//       .find(".oxd-select-text")
//       .click();

//     cy.get(".oxd-select-dropdown").contains(status).click();

//     cy.get("button").contains("Search").click();
//   }

//   // ✅ Confirm status search result
//   verifySearchResultStatus(status) {
//     cy.get(".oxd-table-body").should("contain.text", status);
//   }

//   // ✅ Edit the first candidate in list
//   editCandidate({ newFirstName, newEmail }) {
//     cy.get(".oxd-table-body button").first().click(); // edit icon

//     if (newFirstName) {
//       cy.get("input[name='firstName']")
//         .should("not.be.disabled")
//         .clear()
//         .type(newFirstName);
//     }

//     if (newEmail) {
//       cy.get("label")
//         .contains("Email")
//         .parents(".oxd-input-group")
//         .find("input")
//         .clear()
//         .type(newEmail);
//     }

//     cy.get("button[type='submit']").click();
//   }

//   // ✅ Confirm candidate updated and listed
//   verifyCandidateUpdated(expectedName) {
//     cy.visit("/web/index.php/recruitment/viewCandidates");
//     cy.get(".oxd-table-body", { timeout: 10000 }).should(
//       "contain.text",
//       expectedName
//     );
//   }
// }

// export default CandidatesPage;
/******************************************* */

// class CandidatesPage {
//   navigate() {
//     cy.contains('Recruitment').click();
//     cy.contains('Candidates').click();
//     cy.url().should('include', '/recruitment/viewCandidates');
//   }

//   addCandidate(data) {
//     cy.contains('button', 'Add').click();

//     if (data.firstName) cy.get("input[name='firstName']").type(data.firstName);
//     if (data.lastName) cy.get("input[name='lastName']").type(data.lastName);
//     if (data.email)
//       cy.get("label").contains('Email')
//         .parents('.oxd-input-group')
//         .find('input')
//         .type(data.email);
//     if (data.contact)
//       cy.get("label").contains('Contact')
//         .parents('.oxd-input-group')
//         .find('input')
//         .type(data.contact);

//     cy.get("button[type='submit']").click();
//   }

//   verifySuccessMessage() {
//     cy.contains('Successfully Saved').should('be.visible');
//   }

//   verifyRequiredFieldErrors() {
//     cy.get('.oxd-input-group__message').contains('Required').should('exist');
//   }

//   searchCandidateByName(name) {
//     cy.get("input[placeholder='Type for hints...']").clear().type(name);
//     cy.get('button').contains('Search').click();
//   }

//   verifySearchResultContains(name) {
//     cy.get('.oxd-table-body').should('contain.text', name);
//   }

//   searchByStatus(status) {
//     cy.contains('label', 'Status', { timeout: 8000 }).should('be.visible')
//       .parent().find('.oxd-select-text').click();

//     cy.get('.oxd-select-dropdown').contains(status).click();
//     cy.get('button').contains('Search').click();
//   }

//   verifySearchResultStatus(status) {
//     cy.get('.oxd-table-body').should('contain.text', status);
//   }

//   editCandidate({ newFirstName, newEmail }) {
//     cy.get('.oxd-table-body button').first().click(); // Edit icon

//     if (newFirstName) {
//       cy.get("input[name='firstName']")
//         .should('not.be.disabled')
//         .clear()
//         .type(newFirstName);
//     }

//     if (newEmail) {
//       cy.get("label").contains('Email')
//         .parents('.oxd-input-group')
//         .find('input')
//         .clear()
//         .type(newEmail);
//     }

//     cy.get("button[type='submit']").click();
//   }

//   verifyCandidateUpdated(expectedName) {
//     cy.get('.oxd-table-body').should('contain.text', expectedName);
//   }
// }

// export default CandidatesPage;
