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

  it.only('adds note by changing title', () => {
    cy.task("db:seed");
    cy.login();
    cy.visit('/notes');
    cy.getBySel('new-note-button').should('exist');

    cy.getBySel('note-list-item').then((e) => {
      const itemCount = e.length;
      cy.getBySel('title').type('test note');
      cy.wait(1000);

      cy.getBySel('note-list-item')
        .should('have.length', itemCount + 1)
        .last().should('contain', 'test note');
    });
  })
})

export {}