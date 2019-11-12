
const AWS = require('aws-sdk')

exports.getNextId = function (tableName) {
    const endpoint = process.env.DYNAMODB_ENDPOINT
    const config = endpoint ? { endpoint } : { region: 'ap-northeast-1' }
    const docClient = new AWS.DynamoDB.DocumentClient(config);
    const params = {
        TableName: 'Sequences',
        Key: {
            'name': tableName
        },
        UpdateExpression: "add #current_number :i",
        ExpressionAttributeNames: { "#current_number": "current_number" },
        ExpressionAttributeValues: { ':i': 1 },
        ReturnValues: 'UPDATED_NEW'
    }
    return docClient.update(params).promise()
}