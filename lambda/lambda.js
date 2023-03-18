// Import the AWS SDK to interact with AWS services
const AWS = require('aws-sdk')

// Create an instance of the DynamoDB Document Client to work with DynamoDB tables
const documentClient = new AWS.DynamoDB.DocumentClient()

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
    case 'create':
      // Call the createItem function with the payload
      response = await createItem(payload)
      break
    case 'read':
      // Call the readItem function with the payload
      response = await readItem(payload)
      break
    case 'update':
      // Call the updateItem function with the payload
      response = await updateItem(payload)
      break
    case 'delete':
      // Call the deleteItem function with the payload
      response = await deleteItem(payload)
      break
    default:
      // If the operation is not recognized, return an error message
      response = { error: 'Invalid operation' }
  }

  // Return the response object
  return response
}

// Function to create an item in the DynamoDB table
async function createItem(payload) {
  // Define the parameters for the documentClient.put operation
  const params = {
    TableName: payload.TableName,
    Item: payload.Item,
  }

  // Call the documentClient.put operation and return the result
  try {
    await documentClient.put(params).promise()
    return { result: 'Item created' }
  } catch (error) {
    console.error('Error creating item:', error)
    return { error: 'Error creating item' }
  }
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
    const data = await documentClient.get(params).promise()
    return data.Item
  } catch (error) {
    console.error('Error reading item:', error)
    return { error: 'Error reading item' }
  }
}

// Function to update an item in the DynamoDB table
async function updateItem(payload) {
  // Define the parameters for the documentClient.update operation
  const params = {
    TableName: payload.TableName,
    Key: payload.Key,
    UpdateExpression: payload.UpdateExpression,
    ExpressionAttributeValues: payload.ExpressionAttributeValues,
    ReturnValues: 'UPDATED_NEW',
  }

  // Call the documentClient.update operation and return the result
  try {
    const data = await documentClient.update(params).promise()
    return data.Attributes
  } catch (error) {
    console.error('Error updating item:', error)
    return { error: 'Error updating item' }
  }
}
// Function to delete an item from the DynamoDB table
async function deleteItem(payload) {
  // Define the parameters for the documentClient.delete operation
  const params = {
    TableName: payload.TableName,
    Key: payload.Key,
  }

  // Call the documentClient.delete operation and return the result
  try {
    await documentClient.delete(params).promise()
    return { result: 'Item deleted' }
  } catch (error) {
    console.error('Error deleting item:', error)
    return { error: 'Error deleting item' }
  }
}
