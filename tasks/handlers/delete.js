
let response;

exports.lambdaHandler = async (event, context, callback) => {
    try {
          response = {
            "statusCode": 200,
            "body": JSON.stringify({
              path: "delete",
              result: "this is delete method",
            })
          }
      } catch (err) {
        console.log(err);
        callback(err, null);
      }
      callback(null, response)
};
