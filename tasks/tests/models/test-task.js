const aws = require("aws-sdk-mock");
const path = require("path");
const task = require("../../models/task");
const chai = require('chai');
const expect = chai.expect;
const dynamoStub = require("../libs/dynamo-stub")
const input = {
    'id': 1,
    'title': 'test task',
    'content': 'test code content'
}

aws.setSDK(path.resolve('node_modules/aws-sdk'))

describe('Get Task Test', function () {

    this.timeout(0)

    beforeEach(function () {
        dynamoStub.create();
        taskObj = new task()
    })

    it('getAllData full scan', function (done) {
        taskObj.getAllData({}).then(function (res) {
            let items = res.Items
            expect(items[0]).to.deep.equal(input)
            expect(items.length).to.be.equal(4);
            done()
        })
    })

    it('getAllData title search', function (done) {
        taskObj.getAllData({title: "test task2"}).then(function (res) {
            let expected = {id: 2, title: "test task2", content:"test code content2"}
            let items = res.Items
            expect(items[0]).to.deep.equal(expected)
            expect(items.length).to.be.equal(1);
            done()
        })
    })

    it('getAllData content search', function (done) {
        taskObj.getAllData({content:"test code content2"}).then(function (res) {
            let expected = {id: 2, title: "test task2", content:"test code content2"}
            let items = res.Items
            expect(items[0]).to.deep.equal(expected)
            expect(items.length).to.be.equal(1);
            done()
        })
    })

    it('putData', function (done) {
        taskObj.putData(input).then(function (res) {
            expect(res).to.be.equal('')
            done()
        })
    })

    it('getData', function (done) {
        taskObj.getData(input.id).then(function (res) {
            expect(res.Item).to.deep.equal(input)
            done()
        })
    })

    it('updateData', function (done) {
        let updateParams = {
            title: 'change task title',
            content: 'change task content'
        }

        const expected = {
            id: input.id,
            title: 'change task title',
            content: 'change task content'
        }
        taskObj.updateData(input.id, updateParams).then(function (res) {
            expect(res.Attributes).to.deep.equal(expected)
            done()
        })
    })

    it('deleteData', function (done) {
        taskObj.deleteData(input.id).then(function (res) {
            expect(res).to.be.equal('')
            done()
        })
    })

})