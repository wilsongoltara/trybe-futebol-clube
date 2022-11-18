import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Users from "../database/models/UsersModel";
import errorMessages from "../utils/errorMessages";
import statusHttp from "../utils/statusHttp";

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the endpoint "/login":', () => {
  describe('Unsuccesseful login:', () => {
    it('Without password field: receive status "400"', async () => {
      const httpResponseOnlyEmail = await chai
        .request(app)
        .post("/login")
        .send({
          email: "test@test.com",
        });

      expect(httpResponseOnlyEmail.status).to.be.equal(statusHttp.badRequest);
      expect(httpResponseOnlyEmail.body).to.deep.equal({
        message: errorMessages.allFields,
      });
    });

    it('Without password field: receive status "400"', async () => {
      const httpResponseOnlyPassword = await chai
        .request(app)
        .post("/login")
        .send({
          password: "admin@admin.com",
        });

      expect(httpResponseOnlyPassword.status).to.be.equal(statusHttp.badRequest);
      expect(httpResponseOnlyPassword.body).to.deep.equal({
        message: errorMessages.allFields,
      });
    });

    it('Invalid email field: receive status "401"', async () => {
      sinon.stub(Users, "findOne").resolves(null);

      const httpResponse = await chai.request(app).post("/login").send({
        email: "teste@teste.com",
        password: "secret_admin",
      });

      expect(httpResponse.status).to.be.equal(statusHttp.unauthorized);
      expect(httpResponse.body).to.deep.equal({
        message: errorMessages.incorrectFields,
      });

      sinon.restore();
    });

    it('Invalid password field: receive status "401"', async () => {
      sinon.stub(Users, "findOne").resolves({
        email: "admin@admin.com",
        password: "ndpoakdjnkasdasd",
      } as any);

      const httpResponse = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "teste_teste",
      });

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({
        message: errorMessages.incorrectFields,
      });

      sinon.restore();
    });
  });
});
