'use strict'

const AWS = require("aws-sdk");
AWS.config.update({region:'ap-northeast-1'})

class Tasks {

    constructor() {
    this.table = "Tasks";
    // this.dynamodb = new AWS.DynamoDB()
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  getAllData() {
    var params = {
      TableName: this.table,
      Select: "ALL_ATTRIBUTES"
    };
    return this.dynamodb.scan(params).promise()
  }

  getData(taskId){
    const params = {
      TableName: this.table,
      Key: {
        'id': taskId
      }
    };
    return this.dynamodb.get(params).promise()
  }

  putData(task) {
    let params = {
      TableName: this.table,
      Item     : {
        'id': task.id, 
        'title': task.title, 
        'content': task.content
      }
    }
    return this.dynamodb.put(params).promise()
  }
}

module.exports = Tasks
