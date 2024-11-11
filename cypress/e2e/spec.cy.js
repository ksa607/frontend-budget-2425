describe('General', () => {
  it('draait de applicatue', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('exist');
  });

  it('should login', () => {
    cy.login('pieter.vanderhelst@hogent.be', '12345678');
  });
});