describe('empty spec', () => {
  // before(() => {
  //   cy.login();
  // });

  it('visits hello endpoint', () => {
    cy.request('/api/hello')
  })

  it('visits protected endpoint', () => {
    cy.login().then(() => {
      cy.request('/api/protected')
    })
  })

  it.only('accesses profile after login', () => {
    cy.login('borisbars1978@gmail.com', '123').then((r) => {
      console.log('+++LOGIN_RES', r);
      cy.request('http://localhost:3000/api/auth/me').then(({ body: user }) => {
        expect(user).to.have.property('sub');
        expect(user).to.have.property('email');
        const { sub } = user;
        expect(sub).to.be.a('string');
      });
    });
  })
})