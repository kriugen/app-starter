describe('notes', () => {
  it('checks login error if not logged in', () => {
      cy.request('/api/protected')
  })

  it.only('accesses profile after login', () => {
    cy.login().then((r) => {
      cy.request('http://localhost:3000/api/auth/me').then(({ body: user }) => {
        expect(user).to.have.property('sub');
        expect(user).to.have.property('email');
        const { sub } = user;
        expect(sub).to.be.a('string');
      });
    });
  })
})

export {}