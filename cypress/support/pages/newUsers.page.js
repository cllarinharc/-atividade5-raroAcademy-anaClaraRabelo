class NewUsers {
  visitar() {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo");
  }
  typeName(name) {
    cy.get("#name").clear().type(name);
  }
  typeEmail(email) {
    cy.get("#email").clear().type(email);
  }
  buttonSalvar() {
    cy.get(".sc-kpDqfm").click();
  }
  failureNotice() {
    return cy.get(".sc-cPiKLX");
  }
}

export default NewUsers;
