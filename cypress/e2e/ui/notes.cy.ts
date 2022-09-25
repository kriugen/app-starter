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
      cy.getBySel('title').type('test note');
      cy.wait(1000);

      cy.getBySel('note-list-item')
        .should('have.length', itemCount + 1)
        .last().should('contain', 'test note');
      });
  })

  it('edits note by changing title', () => {
    cy.getBySel('note-list-item')
      .first()
      .click()
      .then((item) => {
        const title = item.prop('innerText');
        cy.getBySel('title').type('23');
        cy.wait(1000);

        cy.getBySel('note-list-item')
          .first().should('contain', title + '23');
        });
  })
})

export {}