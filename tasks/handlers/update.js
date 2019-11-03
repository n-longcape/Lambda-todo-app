
let response;

exports.lambdaHandler = async (event, context, callback) => {
    try {
          response = {
            "statusCode": 200,
            "body": JSON.stringify({
              path: "update",
              result: "this is update method",
            })
          }
      } catch (err) {
        console.log(err);
        callback(err, null);
      }
    
      callback(null, response)
};

