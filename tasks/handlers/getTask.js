
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
      let itemsResponse = [];
      for (key in res.Items) {
        itemsResponse.push(formatResponse(res.Items[key])) 
      }
      itemsResponse.sort(function(a, b) {
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

exports.findTaskHandler = async (event, context) => {
  let model = new Task()
  try {
    const taskId = parseInt(event.pathParameters.task_id)
    return model.getData(taskId).then(function (res) {
      // 空の場合
      if(Object.keys(res).length <= 0) {
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
  "body": JSON.stringify({message: 'task not found'})
  }
}