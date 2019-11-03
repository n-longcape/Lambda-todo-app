'use strict';

const app = require('../../handlers/delete.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Test Delete', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.result).to.be.equal("this is delete method");
        // expect(response.location).to.be.an("string");
    });
});
