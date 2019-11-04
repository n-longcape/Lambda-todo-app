'use strict';

const app = require('../../handlers/delete.js');
const chai = require('chai');
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;


describe('Test Delete', function () {    
    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('Delete successful response', async () => {
        const taskId = 1
        var event = {
             pathParameters: {task_id: taskId} 
            }
        const result = await app.lambdaHandler(event, context)


        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(204)
    })

    it('task not found', async () => {
        const taskId = 2
        var event = {
             pathParameters: {task_id: taskId} 
            }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(404)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('Not found')
    })
});
