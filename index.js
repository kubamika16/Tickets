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

// DATE
const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
todaysDate = `${day}/${month}`

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

  // ------------------------------------------------------------------------
  // HERE
  // Pliki w folderze 'concerts' są już zapisane w formacie JSON.
  // Plik powinien posiadać jeden z trzech tablic, ponieważ będzie ona dodana w funkcji którą wykorzystuję w Google Chrome
  // Teraz funkcja która dodaje liczbę dostępnych biletów, cenę biletu i datę sprawdzenia do danego obiektu.
  // Jeśli występuje już dzisiejsza data, wtedy dane nie powinny dodawać się kolejny raz

  // const concert = {
  //   name: 'Arca',
  //   date: 'Feb 25',
  //   url:
  //     'https://concerts.livenation.com/arca-los-angeles-california-02-25-2023/event/09005E31DF2854E2',
  //   availableTickets: [],
  //   minPrice: [],
  //   checkingDate: [],
  // }
  // console.log('CONCERT:', concert)

  concertsArray.forEach((element) => {
    linksArray.push(element['url'])
  })
  console.log(linksArray)

  await CSVtoJSONconvert()

  // Adding data to arrays (availableTickets, minPrice, checkingDate)
  for (let i = 0; i < concertsArray.length; i++) {
    // If file exists/if something is undefined, or todays date differs from previous date in the array
    if (
      pricesArray[i] != undefined &&
      todaysDate !==
        concertsArray[i].checkingDate[concertsArray[i].checkingDate.length - 1]
    ) {
      if (pricesArray[i][0].Section !== '') {
        concertsArray[i].checkingDate.push(todaysDate)
        concertsArray[i].availableTickets.push(
          functions.remainingTickets(pricesArray[i]),
        )
        concertsArray[i].minPrice.push(functions.findMinPrice(pricesArray[i]))

        // Logic that helps to overrite JSON file with data about tickets
        const updatedJson = JSON.stringify(concertsArray[i])
        fs.writeFileSync(functions.concertsFileNames[i], updatedJson, 'utf-8')
      } else {
        concertsArray[i].availableTickets.push(0)
      }
    }
  }

  console.log('Concerts Array', concertsArray)
}

printResults()

// DODAĆ nazwę pliku w obiekcie. Będzie łatwiej usunąć dany plik
// Chciałbym usunąć dany rekord gdy już go nie potrzebuję
// Muszę po prostu usunąć dany plik. Jeśli jest to możliwe, stworzę dodatkową komendę która uruchamia tą funkcję (delete '[NAME OF CONCERT]'). So cool.
// Jeśli plik zostanie usunięty, wtedy przy kolejnym sprawdzaniu biletów program będzie działał w oparciu o pliki w folderze 'concerts'.
