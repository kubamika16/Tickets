const AWS = require("aws-sdk");
// Region set as in a Lambda Function
AWS.config.update({
  region: "eu-west-2",
});
// DybamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();
// My table
const dynamoDBTableName = "product-inventory";
// Health path variable
const healthPath = "/health";
// All items path
const itemsPath = "/items";
// Single item path
const itemPath = "/item";

// Lambda will start executing code because of exports.handler
// Event param contains info about upcoming event (f.e API request data) depending on a trigger
exports.handler = async function (event) {
  console.log("Request event:", event);

  let response;

  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
  }
};

const buildResponse = function (statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};
