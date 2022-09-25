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

  it('displays login error if not logged in visiting protected area', () => {
    cy.logout();
    cy.visit('/notes');
    cy.location("pathname").should("eq", "/notes");
    cy.getBySel('login-error').should('exist');
  })
})

export {}