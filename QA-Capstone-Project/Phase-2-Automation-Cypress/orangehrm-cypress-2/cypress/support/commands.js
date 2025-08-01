// ✅ Login using session
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.session([username, password], () => {
    cy.visit("/web/index.php/auth/login");
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});

// ✅ Ensure Hiring Manager exists (or create new employee)

Cypress.Commands.add("ensureHiringManager", (fullName = "Abraham Tadese") => {
  const [firstName, lastName] = fullName.split(" ");

  cy.visit("/web/index.php/recruitment/viewJobVacancy");
  cy.contains("button", "Add").click();

  cy.get(".oxd-autocomplete-text-input > input")
    .should("be.visible")
    .clear()
    .type(fullName, { delay: 100 });

  cy.get('div[role="listbox"]', { timeout: 10000 }).should("exist").then(($listbox) => {
    const optionExists = $listbox.find(`.oxd-autocomplete-option:contains("${fullName}")`).length > 0;

    if (optionExists) {
      cy.contains('.oxd-autocomplete-option', fullName).click();
      cy.log(`✅ Hiring Manager "${fullName}" already exists`);
    } else {
      cy.log(`⚠️ Hiring Manager "${fullName}" not found, creating...`);
      cy.visit("/web/index.php/pim/addEmployee");

      // Fill employee form
      cy.get('input[name="firstName"]').clear().type(firstName);
      cy.get('input[name="lastName"]').clear().type(lastName);
      cy.get('button[type="submit"]').contains("Save").click();

      // Verify successful creation
      cy.url().should("include", "/pim/viewPersonalDetails");
      cy.get("h6.oxd-text--h6").should("contain", "Personal Details");

      // Return to vacancies page
      cy.visit("/web/index.php/recruitment/viewJobVacancy");
    }
  });
});

// ✅ Ensure Job Title exists
Cypress.Commands.add("ensureJobTitle", (title = "QA Engineer") => {
  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/admin/job-titles?limit=0",
  }).then((res) => {
    const exists = res.body.data.some((job) => job.title === title);
    if (exists) {
      cy.log(`✅ Job Title "${title}" already exists`);
    } else {
      cy.log(`➕ Creating Job Title "${title}"`);
      cy.visit("/web/index.php/admin/viewJobTitleList");
      cy.contains("button", "Add").click();
      cy.get('input[placeholder="Job Title"]').should("be.visible").clear().type(title);
      cy.get('textarea[placeholder="Type description here"]').type("Automation QA Engineer");
      cy.get('button[type="submit"]').contains("Save").click();
      cy.get(".oxd-toast").should("contain.text", "Successfully Saved");
    }
  });
});



//  Translation check
Cypress.Commands.add("assertTranslatedText", (key) => {
  cy.fixture("messages").then((messages) => {
    const msg = messages[key];
    const expected = msg?.target || msg?.source;

    if (!expected) {
      throw new Error(`🚨 Missing translation for key: ${key}`);
    }

    cy.contains(expected).should("be.visible");
  });
});

//  Add Vacancy directly
Cypress.Commands.add(
  "addVacancy",
  ({ jobTitle, vacancyName, hiringManager, numberOfPositions }) => {
    cy.visit("/web/index.php/recruitment/viewJobVacancy");
    cy.contains("button", "Add").click();

    cy.get(".oxd-select-text").eq(0).click();
    cy.contains(".oxd-select-option", jobTitle).click();

    cy.get('input[placeholder="Vacancy Name"]').clear().type(vacancyName);
    cy.get(".oxd-autocomplete-text-input > input").type(hiringManager);
    cy.wait(500);
    cy.contains(".oxd-autocomplete-option", hiringManager).click();

    cy.get('input[placeholder="Number of Positions"]')
      .clear()
      .type(numberOfPositions);

    cy.get('button[type="submit"]').contains("Save").click();
  }
);

// // ✅ Login using UI with session cache
// // ✅ Login using session
// Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
//   cy.session([username, password], () => {
//     cy.visit("/web/index.php/auth/login");
//     cy.get('input[name="username"]').type(username);
//     cy.get('input[name="password"]').type(password);
//     cy.get('button[type="submit"]').click();
//     cy.url().should("include", "/dashboard");
//   });
// });

// // ✅ Add Vacancy (clean and retry-safe)
// Cypress.Commands.add(
//   "addVacancy",
//   ({ jobTitle, vacancyName, hiringManager, numberOfPositions }) => {
//     cy.visit("/web/index.php/recruitment/viewVacancy");

//     cy.contains("button", "Add").should("be.visible").click();

//     // Job Title dropdown
//     cy.get(".oxd-select-text").eq(0).click();
//     cy.contains(".oxd-select-option", jobTitle).should("be.visible").click();

