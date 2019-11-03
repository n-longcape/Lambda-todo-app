
let response;

exports.lambdaHandler = async (event, context, callback) => {
    try {
        switch (event.httpMethod) {
          case "GET":
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
            break;
          default:
            response = {
              "statusCode": 501
            }
        }
      } catch (err) {
        console.log(err);
        callback(err, null);
      }
    
      callback(null, response)
};
