const aws = require("aws-sdk-mock");
const path = require("path");
aws.setSDK(path.resolve('node_modules/aws-sdk'))

const input = {
    'id': 1,
    'title': 'test task',
    'content': 'test code content'
}

const inputsForScan = [
    input,
    {
        'id': 2,
        'title': 'test task2',
        'content': 'test code content2'
    },
    {
        'id': 3,
        'title': 'test task3',
        'content': 'test code content3'
    },
    {
        'id': 4,
        'title': 'test task4',
        'content': 'test code content4'
    }  
]

function create() {
    aws.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
        callback(null, '')
    })

    aws.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
        if (params.Key.id === 1) {
            callback(null, { Item: input })
        } else {
            callback(null, {})
        }
    })

    aws.mock('DynamoDB.DocumentClient', 'scan', function (params, callback) {

        callback(null, { Items: inputsForScan })
    })

    aws.mock('DynamoDB.DocumentClient', 'update', function (params, callback) {
        callback(null, { Attributes: { id: input.id, title: params.ExpressionAttributeValues[':title'], content: params.ExpressionAttributeValues[':content'] } })
    })

    aws.mock('DynamoDB.DocumentClient', 'delete', function (params, callback) {
        callback(null, '')
    })
}

module.exports = {
    create
}