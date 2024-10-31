describe('mijn eerste test', () => {
  it('draait de applicatue', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('exist');
  });
});