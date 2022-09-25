describe('notes', () => {
  before(() => {
    cy.task("db:seed");
    cy.login();
    cy.visit('/notes');
  })

  it('checks UI state on load', () => {
    cy.getBySel('note-list-item').find('a')
      .first().should('have.class', 'Mui-selected');
  });

  it('adds note by clicking on new note', () => {
    cy.getBySel('note-list-item').then((items) => {
      const itemCount = items.length;
      cy.getBySel('new-note-button').click()
        .then(() => cy.getBySel('note-list-item')
          .should('have.length', itemCount + 1)
          .last().should('contain', 'Untitled'));
        });
  })

  it('adds note by changing body', () => {
    cy.getBySel('new-note-button').click();
    cy.getBySel('note-list-item').then((items) => {
      const itemCount = items.length;
      cy.getBySel('body').type('test note').then(() =>
      cy.getBySel('note-list-item')
        .should('have.length', itemCount + 1)
        .last().should('contain', 'Untitled'));
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
    cy.getBySel('note-list-item').first().click().then(() => {
      cy.getBySel('note-list-item').then((items) => {
        const len = items.length;
        cy.getBySel('delete-note-button').click().then(() =>
        cy.getBySel('note-list-item').should('have.length', len - 1));
      });
    })
  })
})

export {}