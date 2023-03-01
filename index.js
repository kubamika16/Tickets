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

const CSVtoJSONconvert = async function () {
  // const files = fs.readdirSync(pricesDirectory)
  // Check if there are any CSV files in the directory
  if (pricesFilenames.some((file) => path.extname(file) === '.csv')) {
    const pricesFilenamesFiltered = pricesFilenames.filter(
      (file) => path.extname(file) === '.csv',
    )
    await convertCSVToJSON(pricesDirectory, pricesFilenamesFiltered)
  } else {
    console.log('No CSV files found in directory')
  }
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

  await CSVtoJSONconvert()

  // // Use the map method to create a new array with modified objects
  // const modifiedPricesArray = pricesArray.map(function (arg) {
  //   // Modify the properties of the current object and return it
  //   return { minPrice: functions.findMinPrice(arg) }
  // })

  for (let i = 0; i < concertsArray.length; i++) {
    if (pricesArray[i] != undefined) {
      if (pricesArray[i][0].Section !== '') {
        concertsArray[i].availableTickets = functions.remainingTickets(
          pricesArray[i],
        )
        concertsArray[i].minPrice = functions.findMinPrice(pricesArray[i])
      } else {
        concertsArray[i].availableTickets = 0
      }
    }
  }

  console.log('Concerts Array', concertsArray)
}

printResults()

//
