// cypress/e2e/addTransaction.cy.js
describe('Add and remove transaction', () => {
  it('should add a transaction', () => {
    cy.visit('http://localhost:5173/transactions/add');

    cy.get('[data-cy=user_input]').type(2); 
    cy.get('[data-cy=date_input]').type('2024-08-01'); 
    cy.get('[data-cy=place_input]').select(3); 
    cy.get('[data-cy=amount_input]').type('200');
    cy.get('[data-cy=submit_transaction]').click(); 

    cy.get('[data-cy=transaction_user]').eq(9).contains('Pieter');
    cy.get('[data-cy=transaction_amount]').eq(9).contains('200');
    cy.get('[data-cy=transaction_user]').should('have.length', 10);
  });

  it('should remove the transaction', () => {
    cy.visit('http://localhost:5173/transactions/'); 
    cy.get('[data-cy=transaction_remove_btn]').eq(9).click(); 
    cy.get('[data-cy=transaction]').should('have.length', 9); 
  });
});
