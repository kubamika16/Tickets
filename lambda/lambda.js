// scanDynamoRecords ?

const AWS = require("aws-sdk");
// Region set as in a Lambda Function
AWS.config.update({
  region: "eu-west-2",
});
// DybamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();
// My table
const dynamoDBTableName = "tickets";
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

  // switch(true) will work as if/else statements.
  switch (true) {
    // If requested method is GET, and requested path was the health one
    case event.httpMethod === "GET" && event.path === healthPath:
      // save response variable as buildResponse function with status code 200
      // 200 means successfull HTTP status code (f.e 201 is for created, 400 for bad request, 404 not found or 500 for internal server error)
      response = buildResponse(200);
      break;
    // save response variable as getItem function that uses a ID argument which is 'name'
    case event.httpMethod === "GET" && event.path === itemPath:
      response = await getItem(event.queryStringParameters.name);
      break;
    // Same as above, but this time function that has all items will be saved in a response variable
    case event.httpMethod === "GET" && event.path === itemsPath:
      response = await getItems();
      break;
  }
  return response;
};

// Function that takes certain item from my table ('tickets')
const getItem = async function (name) {
  // Parameters needed to filter through items in the table (name of the table and certain key)
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      name: name,
    },
  };

  // Using the dynamoDB get method to read data from the table, based on parameters
  // Then returning a Promise that resolves to the item (item is read from the table) or rejects with an error
  return await dynamodb.get(params).promise.then(
    (response) => {
      // If the Promise resolves successfully (i.e., the item is read without errors)
      // build and return an HTTP response with a 200 status code and the retrieved item
      return buildResponse(200, response.Item);
    },
    (error) => {
      // If the Promise is rejected (i.e., there's an error while reading the item),
      // log the error to the console and return an undefined value
      console.error("ERROR WITH GETTING THE ITEM:", error);
    }
  );
};

// Function that retrieves all items from my dynamoDB table
const getItems = async function () {
  // Parameters needed for scan operation (name of the table)
  const params = {
    TableName: dynamoDBTableName,
  };

  // Calling the 'scanDynamoRecords' function to fetch all the items in the table
  // The getItems function asks the scanDynamoRecords function for help to get all the items because the DynamoDB scan operation might not return all the items in one go. Sometimes, when there are many items in the table, the scan operation returns only a part of the items and tells you where it stopped. This is called pagination.
  // The scanDynamoRecords function is designed to handle this pagination. It keeps looking at the items in the table, and if there are more items left to look at, it continues from where it stopped last time. This makes sure that all the items in the table are collected, even if the scan operation returns them in parts.
  // So, by asking the scanDynamoRecords function for help, the getItems function can focus on its main job, which is to get all the items from the table and send them back as a response. The scanDynamoRecords function takes care of the details related to scanning the table and handling pagination.
  const allItems = await scanDynamoRecords(params, []);

  // Creating a response body for containing the items
  const body = {
    items: allItems,
  };
  // Return the response object with a 200 status code and the items in the body
  return buildResponse(200, body);
};

// Helper function to scan DynamoDB records recursively (fetches all items in a table)
const scanDynamoRecords = async function (scanParams, itemArray) {
  try {
    // Call the scan operation in Dynamo DB table
    const dynamoData = await dynamodb.scan(scanParams).promise();

    // Concatenate the items from the current scan operation to the itemArray
    itemArray = itemArray.concat(dynamoData.Items);

    // If there's a LastEvaluatedKey, it means there are more items to fetch
    if (dynamoData.LastEvaluateKey) {
      // Update the ExclusiveStartKey to the LastEvaluateKey to continue scanning
      // (If there are more items left to look at, it remembers where it stopped and continues looking from there.)
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluateKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error("ERROR WITH SCANING DYNAMO DB RECORDS", error);
  }
};

// This funciton has a purpose to create a response object that conforms to the format expected by API Gateway
// It takes 2 arguments - statusCode and body
const buildResponse = function (statusCode, body) {
  // The function will return object with 3 properties: statusCode, headers and body
  return {
    statusCode: statusCode,
    // Headers - metadata that provide additional information about the response.
    // Headers are key-walue pairs that help both the server and the client understand how to handle a response
    headers: {
      // This indicates that the response body will be in JSON format
      "Content-Type": "application/json",
    },
    // setting 'body' property of the returned object as a JSON string
    // JSON.stringify converts a JavaScript object or value to a JSON string
    body: JSON.stringify(body),
  };
};
