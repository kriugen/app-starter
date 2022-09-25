describe('notes', () => {
  before(() => {
    cy.task("db:seed");
    cy.login();
    cy.visit('/notes');
  })

  it('adds note by changing title', () => {
    cy.getBySel('new-note-button').click();
    cy.getBySel('note-list-item').then((items) => {
      const itemCount = items.length;
      cy.getBySel('title').type('test note').then(() =>
      cy.getBySel('note-list-item')
        .should('have.length', itemCount + 1)
        .last().should('contain', 'test note'));
      });
  })

  it('edits note by changing title', () => {
    cy.getBySel('note-list-item')
      .first()
      .click()
      .then((item) => {
        const title = item.prop('innerText');
        cy.getBySel('title').type('23').then(() =>
        cy.getBySel('note-list-item')
          .first().should('contain', title + '23')
        )
      });
  })

  it('deletes note', () => {
    cy.getBySel('delete-note-button').should('be.disabled');
    cy.getBySel('note-list-item').first().click().then(() => {
      cy.getBySel('delete-note-button').should('be.enabled');
      cy.getBySel('note-list-item').then((items) => {
        const len = items.length;
        cy.getBySel('delete-note-button').click().then(() =>
        cy.getBySel('note-list-item').should('have.length', len - 1));
      });
    })
  })
})

export {}