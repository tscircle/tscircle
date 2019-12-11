import {UserController} from "../controllers/userController";
import "mocha";
import {expect} from 'chai';

const request = require("supertest");
const chai = require("chai");
const userCtr = new UserController();
const app = userCtr.setupAPIHandler();

const USERDATA = {
    ExtUserId: 13711,
    FirstName: 'Henrik',
    LastName: 'Lippke',
    Birthday: 500947200,
    Nationality: 'DE',
    CountryOfResidence: 'DE',
    Email: 'h.lippke@exporo.com',
    Address: {
        AddressLine1: 'Am Sandtorkai 70',
        City: 'Hamburg',
        PostalCode: '20457',
        Country: 'DE',
    }
};

describe("user controller tests", () => {
    describe("user creation", () => {
        it("#POST should add a user, return 200 code", async () => {
            const response = await request(app)
                .post("/internal/user")
                .send(USERDATA)
                .expect(201);

            const data = JSON.parse(response.text);
            expect(data).to.have.property('mangopay_user_id').that.not.be.empty;
        });
    });
});
