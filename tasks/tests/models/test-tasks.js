const aws = require("aws-sdk-mock");
const path = require("path");
const uuid = require('uuid')
const input = {
    'id': uuid.v1(),
    'title': 'test task',
    'content': 'test code content'
}
const tasks = require("../../models/tasks");
const chai = require('chai');
const expect = chai.expect;

aws.setSDK(path.resolve('node_modules/aws-sdk'))

describe('Get Task Test', function() {

    this.timeout(0)

    beforeEach(function() {
        aws.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
            callback(null, 'successfully put item in database')
        })

        aws.mock('DynamoDB.DocumentClient', 'get', function(params, callback) {
            callback(null, { Item: { id : params.Key.id, title : input.title, content : input.content } })
        })

        aws.mock('DynamoDB.DocumentClient', 'scan', function(params, callback) {
            callback(null, { Item: [{ id : input.id, title : input.title, content : input.content }] })
        })


        aws.mock('DynamoDB.DocumentClient', 'update', function(params, callback) {
            callback(null, { Item: { id : input.id, title : 'change task title', content : 'change task content' } })
        })

        aws.mock('DynamoDB.DocumentClient', 'delete', function(params, callback) {
            callback(null, 'successfully delete item in database')
        })

        taskObj = new tasks()
    })

    it('getAllData', function(done) { 
        taskObj.getAllData().then(function(res) {
            expect(res.Item[0]).to.deep.equal(input)
          done()
        })
    })

    it('putData', function(done) { 
        taskObj.putData(input).then(function(res) {
          expect(res).to.be.equal('successfully put item in database')
          done()
        })
    })
    
    it('getData', function(done) {
        taskObj.getData(input.id).then(function(res) {
          expect(res.Item).to.deep.equal(input)
          done()
        })
    })

    it('updateData', function(done) {
        let updateParams = {
            title: 'change task title',
            content: 'change task content'
        }

        const expected = {
            id: input.id,
            title: 'change task title',
            content: 'change task content'
        }
        taskObj.updateData(input.id, updateParams).then(function(res) {
          expect(res.Item).to.deep.equal(expected)
          done()
        })
    })

    it('deleteData', function(done) {
        taskObj.deleteData(input.id).then(function(res) {
          expect(res).to.be.equal('successfully delete item in database')
          done()
        })
    })

})