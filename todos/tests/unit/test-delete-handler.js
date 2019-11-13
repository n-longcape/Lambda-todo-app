'use strict';

const app = require('../../app.js');
const chai = require('chai');
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
var event, context;


describe('Test Delete', function () {    
    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('Delete successful response', async () => {
        const todoId = 1
        var event = {
             pathParameters: {todo_id: todoId} 
            }
        const result = await app.deleteHandler(event, context)


        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(204)
    })

    it('todo not found', async () => {
        const todoId = 2
        var event = {
             pathParameters: {todo_id: todoId} 
            }
        const result = await app.deleteHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(404)
        expect(result.body).to.be.an('string')

        let response = JSON.parse(result.body)

        expect(response).to.be.an('object')
        expect(response.message).to.be.equal('Not found')
    })
});
