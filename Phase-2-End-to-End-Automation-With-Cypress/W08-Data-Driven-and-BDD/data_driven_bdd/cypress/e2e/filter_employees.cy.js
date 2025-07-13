describe("Filter Employees By Department", () => {
  it("should filter IT employees and save to a new Excel sheet", () => {
    cy.filterDepartment("IT");
  });
});
