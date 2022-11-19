import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import teams from "./expectResults/teams";
import Teams from "../database/models/TeamsModel";

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the endpoint: "/teams":', () => { 
  describe("Request made successfully:", () => {
    beforeEach(() => sinon.stub(Teams, "findAll").resolves(teams as any));
    afterEach(sinon.restore);

    it('Get all teams and receive status "200"', async () => {
      const httpResponse = await chai.request(app).get("/teams");

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(teams);
    });
  });
});