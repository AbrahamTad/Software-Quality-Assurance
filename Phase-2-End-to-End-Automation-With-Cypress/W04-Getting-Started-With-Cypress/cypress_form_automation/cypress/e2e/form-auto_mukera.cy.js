// cypress/e2e/form-auto_mukera.cy.js

describe("Business Registration Form Automation", () => {
  it("fills and submits the form with valid data", () => {
    cy.visit("https://form.jotform.com/242354571450554");

    // Fill the form
    cy.get("#first_4").type("James");
    cy.get("#last_4").type("Bond");
    cy.get("#input_6").type("Bond Company");
    cy.get("#input_12_full").type("(000) 000-0000");
    cy.get("#input_5").type("jbond@example.com");

    cy.get("#input_3_addr_line1").type("123 London Street");
    cy.get("#input_3_addr_line2").type("Apt 2");
    cy.get("#input_3_city").type("London");
    cy.get("#input_3_state").type("Maryland");
    cy.get("#input_3_postal").type("20902");

    cy.get("#input_11").select("Store");
    cy.get("#input_8").type("This is a sample text.");
    cy.get("#input_14").click();

    // After redirect to submit.jotform.com, change thank you message
    cy.origin("https://submit.jotform.com", () => {
      cy.document().then((doc) => {
        // Optional: wait until the thank you page loads
        setTimeout(() => {
          const thankYouHeader = doc.querySelector("h1");
          const thankYouText = doc.querySelector(".thankYouText");

          if (thankYouHeader) {
            thankYouHeader.textContent = "አመሰግናለሁ!";
          }

          if (thankYouText) {
            thankYouText.textContent = " መረጃዎ ተቀብሏል።";
          }

          // Add extra banner on top (optional)
          const messageDiv = doc.createElement("div");
          messageDiv.innerHTML = `
              <div style="
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: #4caf50;
                color: white;
                padding: 16px 32px;
                font-size: 18px;
                border-radius: 8px;
                z-index: 9999;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              ">
                መልእክትዎ ተሳክቷል። አመሰግናለሁ!
              </div>
            `;
          doc.body.appendChild(messageDiv);
        }, 2000); // wait a moment to ensure content is rendered
      });
    });
  });
});
