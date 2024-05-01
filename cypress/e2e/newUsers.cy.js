import NewUsers from "../support/pages/newUsers.page";
import { faker } from "@faker-js/faker";

const pageNewUsers = new NewUsers();

describe("WEB - /USERS", () => {
  let name = faker.person.jobTitle();
  let email = faker.internet.email();

  beforeEach(() => {
    pageNewUsers.visitar();
  });

  describe("Criação de usuário - Sucesso", function () {
    it("Deve ser possível cadastrar novo usuário com sucesso", () => {
      pageNewUsers.typeName(name);
      pageNewUsers.typeEmail(email);
      pageNewUsers.buttonSalvar();
    });
  });

  describe("Criação de usuário - Erros", () => {
    it("Deve receber status de erro ao tentar registrar um usuário com os campos vazios", () => {
      // Deixei o campo de nome vazio
      // Deixei o campo de e-mail vazio
      pageNewUsers.buttonSalvar();
      pageNewUsers.failureNotice().should("be.visible").and("contain", "O campo nome é obrigatório.");
      pageNewUsers.failureNotice().should("be.visible").and("contain", "O campo e-mail é obrigatório.");
    });

    it("Deve receber status de erro ao tentar registrar número no campo nome ", () => {
      const nameWithNumber = name + "123";
      pageNewUsers.typeName(nameWithNumber);
      pageNewUsers.typeEmail(email);
      pageNewUsers.buttonSalvar();
    });

    it("Deve receber status de erro ao tentar cadastrar usuário com um nome maior de 100 caracteres", () => {
      pageNewUsers.typeName(name.repeat(21));
      pageNewUsers.typeEmail(email);
      pageNewUsers.buttonSalvar();
      pageNewUsers.failureNotice().should("be.visible");
    });

    it("Deve receber status de erro ao tentar cadastrar usuário com um nome contendo símbolos", () => {
      cy.visit("/users/novo");
      const nameWithSymbols = name + "!@#$%";
      pageNewUsers.typeName(nameWithSymbols);
      pageNewUsers.typeEmail(email);
      pageNewUsers.buttonSalvar();

      cy.contains("Formato do nome é inválido.").should("be.visible");
    });

    it("Deve receber status de erro ao tentar cadastrar usuário com um e-mail com mais de 60 caracteres", () => {
      pageNewUsers.typeName(name);
      pageNewUsers.typeEmail(
        "qwertyuiopasdfghjklzxcvbnmmnbvcxzlkjhgfdsapoiuytrewqzxcvbnmas@gmail.com"
      );
      pageNewUsers.buttonSalvar();
      pageNewUsers.failureNotice().should("be.visible");
    });

    it("Deve receber status de erro ao tentar cadastrar usuário com um nome menor de 4 caracteres", () => {
      const shortName = "ana";
      pageNewUsers.typeName(shortName);
      pageNewUsers.typeEmail(email);
      pageNewUsers.buttonSalvar();
      pageNewUsers.failureNotice().should("be.visible");
    });
  });
});
