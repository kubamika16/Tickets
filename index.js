//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require('fs')
const path = require('path')
// const { addAbortSignal } = require('stream')
const functions = require('./functions')
// const puppeteer = require('puppeteer')
// const csv = require('csv-parser')

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = []
const pricesArray = []
const linksArray = []

// For example 4/3 - Fourth of march
todaysDate = functions.dateFunction()

// Directory to a folder with prices
const pricesDirectory = './prices'
const pricesFilenames = functions.sortFilesByCreationDate(pricesDirectory)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Results
async function printResults() {
  console.log('---------------------------------------------------------')
  console.log('---------------------------------------------------------')

  // Put data into 2 array from folders (Prices and Concerts) sorted by the time of creation
  await functions.filesIntoArray(pricesArray, 'prices')
  await functions.filesIntoArray(concertsArray, 'concerts')

  // Passing links of concerts for webscraping in Google Chrome
  concertsArray.forEach((element) => {
    linksArray.push(element['url'])
  })
  console.log(linksArray)

  // Function that checks if there are any CSV files in the prices folder. If they are, then it changes them into JSON file
  if (pricesFilenames.some((file) => path.extname(file) === '.csv')) {
    const pricesFilenamesFiltered = pricesFilenames.filter(
      (file) => path.extname(file) === '.csv',
    )
    await functions.convertCSVToJSON(pricesDirectory, pricesFilenamesFiltered)
  } else {
    console.log('No CSV files found in directory')
  }

  // Adding data to arrays (availableTickets, minPrice, checkingDate)
  for (let i = 0; i < concertsArray.length; i++) {
    const lastCheck =
      concertsArray[i].checkingDate[concertsArray[i].checkingDate.length - 1]
    // If file exists/if something is undefined, or todays date differs from previous date in the array
    if (pricesArray[i] != undefined && todaysDate !== lastCheck) {
      if (pricesArray[i][0].Section !== '') {
        // Adding prices data to concerts array
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
