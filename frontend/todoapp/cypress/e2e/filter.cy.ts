describe('input filter', () => {
  it('focus on input using parent block', () => {
    cy.visit('/');
    cy.get('app-filter').click();
    cy.get('app-filter').find('input').should("be.focused");
  });

  it('clear filter using clear button', () => {
    cy.visit('/');
    cy.get('app-filter').find('input').type("random filter {enter}");
    cy.get('app-filter').find('input').next().click().prev().should('be.empty');
  });
});