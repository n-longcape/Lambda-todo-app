'use strict'

let util = require('../util')
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

        if(Object.keys(query).length > 0) {
            // カラムのフィルタリング
            for (let key in columns) {
                if (query[columns[key]]) {
                    searchColumns[[columns[key]]] = query[columns[key]];
                }
            }
        }

        // 該当検索キーがあれば絞り込みをする
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

    async putData (task) {
        let sequence = await util.getNextId(this.table);
        let nextId = sequence.Attributes.current_number
        const date = new Date()
        const microSecondTime = date.getTime()
        const params = {
            TableName: this.table,
            Item: {
                'id': nextId,
                'title': task.title,
                'content': task.content,
                'created_timestamp': Math.floor(microSecondTime / 1000)
            },
        }
        return this.docClient.put(params).promise();
    }

    updateData(taskId, task) {
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

