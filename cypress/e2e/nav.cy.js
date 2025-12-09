describe("Navigation Test", () => {
  it("Navigates to second page", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Go to Second Page").click();

    cy.url().should("include", "/secondPage");

    cy.contains("This is the second page");
  });
});
