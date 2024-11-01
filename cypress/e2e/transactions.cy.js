// cypress/e2e/transactions.cy.js
describe('Transactions list', () => {
  it('should show the transactions', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      { fixture: 'transactions.json' }, // 👈
    );

    cy.visit('http://localhost:5173');
    cy.get('[data-cy=transaction]').should('have.length', 2);
    cy.get('[data-cy=transaction_place]').eq(0).contains('Chinees Restaurant');
    cy.get('[data-cy=transaction_date]').eq(0).should('contain', '01/10/2024');
  });

  it('should show a loading indicator for a very slow response', () => {
    cy.intercept(
      'http://localhost:9000/api/transactions', // 👈 1
      // 👇 2
      (req) => {
        req.on('response', (res) => {
          res.setDelay(1000);
        });
      },
    ).as('slowResponse'); // 👈 5
    cy.visit('http://localhost:5173'); // 👈 3
    cy.get('[data-cy=loader]').should('be.visible'); // 👈 4
    cy.wait('@slowResponse'); // 👈 6
    cy.get('[data-cy=loader]').should('not.exist'); // 👈 7
  });

  it('should show all transactions for the Irish pub', () => {
    cy.visit('http://localhost:5173');
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      { fixture: 'transactions.json' }, // 👈
    );
    cy.get('[data-cy=transactions_search_input]').type('Ir');
    cy.get('[data-cy=transactions_search_btn]').click();

    cy.get('[data-cy=transaction]').should('have.length',1);
    cy.get('[data-cy=transaction_place]').eq(0).contains(/Irish Pub/);
  });

  it('should show a message when no transactions are found', () => {
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=transactions_search_input]').type('xyz');
    cy.get('[data-cy=transactions_search_btn]').click();

    cy.get('[data-cy=no_transactions_message]').should('exist');
  });

  it('should show an error if the API call fails', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      },
    );
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=axios_error_message').should('exist');
  });
});

