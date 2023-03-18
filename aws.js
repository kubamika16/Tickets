// Required modules
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const ticketBucket = 'concert-data-bucket-2023'

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

// Create an instance of the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
})
AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'https://dynamodb.eu-west-2.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient()
const table = 'tickets'

// Function to fetch all items from the DynamoDB table
const getAllItems = async () => {
  const params = {
    TableName: table,
  }

  try {
    const data = await docClient.scan(params).promise()
    // console.log('Retrieved items:', JSON.stringify(data.Items, null, 2))
    return data.Items
  } catch (err) {
    console.error(
      'Unable to retrieve items. Error JSON:',
      JSON.stringify(err, null, 2),
    )
    return null
  }
}

// Example usage:
// getAllItems()

// Function to fetch all keys from the DynamoDB table
const getAllKeys = async () => {
  const items = await getAllItems()
  if (items !== null) {
    const keys = items.map((item) => item.name)
    // console.log('Retrieved keys:', JSON.stringify(keys, null, 2))
    return keys
  } else {
    console.error('Unable to retrieve keys.')
    return null
  }
}

// Example usage:
// getAllKeys()

// Function that uploads an item to the DynamoDB table
const uploadItem = async (folder, file) => {
  const item = await processFile(folder, file)
  // console.log('Processed file: ', item)

  const params = {
    TableName: table,
    Item: item,
  }

  try {
    await docClient.put(params).promise()
    console.log(`Added item with ID: ${item.name}`)
  } catch (err) {
    console.error(
      'Unable to add item. Error JSON:',
      JSON.stringify(err, null, 2),
    )
  }
}

// Function to process a single JSON file
const processFile = async (folder, file) => {
  const filePath = path.join(folder, file)
  const fileContent = await fs.promises.readFile(filePath)
  const item = JSON.parse(fileContent)
  return item
}

// Function to delete an item by its 'name' attribute
const deleteItem = async (itemName) => {
  const params = {
    TableName: table,
    Key: {
      name: itemName,
    },
  }

  try {
    await docClient.delete(params).promise()
    console.log(`Deleted item with name: ${itemName}`)
  } catch (error) {
    console.error(
      'Unable to delete item. Error JSON:',
      JSON.stringify(error, null, 2),
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main function to read the folder, filter JSON files and process each one
const dynamoDBFunction = async (folder) => {
  // File that is not in folder, but still in DynamoDB and needs to be deleted
  let deleteFile
  ////////////////////////////////////////////////////////////////////////////////
  // FOLDER
  // Reads the contents of the folder
  const concertNames = []

  const filesInFolder = await fs.promises.readdir(folder)
  // Filter onlu JSON files
  const jsonFiles = filesInFolder.filter(
    (file) => path.extname(file) === '.json',
  )
  for (const file of jsonFiles) {
    const processedFile = await processFile(folder, file)
    concertNames.push(processedFile.name)
  }
  // console.log('Name: ', concertNames)

  ////////////////////////////////////////////////////////////////////////////////
  // "TICKETS" TABLE
  const dynamoDBKeys = await getAllKeys()

  // DELETE CERTAIN FILES FROM DYNAMO DB
  for (const name of dynamoDBKeys) {
    // Sprawdź 2 tablice
    // Jeśli 'concertNames', czyli tablica z nazwami z folderu nie zawiera nazwy która znajduje się w 'getAllKeys' (tablica z nazwami z Dynamo)
    if (!concertNames.includes(name)) {
      console.log(`concertNames (items in folder) don't include ${name}`)

      // // Usunięcie Rekordu z DynamoDB
      await deleteItem(name)
    }
  }

  // UPLOAD JSON FILES TO DYNAMO DB
  for (const file of jsonFiles) {
    await uploadItem(folder, file)
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// S3
const uploadFilesToS3 = async (folder) => {
  // Read contents of the folder
  const filesInFolder = await fs.promises.readdir(folder)
  // console.log(filesInFolder)

  // List the contents of the S3 bucket
  const objectsInBucket = await s3
    .listObjectsV2({ Bucket: ticketBucket })
    .promise()

  // Extract the filenames from the S3 objects
  const filesInBucket = objectsInBucket.Contents.map((object) => object.Key)

  // Now, 3 things to do in S3 Bucket: Update existing files, add new files added in the folder, delete files that don't exist in the folder

  // Upload new files to bucket
  await Promise.all(
    filesInFolder.map(async (file) => {
      // Jeśli S3 Bucket nie zawiera pliku który jest w folderze
      if (path.extname(file) === '.json' && !filesInBucket.includes(file)) {
        // Przeczytanie pliku
        const fileContent = await fs.promises.readFile(`${folder}/${file}`)

        const params = {
          Bucket: 'concert-data-bucket-2023',
          Key: file,
          Body: fileContent,
        }
        await s3.upload(params).promise()
      }
    }),
  )

  // Delete any files in the bucket that are not in the folder
  await Promise.all(
    objectsInBucket.Contents.filter(
      (object) => !filesInFolder.includes(object.Key),
    ).map(async (object) => {
      const params = {
        Bucket: 'concert-data-bucket-2023',
        Key: object.Key,
      }
      await s3.deleteObject(params).promise()
    }),
  )

  // Update the contents of any files in the bucket that are also in the folder
  await Promise.all(
    filesInFolder.map(async (file) => {
      if (path.extname(file) === '.json' && filesInBucket.includes(file)) {
        const fileContent = await fs.promises.readFile(`${folder}/${file}`)
        const params = {
          Bucket: 'concert-data-bucket-2023',
          Key: file,
          Body: fileContent,
        }
        await s3.upload(params).promise()
      }
    }),
  )

  console.log('FILES SUCCESSFULLY UPLOADED, UPDATED, DELETED')
}

module.exports = { uploadFilesToS3, dynamoDBFunction }
