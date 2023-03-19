const AWS = require('aws-sdk')
// Region set as in a Lambda Function
AWS.config.update({
  region: 'eu-west-2',
})
// DybamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient()
// My table
const dynamoDBTableName = 'tickets'
// Health path variable
const healthPath = '/health'
// All items path
const itemsPath = '/items'
// Single item path
const itemPath = '/item'

// Lambda will start executing code because of exports.handler
// Event param contains info about upcoming event (f.e API request data) depending on a trigger
exports.handler = async function (event) {
  console.log('Request event:', event)

  let response

  // switch(true) will work as if/else statements.
  switch (true) {
    // If requested method is GET, and requested path was the health one
    case event.httpMethod === 'GET' && event.path === healthPath:
      // save response variable as buildResponse function with status code 200
      // 200 means successfull HTTP status code (f.e 201 is for created, 400 for bad request, 404 not found or 500 for internal server error)
      response = buildResponse(200)
      break
    // save response variable as getItem function that uses a ID argument which is 'name'
    case event.httpMethod === 'GET' && event.path === itemPath:
      response = await getItem(event.queryStringParameters.name)
      break
    // Same as above, but this time function that has all items will be saved in a response variable
    case event.httpMethod === 'GET' && event.path === itemsPath:
      response = await getItems()
      break
  }
  return response
}

// Function that takes certain item from my table ('tickets')
const getItem = async function (name) {
  // Parameters needed to filter through items in the table (name of the table and certain key)
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      name: name,
    },
  }

  // Using the dynamoDB get method to read data from the table, based on parameters
  // Then returning a Promise that resolves to the item (item is read from the table) or rejects with an error
  return await dynamodb.get(params).promise.then(
    (response) => {
      // If the Promise resolves successfully (i.e., the item is read without errors)
      // build and return an HTTP response with a 200 status code and the retrieved item
      return buildResponse(200, response.Item)
    },
    (error) => {
      // If the Promise is rejected (i.e., there's an error while reading the item),
      // log the error to the console and return an undefined value
      console.error('ERROR WITH GETTING THE ITEM:', error)
    },
  )
}

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
      'Content-Type': 'application/json',
    },
    // setting 'body' property of the returned object as a JSON string
    // JSON.stringify converts a JavaScript object or value to a JSON string
    body: JSON.stringify(body),
  }
}
