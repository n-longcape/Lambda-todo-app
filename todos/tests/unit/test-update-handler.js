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
        const todoId = 1
        var event = {
             body: JSON.stringify({title: 'Test Code Title', content: 'Test Content' }),
             pathParameters: {todo_id: todoId} 
            }
        const result = await app.lambdaHandler(event, context)
        

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response).to.deep.equal({id: todoId, title: 'Test Code Title', content: 'Test Content' })
    })

    it('invalid parameter', async () => {
        const todoId = 1
        var event = {
             body: JSON.stringify({content: 'Test Content'}),
             pathParameters: {todo_id: todoId} 
            }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('Bad request')
    })

    it('todo not found', async () => {
        const todoId = 2
        var event = {
             body: JSON.stringify({title: 'Test Code Title', content: 'Test Content' }),
             pathParameters: {todo_id: todoId} 
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
