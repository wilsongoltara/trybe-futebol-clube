import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import errorMessages from "../utils/errorMessages";
import statusHttp from "../utils/statusHttp";
import Token from "../utils/generateToken";
import Users from "../database/models/UsersModel";

chai.use(chaiHttp);

const { expect } = chai;

describe('-- Test the endpoint "/login":', () => {
  describe("- Unsuccesseful login:", () => {
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

      expect(httpResponseOnlyPassword.status).to.be.equal(
        statusHttp.badRequest
      );
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

      expect(httpResponse.status).to.be.equal(statusHttp.unauthorized);
      expect(httpResponse.body).to.deep.equal({
        message: errorMessages.incorrectFields,
      });

      sinon.restore();
    });
  });

  describe("- Successefull login:", () => {
    beforeEach(() => {
      sinon.stub(Users, "findOne").resolves({
        email: "admin@admin.com",
        password: "secrect_admin",
      } as any);
      sinon.stub(bcrypt, "compare").resolves(true);
    });
    afterEach(sinon.restore);

    it('Receive status "200"', async () => {
      const httpResponse = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });

      expect(httpResponse.status).to.be.equal(statusHttp.ok);
    });

    it("Receive the token", async () => {
      sinon.stub(Token, "generateToken").resolves("random_token");

      const httpResponse = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });

      expect(httpResponse.body).to.deep.equal({ token: "random_token" });

      sinon.restore();
    });
  });
});

describe('-- Test endpoint "/login/validate":', () => {
  describe('- Unsuccessful auth:', () => {
    it('Receive stauts "401" not token', async () => {
      const httpResponse = await chai.request(app).get('/login/validate').send();

      expect(httpResponse.status).to.be.equal(statusHttp.unauthorized);
      expect(httpResponse.body).to.deep.equal({ message: errorMessages.notFoundToken });
    });

    it('Receive status "401" invalid token', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'noToken');

      expect(httpResponse.status).to.be.equal(statusHttp.unauthorized);
      expect(httpResponse.body).to.deep.equal({ message: errorMessages.invalidToken });
    });
  });
  
  describe('- Successuful auth:', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne')
        .resolves({ email: 'admin@admin.com', password: 'secrect_admin' } as any);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(Token, 'generateToken')
        .resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY4OTAxODEyfQ.IinvYgDjVR3lu57UpxecIixOL-GSqVCjwzXfvAKdf4k')
    });
    afterEach(sinon.restore);

    it('get user role and status "200"', async () => {
      const httpResponseLogin = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const { token } = httpResponseLogin.body;

      const httpResponse = await chai.request(app).get('/login/validate')
        .send().set('Authorization', token);

      expect(httpResponse.status).to.be.equal(statusHttp.ok);
      expect(httpResponse.body).to.deep.equal({ role: 'admin' });
    });
  });
});
