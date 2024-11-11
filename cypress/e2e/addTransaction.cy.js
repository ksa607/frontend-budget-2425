describe('Add and remove transaction', () => {

  beforeEach(() => {
    cy.login('pieter.vanderhelst@hogent.be', '12345678');
  });

  it('should add a transaction', () => {
    cy.visit('http://localhost:5173/transactions/add');

    cy.get('[data-cy=date_input]').type('2024-08-01');
    cy.get('[data-cy=place_input]').select(3);
    cy.get('[data-cy=amount_input]').type('200');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_transaction]').click();

    cy.get('[data-cy=transaction_user]').eq(3).contains('Pieter');
    cy.get('[data-cy=transaction_amount]').eq(3).contains('200');
    cy.get('[data-cy=transaction_user]').should('have.length', 4);
  });

  it('should remove the transaction', () => {
    cy.visit('http://localhost:5173/transactions/'); 
    cy.get('[data-cy=transaction_remove_btn]').eq(3).click(); 
    cy.get('[data-cy=transaction]').should('have.length', 3); 
  });

  it('should show the error message for an invalid amount', () => {
    cy.visit('http://localhost:5173/transactions/add');

    cy.get('[data-cy=date_input]').type('2024-08-01');
    cy.get('[data-cy=place_input]').select(3);
    cy.get('[data-cy=amount_input]').type('0');
    cy.get('[data-cy=amount_input]').blur();
    cy.get('[data-cy=submit_transaction]').click();

    cy.get('[data-cy=label_input_error]').contains('0 is not a valid amount');
  });
});
