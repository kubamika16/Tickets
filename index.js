//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require('fs')
const path = require('path')
const { addAbortSignal } = require('stream')
const functions = require('./functions')
const puppeteer = require('puppeteer')
const csv = require('csv-parser')

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = []

const pricesArray = []

const linksArray = []

// Directory to a folder with prices
const pricesDirectory = './prices'
const pricesFilenames = functions.sortFilesByCreationDate(pricesDirectory)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Results

const convertCSVToJSON = async (folderPath, filenames) => {
  const results = []
  for (const filename of filenames) {
    if (path.extname(filename) === '.csv') {
      const filePath = path.join(folderPath, filename)
      const fileData = fs.readFileSync(filePath, 'utf-8')
      const jsonArray = []
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => jsonArray.push(data))
          .on('end', () => {
            const jsonFilename =
              path.basename(filename, path.extname(filename)) + '.json'
            const jsonPath = path.join(folderPath, jsonFilename)
            fs.writeFileSync(jsonPath, JSON.stringify(jsonArray, null, 2))
            results.push(jsonPath)
            fs.unlink(filePath, (err) => {
              if (err) reject(err)
              else resolve()
            })
          })
          .on('error', (err) => {
            reject(err)
          })
      })
    }
  }
  console.log('Conversion complete:', results)
}

const files = fs.readdirSync(folderPath)
// Check if there are any CSV files in the directory
if (files.some((file) => path.extname(file) === '.csv')) {
  const pricesFilenames = files.filter((file) => path.extname(file) === '.csv')
  convertCSVToJSON(pricesDirectory, pricesFilenames)
} else {
  console.log('No CSV files found in directory')
}

// functions.fileNameSave(pricesDirectory, pricesFilenames)

async function printResults() {
  console.log('---------------------------------------------------------')
  console.log('---------------------------------------------------------')

  await functions.filesIntoArray(pricesArray, 'prices')
  await functions.filesIntoArray(concertsArray, 'concerts')

  concertsArray.forEach((element) => {
    linksArray.push(element['url'])
  })

  // Use the map method to create a new array with modified objects
  const modifiedPricesArray = pricesArray.map(function (arg) {
    // Modify the properties of the current object and return it
    return { minPrice: functions.findMinPrice(arg) }
  })

  // Code to find available tickets and cheapest ticket
  for (let i = 0; i < concertsArray.length; i++) {
    if (pricesArray[i] != undefined) {
      concertsArray[i].availableTickets = functions.remainingTickets(
        pricesArray[i],
      )
      concertsArray[i].minPrice = functions.findMinPrice(pricesArray[i])
    }
  }

  console.log('Concerts Array', concertsArray)
}

printResults()
