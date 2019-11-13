const todo = require('../models/todo');

let response;
exports.lambdaHandler = async (event, context) => {
  let model = new todo()

  try {
    let request = JSON.parse(event.body)
    return model.putData(JSON.parse(event.body)).then(function (res) {
      return {
        "statusCode": 201,
        "body": JSON.stringify({})
      }
    });
  } catch (err) {
    console.error(err)
    return {
      "statusCode": 500,
      "body": JSON.stringify({ message: 'internal server error' })
    }
  }
};
