// Required modules
const AWS = require('aws-sdk')
const { DocumentClient } = require('aws-sdk/clients/dynamodb')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const ticketBucket = 'concert-data-bucket-2023'

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FILES TO S3 BUCKET
// Create an instance of the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// DynamoDB
AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'https://dynamodb.eu-west-2.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
})
const docClient = new AWS.DynamoDB.DocumentClient()
const table = 'tickets'

const dynamoFunction = async function (folder) {
  const filesInFolder = await fs.promises.readdir(folder)
  for (const file of filesInFolder) {
    if (path.extname(file) === '.json') {
      const fileContent = await fs.promises.readFile(`${folder}/${file}`)
      const item = JSON.parse(fileContent)

      const params = {
        TableName: table,
        Item: item,
      }
      console.log(params)

      docClient.put(params, function (err, data) {
        if (err) {
          console.error(
            'Unable to add item. Error JSON:',
            JSON.stringify(err, null, 2),
          )
        } else {
          console.log(`Added file ${file}`)
        }
      })
    }
  }
}
dynamoFunction('./concerts')

// const params = {
//   TableName: table,
//   Item: item,
// }

// docClient.put(params, function (err, data) {
//   if (err) {
//     console.error(
//       'Unable to add item. Error JSON:',
//       JSON.stringify(err, null, 2),
//     )
//   } else {
//     console.log('Added item:', JSON.stringify(data, null, 2))
//   }
// })

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

module.exports = { uploadFilesToS3 }
