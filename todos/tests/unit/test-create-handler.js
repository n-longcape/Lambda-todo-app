'use strict';

const app = require('../../app.js')
const chai = require('chai')
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;

describe('Test Create', function () {
    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('create successful response', async () => {
        var event = { body: JSON.stringify({ id: 2, title: 'Test Code Title', content: 'Test Content' }) }
        const result = await app.createHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(201)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(Object.keys(response).length).to.be.equal(0)
    })

})
