'use strict'

const AWS = require('aws-sdk')
const columns = ["title", "content"]

module.exports = class Task {
    constructor() {
        this.table = 'Tasks';
        const endpoint = process.env.DYNAMODB_ENDPOINT
        const config = endpoint ? { endpoint } : { region: 'ap-northeast-1' }
        this.docClient = new AWS.DynamoDB.DocumentClient(config);
    }

    getAllData(query = {}) {
        let params = {
            TableName: this.table,
        }
        
        let searchColumns = []

        // フィルタリング
        for(let key in columns) {
            if(query[columns[key]]) {
                searchColumns[[columns[key]]] = query[columns[key]];
            }
        }

        if(Object.keys(searchColumns).length > 0) {
            Object.assign(params, this.createAttributeParameter(searchColumns))
        } else {
            params.Select = 'ALL_ATTRIBUTES'
        }

        return this.docClient.scan(params).promise()
    }

    getData(taskId) {
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
        let updateExpression = 'set';
        const params = {
            TableName: this.table,
            Key: {
                'id': taskId,
            },
            UpdateExpression: "set #title = :title, #content = :content",
            ExpressionAttributeNames: {
                "#title": "title",
                "#content": "content"
            },
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

    createAttributeParameter(searchColumns) {
        let filterExpressions = []
        let expressionAttributeNames = {}
        let expressionAttributeValues = {}
        // 検索のパラメーター作成
        for(let key in searchColumns) {
            filterExpressions.push("contains(#" + key + ", :" + key + ")")
            expressionAttributeNames["#" + key] = key
            expressionAttributeValues[":" + key] = searchColumns[key]
        }
        return {
            FilterExpression: filterExpressions.join(' AND '),
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues
        }
    }
}

