
let response;

exports.lambdaHandler = async (event, context, callback) => {
    try {
          response = {
            "statusCode": 200,
            "body": JSON.stringify({
              path: "create",
              result: "this is create method",
            })
          }
      } catch (err) {
        console.log(err);
        callback(err, null);
      }
    
      callback(null, response)
};