//     // Vacancy Name
//     cy.get('input[placeholder="Vacancy Name"]')
//       .should("be.visible")
//       .clear()
//       .type(vacancyName);

//     // Hiring Manager (auto-complete)
//     cy.get(".oxd-autocomplete-text-input > input")
//       .should("be.visible")
//       .clear()
//       .type(hiringManager);

//     cy.wait(500); // small buffer for autocomplete
//     cy.contains(".oxd-autocomplete-option", hiringManager)
//       .scrollIntoView()
//       .should("be.visible")
//       .click();

//     // Number of Positions
//     cy.get('input[placeholder="Number of Positions"]')
//       .should("be.visible")
//       .clear()
//       .type(numberOfPositions);

//     cy.get('button[type="submit"]').contains("Save").click();
//   }
// );

// // ✅ Translation Assertion (Amharic + English fallback)
// Cypress.Commands.add("assertTranslatedText", (key) => {
//   cy.fixture("messages").then((messages) => {
//     const msg = messages[key];
//     const expected = msg?.target || msg?.source;

//     if (!expected) {
//       throw new Error(`🚨 Missing translation for key: ${key}`);
//     }

//     cy.contains(expected).should("be.visible");
//   });
// });

// Cypress.Commands.add("ensureHiringManager", (fullName = "Abraham Tadese") => {
//   const [firstName, lastName] = fullName.split(" ");

//   // Step 1: Go to Add Vacancy page to trigger autocomplete
//   cy.visit("/web/index.php/recruitment/viewJobVacancy");
//   cy.contains("button", "Add").click();

//   cy.get(".oxd-autocomplete-text-input > input")
//     .should("be.visible")
//     .clear()
//     .type(fullName);

//   cy.wait(1000);

//   cy.get('div[role="listbox"]').then(($listbox) => {
//     if (
//       $listbox.find(`.oxd-autocomplete-option:contains("${fullName}")`).length >
//       0
//     ) {
//       cy.log(`✅ Hiring Manager "${fullName}" already exists`);
//     } else {
//       cy.log(`⚠️ Hiring Manager "${fullName}" not found, creating...`);
//       cy.visit("/web/index.php/pim/addEmployee");
//       cy.get('input[name="firstName"]').clear().type(firstName);
//       cy.get('input[name="lastName"]').clear().type(lastName);
//       cy.get('button[type="submit"]').contains("Save").click();
//       cy.url().should("include", "/pim/viewPersonalDetails");
//     }
//   });
// });

// // Add Hiring Manager
// Cypress.Commands.add("addHiringManager", (fullName = "Abraham Tadese") => {
//   const [firstName, lastName] = fullName.split(" ");

//   cy.visit("/web/index.php/pim/addEmployee");

//   cy.get('input[name="firstName"]')
//     .should("be.visible")
//     .clear()
//     .type(firstName);
//   cy.get('input[name="lastName"]').should("be.visible").clear().type(lastName);

//   cy.get('button[type="submit"]').contains("Save").click();

//   // Confirm we land on employee profile page
//   cy.url().should("include", "/pim/viewPersonalDetails");
// });

// // ✅ Login using UI with session cache
// Cypress.Commands.add(
//   "login",
//   (username = "Admin", password = 'admin123') => {
//     cy.session([username, password], () => {
//       cy.visit("/web/index.php/auth/login");
//       cy.get('input[name="username"]').type(username);
//       cy.get('input[name="password"]').type(password);
//       cy.get('button[type="submit"]').click();
//       cy.url().should("include", "/dashboard");
//     });
//   }
// );

// // ✅ Add Vacancy - Cleaned and Unified
// Cypress.Commands.add(
//   "addVacancy",
//   ({ jobTitle, vacancyName, hiringManager, numberOfPositions }) => {
//     cy.visit("/web/index.php/recruitment/viewVacancy");
//     cy.get(".orangehrm-header-container > .oxd-button").click();

//     cy.get(".oxd-select-text").eq(0).click();
//     cy.contains(".oxd-select-option", jobTitle).click();

//     cy.get('input[placeholder="Vacancy Name"]').clear().type(vacancyName);
//     cy.get(".oxd-autocomplete-text-input > input").type(hiringManager);
//     cy.wait(500);
//     cy.contains(".oxd-autocomplete-option", hiringManager).click();

//     cy.get('input[placeholder="Number of Positions"]')
//       .clear()
//       .type(numberOfPositions);

//     cy.get('button[type="submit"]').click();
//   }
// );

// // ✅ Translation assertion
// Cypress.Commands.add("assertTranslatedText", (key) => {
//   cy.fixture("messages").then((messages) => {
//     const msg = messages[key];
//     const expected = msg?.target || msg?.source;

//     if (!expected) {
//       throw new Error(`🚨 Missing translation for key: ${key}`);
//     }

//     cy.contains(expected).should("be.visible");
//   });
// });
