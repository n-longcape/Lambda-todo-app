'use strict';

const app = require('../../handlers/update.js')
const chai = require('chai')
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;

describe('Test Update', function () {
    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('Update successful response', async () => {
        const taskId = 1
        var event = {
             body: JSON.stringify({title: 'Test Code Title', content: 'Test Content' }),
             pathParameters: {task_id: taskId} 
            }
        const result = await app.lambdaHandler(event, context)
        

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response).to.deep.equal({id: taskId, title: 'Test Code Title', content: 'Test Content' })
    })

    it('invalid parameter', async () => {
        const taskId = 1
        var event = {
             body: JSON.stringify({content: 'Test Content'}),
             pathParameters: {task_id: taskId} 
            }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('Bad request')
    })

    it('task not found', async () => {
        const taskId = 2
        var event = {
             body: JSON.stringify({title: 'Test Code Title', content: 'Test Content' }),
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

})
