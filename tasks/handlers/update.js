
const Task = require('../models/task');
let response;

exports.lambdaHandler = async (event, context) => {
  try {
    let model = new Task()
    const taskId = parseInt(event.pathParameters.task_id)
    let request = JSON.parse(event.body)

    if(!request.title || !request.content) {
      return {
        "statusCode": 400,
        "body": JSON.stringify({ message: 'Bad request' })
      }
    }


    if (Object.keys(await model.getData(taskId)).length === 0) {
      return {
        "statusCode": 404,
        "body": JSON.stringify({ message: 'Not found' })
      }
    }
    return model.updateData(taskId, JSON.parse(event.body)).then(function (res) {
      return {
        "statusCode": 200,
        "body": JSON.stringify(res.Attributes)
      }
    });
  } catch (err) {
    console.error(err)
    console.error(err.message)
    return {
      "statusCode": 500,
      "body": JSON.stringify({ message: 'Internal server error' })
    }
  }
};

