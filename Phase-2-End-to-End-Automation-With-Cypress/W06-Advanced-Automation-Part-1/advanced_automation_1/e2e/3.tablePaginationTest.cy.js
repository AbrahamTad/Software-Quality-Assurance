describe("Dynamic Web Table with Pagination", () => {
  it("Should find a specific product and validate its price, with pagination", () => {
    // Step 1: Visit the target web application
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Define the product name you want to find in the table
    const productNameToFind = "Rice";

    // Define a recursive function to search for the product across paginated tables
    function searchProductOnPage() {
      // Step 2: Grab all cells in the first column (Product Names)
      cy.get("tr td:nth-child(1)")
        .each(($el, index, $list) => {
          // Get the text inside each cell
          const productText = $el.text();

          // Step 3: Check if the current product name matches the one we're looking for
          if (productText.includes(productNameToFind)) {
            // If found, get the adjacent cell in the same row (which is the Price column)
            cy.wrap($el)
              .next() // Moves to the next cell (Price cell in the same row)
              .then(($priceCell) => {
                const price = $priceCell.text(); // Extract the price text

                // Log the result to Cypress console
                cy.log(`Price of ${productNameToFind} is ${price}`);

                // Step 4: Assert the expected price (replace '37' with your expected value)
                expect(price).to.equal("37");
              });
          }

          // Step 5: After looping through all product names on the current page...
        })
        .then(($list) => {
          // Check if the product was NOT found on this page
          const productFound = $list
            .toArray()
            .some((td) => td.innerText.includes(productNameToFind));

          if (!productFound) {
            // Step 6: Try to go to the next page using the pagination control

            // Selector explanation:
            // '.pagination li.active + li a' selects the NEXT pagination link after the currently active one
            cy.get(".pagination li.active + li a").then(($next) => {
              // Check if there is a next page available
              if ($next.length > 0) {
                // Click on the next page number
                cy.wrap($next).click();

                // Wait a short moment for the new page data to load (could be replaced by proper wait)
                cy.wait(500);

                // Recursively call the same function to search the new page
                searchProductOnPage();
              } else {
                // If no more pages are available and product wasn't found
                cy.log(`${productNameToFind} not found in the table`);
              }
            });
          }
        }); // End of `.then()` block after looping through the current page
    }

    // Initial function call to start searching from the first page
    searchProductOnPage();
  }); 
}); 
