const Task = require('../models/task');

let response;
exports.lambdaHandler = async (event, context) => {
  let model = new Task()

  try {
    let request = JSON.parse(event.body)
    if (Object.keys(await model.getData(request.id)).length != 0) {
      return {
        "statusCode": 400,
        "body": JSON.stringify({ error: 'This id is already used' })
      }
    }

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
