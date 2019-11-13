const Todo = require('./models/todo');

let response;

exports.getAllHandler = async (event, context) => {
  let model = new Todo()
  let query = {}
  if (event.queryStringParameters) {
    query = event.queryStringParameters
  }
  try {
    return model.getAllData(query).then(function (res) {
      let itemsResponse = [];
      for (key in res.Items) {
        itemsResponse.push(formatResponse(res.Items[key]))
      }
      itemsResponse.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      })
      return {
        "statusCode": 200,
        "body": JSON.stringify(itemsResponse)
      }
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.findHandler = async (event, context) => {
  let model = new Todo()
  try {
    const todoId = parseInt(event.pathParameters.todo_id)
    return model.getData(todoId).then(function (res) {
      // 空の場合
      if (Object.keys(res).length <= 0) {
        return notFoundResponse()
      }

      return {
        "statusCode": 200,
        "body": JSON.stringify(res.Item)
      }
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.createHandler = async (event, context) => {
  let model = new Todo()

  try {
    let request = JSON.parse(event.body)
    return model.putData(request).then(function (res) {
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

exports.updateHandler = async (event, context) => {
  try {
    let model = new Todo()
    const todoId = parseInt(event.pathParameters.todo_id)
    let request = JSON.parse(event.body)

    if (!request.title || !request.content) {
      return {
        "statusCode": 400,
        "body": JSON.stringify({ message: 'Bad request' })
      }
    }

    // IDが存在しなければ新規作成を行う
    if (Object.keys(await model.getData(todoId)).length === 0) {
      return model.putData(JSON.parse(event.body)).then(function (res) {
        return {
          "statusCode": 201,
          "body": JSON.stringify({})
        }
      });
    } else {
      return model.updateData(todoId, JSON.parse(event.body)).then(function (res) {
        return {
          "statusCode": 200,
          "body": JSON.stringify(res.Attributes)
        }
      });
    }
  } catch (err) {
    console.error(err)
    console.error(err.message)
    return {
      "statusCode": 500,
      "body": JSON.stringify({ message: 'Internal server error' })
    }
  }
};

exports.deleteHandler = async (event, context) => {
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

function formatResponse(item) {
  console.log(item)
  return {
    'id': item.id,
    'title': item.title,
    'content': item.content
  }
}

function notFoundResponse() {
  return {
    "statusCode": 404,
    "body": JSON.stringify({ message: 'todo not found' })
  }
}


