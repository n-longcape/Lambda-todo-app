class Tasks {
    constructor() {
    this.table = "todo-app";
    this.dynamodb = new AWS.DynamoDB.DocumentClient({
      region: "ap-northeast-1"
    });
  }

  getData(taskId){
    const params = {
      TableName: this.table,
      Key: {
        id: taskId
      }
    };
    return new Promise((resolve, reject) => {
      this.dynamodb.get(params, (err, data) => {
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          return resolve(data.Item);
        }
      });
    });
  }
}