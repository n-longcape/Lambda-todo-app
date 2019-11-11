
const Task = require('../models/task');
let response;

exports.lambdaHandler = async (event, context) => {
  let model = new Task()
  let query = {}
  if(event.queryStringParameters) {
    query = event.queryStringParameters
  }
  try {
    return model.getAllData(query).then(function (res) {
      return {
        "statusCode": 200,
        "body": JSON.stringify(res.Items)
      }
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};


exports.findTaskHandler = async (event, context) => {
  let model = new Task()
  try {
    const taskId = parseInt(event.pathParameters.task_id)
    return model.getData(taskId).then(function (res) {
      return {
        "statusCode": 200,
        "body": JSON.stringify(res.Item)
      }
    });
    let request = JSON.parse(event.body)
  } catch (err) {
    console.log(err);
    return err;
  }
};