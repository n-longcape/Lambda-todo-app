'use strict';

const app = require('../../handlers/getTask.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Test Index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.books[1].title).to.be.equal("book2");
        // expect(response.location).to.be.an("string");
    });
});

