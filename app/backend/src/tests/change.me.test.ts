import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/LoginServices';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste the endpoint "/"', () => {
  describe('successful request', () => {
    it('receive message "ok"', async () => {
      const httpResponse = await chai.request(app).get("/");
      expect(httpResponse.body).to.deep.equal({ ok: true });
    });
  });

  describe("Teste the error middleware", () => {
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
});

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
