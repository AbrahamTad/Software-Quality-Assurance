// Install required plugin: npm install --save-dev cypress-file-upload
// Add to cypress/support/e2e.js: import 'cypress-file-upload';

describe("Imgbb Image Upload Test", () => {
  const testImage = "example.jpg"; // Image in fixtures folder
  const UPLOAD_URL = "https://imgbb.com/";

  it("Successfully uploads image and generates shareable link", () => {
    // Navigate to upload page
    cy.visit(UPLOAD_URL);

    // Handle cookie consent if it appears
    cy.get("body").then(($body) => {
      if ($body.find(".gdpr-modal").length) {
        cy.get(".gdpr-agree").click();
      }
    });

    // Attach test image to hidden file input
    cy.fixture(testImage, "binary").then((fileContent) => {
      const blob = Cypress.Blob.binaryStringToBlob(fileContent);
      const testFile = new File([blob], testImage, { type: "image/jpeg" });
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      cy.get('input[type="file"]').then(($input) => {
        $input[0].files = dataTransfer.files;
        cy.wrap($input).trigger("change", { force: true });
      });
    });

    // Submit upload form
    cy.get("form").submit();

    // Verify upload success
    cy.url({ timeout: 20000 }).should("include", "/image/");
    cy.get(".image-viewer", { timeout: 20000 }).should("be.visible");
    cy.get('[data-scl="copy-link"]').should("be.visible");
    cy.get(".textarea-copy")
      .invoke("val")
      .should("match", /https:\/\/i\.ibb\.co\/\w+\/example\.jpg/);
  });
});
