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

    cy.getBySel('title').type('note 1');
    cy.wait(1000);

    const notes = cy.getBySel('note-list-item');
    notes.should('have.length', 1);
    notes.first().should('contain', 'note 1');

    // cy.get('li a').each((e, i) => {
    //   console.log('+++TEST ' + i, e.prop('outerHTML'))
    //})
  })
})

export {}