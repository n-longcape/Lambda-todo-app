'use strict';

const app = require('../../app.js')
const chai = require('chai')
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;

describe('Test Update', function () {
    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('Update successful', async () => {
        const todoId = 1
        var event = {
             body: JSON.stringify({title: 'Test Code Title', content: 'Test Content' }),
             pathParameters: {todo_id: todoId} 
            }
        const result = await app.updateHandler(event, context)
        

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
        const result = await app.updateHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(400)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('Bad request')
    })

    it('create when id not found', async () => {
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
