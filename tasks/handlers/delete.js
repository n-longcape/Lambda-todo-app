
const Task = require('../models/task');

let response;

exports.lambdaHandler = async (event, context) => {
  try {
    let model = new Task()
    const taskId = parseInt(event.pathParameters.task_id)

    if (Object.keys(await model.getData(taskId)).length === 0) {
      return {
        "statusCode": 404,
        "body": JSON.stringify({ message: 'Not found' })
      }
    }
    return model.deleteData(taskId).then(function (res) {
      return {
        "statusCode": 204,
      }
    });
  } catch (err) {
    console.error(err)
    return {
      "statusCode": 500,
      "body": JSON.stringify({ message: 'Internal server error' })
    }
  }
};
