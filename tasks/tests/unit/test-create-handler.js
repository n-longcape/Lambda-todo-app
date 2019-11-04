'use strict';

const app = require('../../handlers/create.js')
const chai = require('chai')
const stub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;

describe('Test Create', function () {
    beforeEach('mock dependency', function () {
        stub.create()
    })

    it('create successful response', async () => {
        var event = { body: JSON.stringify({ id: 2, title: 'Test Code Title', content: 'Test Content' }) }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(201)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(Object.keys(response).length).to.be.equal(0)
    })

    it('task id alredy exist', async () => {
        var event = { body: JSON.stringify({ id: 1, title: 'Test Code Title', content: 'Test Content' }) }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('This id is already used')
    })

})
