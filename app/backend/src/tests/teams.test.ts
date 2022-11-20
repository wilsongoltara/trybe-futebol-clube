import * as sinon from "sinon";
import * as chai from "chai";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import errorMessages from "../utils/errorMessages";
import statusHttp from "../utils/statusHttp";
import teams from "./expectResults/teams";
import Teams from "../database/models/TeamsModel";

chai.use(chaiHttp);

const { expect } = chai;

describe('-- Test the endpoint: "/teams":', () => { 
  describe("- Request made successfully:", () => {
    beforeEach(() => sinon.stub(Teams, "findAll").resolves(teams as any));
    afterEach(sinon.restore);

    it('Get all teams and receive status "200"', async () => {
      const httpResponse = await chai.request(app).get("/teams");

      expect(httpResponse.status).to.be.equal(statusHttp.ok);
      expect(httpResponse.body).to.deep.equal(teams);
    });

    
  });

  describe('-- Test the endpoint "/teams/:id":', () => {
    describe("- Request made unsuccessfully:", () => {
      beforeEach(() => sinon.stub(Teams, "findByPk").resolves(null));
      afterEach(sinon.restore);

      it('Receive status "404"', async () => {
        const httpResponse = await chai.request(app).get("/teams/20");

        expect(httpResponse.status).to.be.equal(statusHttp.notFound);
        expect(httpResponse.body).to.deep.equal({
          message: errorMessages.notFoundTeam,
        });
      });
    });

    describe("- Request made successfully:", () => {
      beforeEach(() => sinon.stub(Teams, "findByPk").resolves(teams[0] as any));
      afterEach(sinon.restore);

      it('Get team and receive status "200"', async () => {
        const httpResponse = await chai.request(app).get("/teams/1");

        expect(httpResponse.status).to.be.equal(statusHttp.ok);
        expect(httpResponse.body).to.deep.equal(teams[0]);
      });
    });
  });
});