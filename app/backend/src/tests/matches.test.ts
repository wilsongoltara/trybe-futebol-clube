import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Matches from "../database/models/MatchesModel";
import matches from "./expectResults/matches";
import matchesInProgress from "./expectResults/matchesInProgress";
import newMatch from "./expectResults/newMatch";
import statusHttp from "../utils/statusHttp";
import Teams from "../database/models/TeamsModel";
import teams from "./expectResults/teams";
import Token from "../utils/generateToken";
import Users from "../database/models/UsersModel";

chai.use(chaiHttp);

const { expect } = chai;

describe('-- Test the endpoint: "/matches":', () => {
  describe("- Request made successfully:", () => {
    beforeEach(() => sinon.stub(Matches, "findAll").resolves(matches as any));
    afterEach(sinon.restore);

    it('Get all matches and receive status "200"', async () => {
      const httpResponse = await chai.request(app).get("/matches");

      expect(httpResponse.status).to.be.equal(statusHttp.ok);
      expect(httpResponse.body).to.deep.equal(matches);
    });

    it("Post new match and receive match added in database", async () => {
      sinon.stub(Users, "findOne").resolves({
        email: "admin@admin.com",
        password: "secrect_admin",
      } as any);
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon
        .stub(Token, "generateToken")
        .resolves(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2NjEwOTczfQ.TLub2yP8JKI7NsJZkCul9AwXBpZNKoreHDcnazrY8S8"
        );
      sinon
        .stub(Teams, "findByPk")
        .onFirstCall()
        .resolves(teams[15] as any)
        .onSecondCall()
        .resolves(teams[7] as any);
      sinon.stub(Matches, "create").resolves(newMatch as any);

      const httpResponseLogin = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });

      const { token } = httpResponseLogin.body;

      const httpResponse = await chai
        .request(app)
        .post("/matches")
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set("Authorization", token);

      expect(httpResponse.status).to.be.equal(statusHttp.created);
      expect(httpResponse.body).to.deep.equal(newMatch);

      sinon.restore();
    });
  });
});

describe('-- Test the endpoint "/matches?inProgress=true":', () => {
  describe("- Request made successfully:", () => {
    beforeEach(() =>
      sinon.stub(Matches, "findAll").resolves(matchesInProgress as any)
    );
    afterEach(sinon.restore);

    it('Get matches in progress and receive status "200"', async () => {
      const httpResponse = await chai
        .request(app)
        .get("/matches?inProgress=true");

      expect(httpResponse.status).to.be.equal(statusHttp.ok);
      expect(httpResponse.body).to.deep.equal(matchesInProgress);
    });
  });
});
