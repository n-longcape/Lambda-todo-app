'use strict';

const app = require('../../handlers/getTask.js');
const chai = require('chai');
const stub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;

describe('Test Index', function () {

    beforeEach('mock dependency', function () {
        stub.create()
    })

    it('GetAllData successful response', async () => {
        const result = await app.lambdaHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(4);
    });
});

