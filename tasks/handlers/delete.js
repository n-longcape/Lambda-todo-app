
let response;

exports.lambdaHandler = async (event, context) => {
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
        return err;
    }
    return response
};
