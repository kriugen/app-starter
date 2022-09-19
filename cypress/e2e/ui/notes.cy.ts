describe('notes', () => {
  it('displays login error if not logged in', () => {
      cy.logout();
      cy.visit('/notes');
      cy.location("pathname").should("eq", "/notes");
      cy.getBySel('login-error').should('exist');
  })

  it('displays notes list if logged in', () => {
    cy.login();
    cy.visit('/notes');
    cy.getBySel('new-note-button').should('exist');
  })
})

export {}