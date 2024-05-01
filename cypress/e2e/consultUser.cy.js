describe("Consultar um usuário", () => {
  it("Deve ser possível localizar usuário pelo nome", () => {
    const nameUser = "anac";

    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");

    cy.request(
      "GET",
      "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users"
    ).then((response) => {
      expect(response.status).to.eq(200);
      const usersList = response.body;
      const userFound = usersList.find((user) => user.name === nameUser);

      expect(userFound).to.exist;
      expect(userFound.id).to.be.a("string");
      expect(userFound.name).to.eq(nameUser);

      cy.get(".sc-gsFSXq.mUpIH").should("exist").type(nameUser);
      cy.get(".sc-eeDRCY").should("exist");
    });
  });
});
