'use strict'

const AWS = require("aws-sdk");
AWS.config.update({region:'ap-northeast-1'})

class Tasks {

    constructor() {
        this.table = "Tasks";
        // this.dynamodb = new AWS.DynamoDB()
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    getAllData() {
        const params = {
            TableName: this.table,
            Select: "ALL_ATTRIBUTES"
        };
        return this.docClient.scan(params).promise()
    }

    getData(taskId){
        const params = {
            TableName: this.table,
            Key: {
                'id': taskId
            }
        };
        return this.docClient.get(params).promise()
    }

    putData(task) {
        const params = {
            TableName: this.table,
            Item: {
                'id': task.id,
                'title': task.title,
                'content': task.content
            }
        }
        return this.docClient.put(params).promise()
    }

    updateData(taskId, task) {
        const params = {
            TableName: this.table,
            Key: {
                'id': taskId,
            },
            UpdateExpression: "set title = :title, content=:content",
            ExpressionAttributeValues: {
                ':title': task.title,
                ':content': task.content
            },
            ReturnValues: 'ALL_NEW'
        }
        return this.docClient.update(params).promise()
    }

    deleteData(taskId) {
        const params = {
            TableName: this.table,
            Key: {
                'id': taskId,
            }
        }
        return this.docClient.delete(params).promise()
    }
}

module.exports = Tasks
