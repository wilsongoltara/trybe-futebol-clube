import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/LoginServices';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Teste the endpoint "/":', () => {
  describe('1.1 - Successful request: -', () => {
    it('Receive message "ok"', async () => {
      const httpResponse = await chai.request(app).get("/");
      expect(httpResponse.body).to.deep.equal({ ok: true });
    });
  });

});

describe("2 - Teste the error middleware:", () => {
  it('Receive status "500"', async () => {
    sinon.stub(LoginService.prototype, "login").rejects();

    const httpResponse = await chai.request(app).post("/login").send({
      email: "email@email.com",
      password: "alcalinaasl",
    });
    expect(httpResponse.status).to.be.equal(500);

    sinon.restore();
  });
});
