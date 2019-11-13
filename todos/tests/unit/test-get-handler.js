'use strict';

const app = require('../../app.js');
const chai = require('chai');
const dynamoStub = require("../libs/dynamo-stub")
const expect = chai.expect;
let event, context;

describe('Test Index', function () {

    beforeEach('mock dependency', function () {
        dynamoStub.create()
    })

    it('GetAllData successful getting all data', async () => {
        event = {queryStringParameters: {} }
        const result = await app.getAllHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(4);
    });

    it('GetAllData successful title search', async () => {
        event = { queryStringParameters: { title: 'test todo'} }
        const result = await app.getAllHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(3);
    });

    it('GetAllData successful content search', async () => {
        event = { queryStringParameters: { content: 'search test'} }
        const result = await app.getAllHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(1);
    });

    it('GetAllData successful invalid parameter', async () => {
        event = { queryStringParameters: { test: 'test code request'} }
        const result = await app.getAllHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(4);
    });

    it('GetAllData successful no result', async () => {
        event = { queryStringParameters: { title: 'nothing result'} }
        const result = await app.getAllHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response.length).to.be.equal(0);
    });

    it('findData successful', async () => {
        const todoId = 1
        event = { pathParameters: {todo_id: todoId} }
        const result = await app.findHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.id).to.be.equal(todoId);
    });

    it('findData not found', async () => {
        const todoId = 9999
        event = { pathParameters: {todo_id: todoId} }
        const result = await app.findHandler(event, context)
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(404);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal('todo not found');
    });
});

