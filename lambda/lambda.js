// Import the required AWS clients and packages
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb')

// Initialize the DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region: 'eu-west-2' })

// Create an instance of the DynamoDB Document Client to work with DynamoDB tables
const documentClient = DynamoDBDocument.from(dynamoDBClient)

// This is the main handler function that AWS Lambda will execute
exports.handler = async (event) => {
  // Log the received event for debugging purposes
  console.log('Received event:', JSON.stringify(event, null, 2))

  // Extract the operation and payload from the received event
  const operation = event.operation
  const payload = event.payload

  // Define a variable to hold the response object
  let response

  // Use a switch statement to handle different operations
  switch (operation) {
    case 'read':
      // Call the readItem function with the payload
      response = await readItem(payload)
      break
    default:
      // If the operation is not recognized, return an error message
      response = { error: 'Invalid operation' }
  }

  // Return the response object
  return response
}

// Function to read an item from the DynamoDB table
async function readItem(payload) {
  // Define the parameters for the documentClient.get operation
  const params = {
    TableName: payload.TableName,
    Key: payload.Key,
  }

  // Call the documentClient.get operation and return the result
  try {
    const data = await documentClient.get(params)
    return data.Item
  } catch (error) {
    console.error('Error reading item:', error)
    return { error: 'Error reading item' }
  }
}
