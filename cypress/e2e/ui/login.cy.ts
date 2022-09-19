describe('login', () => {
  it('displays login button in not logged in', () => {
      cy.logout();
      cy.getBySel('login-button').should('exist');
  })
  
  it('displays email if logged in', () => {
    cy.login();
    cy.reload();
    cy.getBySel('appbar-open-settings').should('contain', Cypress.env('auth0Username'));
  })
})

export {}