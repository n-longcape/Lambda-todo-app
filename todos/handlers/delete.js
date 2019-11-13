
const Todo = require('../models/todo');

let response;

exports.lambdaHandler = async (event, context) => {
  try {
    let model = new Todo()
    const todoId = parseInt(event.pathParameters.todo_id)

    if (Object.keys(await model.getData(todoId)).length === 0) {
      return {
        "statusCode": 404,
        "body": JSON.stringify({ message: 'Not found' })
      }
    }
    return model.deleteData(todoId).then(function (res) {
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
