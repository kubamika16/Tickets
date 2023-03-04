// Required modules
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FILES TO S3 BUCKET
// Create an instance of the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-west-2',
})

// Define the function to upload files to S3
const uploadFilesToS3 = async (folder) => {
  // Read the contents of the folder
  fs.readdir(folder, (err, files) => {
    if (err) throw err
    // Loop through the files in the folder
    files.forEach((file) => {
      // Only upload JSON files
      if (path.extname(file) === '.json') {
        // Read the content of each file
        const fileContent = fs.readFileSync(`${folder}/${file}`)
        //Define the parameters for the S3 upload
        const params = {
          Bucket: 'concert-data-bucket-2023',
          Key: file,
          Body: fileContent,
        }

        //Upload the file to S3
        s3.upload(params, (err, data) => {
          if (err) throw err
        })
      }
    })
    console.log(`FILES TO S3 UPLOADED SUCCESFULLY.`)
  })
}

module.exports = { uploadFilesToS3 }
