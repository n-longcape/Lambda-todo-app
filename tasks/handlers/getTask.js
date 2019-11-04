
let response;

exports.lambdaHandler = async (event, context) => {
  try {
    response = {
      "statusCode": 200,
      "body": JSON.stringify({
        books: [{
          title: "ああ",
          content: "category1"
        }, {
          title: "book2",
          content: "タスク２"
        }]
      })
    }
  } catch (err) {
    console.log(err);
    return err;
  }
  return response;
};
