const aws = require("aws-sdk-mock");
const path = require("path");
const todo = require("../../models/todo");
const chai = require('chai');
const expect = chai.expect;
const dynamoStub = require("../libs/dynamo-stub")
const input = {
    'id': 1,
    'title': 'test todo',
    'content': 'test code content'
}

aws.setSDK(path.resolve('node_modules/aws-sdk'))

describe('Get Todo Test', function () {

    this.timeout(0)

    beforeEach(function () {
        dynamoStub.create();
        todoObj = new todo()
    })

    it('getAllData full scan', function (done) {
        todoObj.getAllData({}).then(function (res) {
            let items = res.Items
            expect(items[0]).to.deep.equal(input)
            expect(items.length).to.be.equal(4);
            done()
        })
    })

    it('getAllData title search', function (done) {
        todoObj.getAllData({title: "test todo2"}).then(function (res) {
            let expected = {id: 2, title: "test todo2", content:"test code content2"}
            let items = res.Items
            expect(items[0]).to.deep.equal(expected)
            expect(items.length).to.be.equal(1);
            done()
        })
    })

    it('getAllData content search', function (done) {
        todoObj.getAllData({content:"test code content2"}).then(function (res) {
            let expected = {id: 2, title: "test todo2", content:"test code content2"}
            let items = res.Items
            expect(items[0]).to.deep.equal(expected)
            expect(items.length).to.be.equal(1);
            done()
        })
    })

    it('putData', function (done) {
        todoObj.putData(input).then(function (res) {
            expect(res).to.be.equal('')
            done()
        })
    })

    it('getData', function (done) {
        todoObj.getData(input.id).then(function (res) {
            expect(res.Item).to.deep.equal(input)
            done()
        })
    })

    it('updateData', function (done) {
        let updateParams = {
            title: 'change todo title',
            content: 'change todo content'
        }

        const expected = {
            id: input.id,
            title: 'change todo title',
            content: 'change todo content'
        }
        todoObj.updateData(input.id, updateParams).then(function (res) {
            expect(res.Attributes).to.deep.equal(expected)
            done()
        })
    })

    it('deleteData', function (done) {
        todoObj.deleteData(input.id).then(function (res) {
            expect(res).to.be.equal('')
            done()
        })
    })

})