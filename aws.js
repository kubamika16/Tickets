// Required modules
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')

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

// const uploadFilesToS3 = (folder) => {
//   // Czytanie folderu asynchronicznie
//   // Read the contents of the folder asynchronously
//   fs.readdir(folder, async (err, files) => {
//     if (err) throw err
//     // Use async.eachLimit to upload files to S3 in parallel with a limit of 5 files at a time
//     // By limiting the number of parallel iterations to 5, we ensure that we don't overwhelm the system with too many simultaneous uploads. This can help improve the performance and reliability of the code
//     await async.eachLimit(files, 5, async (file) => {
//       // Only upload json files
//       if (path.extname(file) === '.json') {
//         // Read content of each file asynchronously
//         const fileContent = await fs.promises.readFile(`${folder}/${file}`)

//         // Define the parameters for S3 upload
//         const params = {
//           Bucket: 'concert-data-bucket-2023',
//           Key: file,
//           Body: fileContent,
//         }

//         await s3.upload(params).promise()
//       }
//     })
//     console.log('FILES TO S3 UPLOADED SUCCESSFULLY')
//   })
// }

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
