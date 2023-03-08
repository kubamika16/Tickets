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
const aws = require('./aws')

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = []
const pricesArray = []
const linksArray = []

// For example 4/3 - Fourth of march
todaysDate = functions.dateFunction()
// console.log(todaysDate)

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

  const prajsowaTablica = await functions.csvToObject('prices')
  console.log('Prajsowa Tablica:', prajsowaTablica)

  // Zwrócenie tablicy z posortowanymi plikami JSON folderu 'concerts'
  const concertowaTablica = await functions.jsonToObject('concerts')
  // console.log(concertowaTablica)

  // Put data into 2 array from folders (Prices and Concerts) sorted by the time of creation
  // await functions.filesIntoArray(pricesArray, 'prices')
  // await functions.filesIntoArray(concertsArray, 'concerts')

  // // // Passing links of concerts for webscraping in Google Chrome
  concertowaTablica.forEach((element) => {
    linksArray.push(element['url'])
  })
  // console.log(linksArray)
  console.log(linksArray.length)

  // Function that checks if there are any CSV files in the prices folder. If they are, then it changes them into JSON file
  // if (pricesFilenames.some((file) => path.extname(file) === '.csv')) {
  //   const pricesFilenamesFiltered = pricesFilenames.filter(
  //     (file) => path.extname(file) === '.csv',
  //   )
  //   await functions.convertCSVToJSON(pricesDirectory, pricesFilenamesFiltered)
  // } else {
  //   console.log('No CSV files found in directory')
  // }

  // Adding data to arrays (availableTickets, minPrice, checkingDate)

  for (let i = 0; i < concertowaTablica.length; i++) {
    // Sprawdzenie ostatniego argumentu dotyczącego dodania daty (5/3 albo 10/3 itp.)
    const lastCheck =
      concertowaTablica[i].checkingDate[
        concertowaTablica[i].checkingDate.length - 1
      ]

    // Jeśli dane które chcemy dodać są takie same jak ostatnie dane
    // Czyli w momencie gdy dane są dodawane, zostaje sprawdzenie

    // Jeśli istnieją date na temat ceny (są zdefiniowane),
    // oraz gdy dzisiejsza data jest różna tej która była sprawdzo
    // Oraz jeśli klucz 'Section' posiada jakąkolwiek wartość (zdaża się że nie posiada, czyli '')
    // Czyli jeśli wszystko jest ok, można pracować na danych
    if (
      prajsowaTablica[i] != undefined &&
      todaysDate !== lastCheck &&
      prajsowaTablica[i][0].Section !== ''
    ) {
      concertowaTablica[i].checkingDate.push(todaysDate)
      concertowaTablica[i].availableTickets.push(
        functions.remainingTickets(prajsowaTablica[i]),
      )
      concertowaTablica[i].minPrice.push(
        functions.findMinPrice(prajsowaTablica[i]),
      )

      // Logic that helps to overrite JSON file with data about tickets
      const updatedJson = JSON.stringify(concertowaTablica[i])
      // console.log(`updatedJson[${i}]`, updatedJson)
      fs.writeFileSync(functions.concertDataPath[i], updatedJson, 'utf-8')
    }
  }

  // for (let i = 0; i < concertsArray.length; i++) {
  //   const lastCheck =
  //     concertsArray[i].checkingDate[concertsArray[i].checkingDate.length - 1]
  //   // If file exists/if something is undefined, or todays date differs from previous date in the array
  //   if (pricesArray[i] != undefined && todaysDate !== lastCheck) {
  //     if (pricesArray[i][0].Section !== '') {
  //       // Adding prices data to concerts array
  //       concertsArray[i].checkingDate.push(todaysDate)
  //       concertsArray[i].availableTickets.push(
  //         functions.remainingTickets(pricesArray[i]),
  //       )
  //       concertsArray[i].minPrice.push(functions.findMinPrice(pricesArray[i]))
  //       console.log(`ConcertsArray[${i}]`, concertsArray[i])

  //       // Logic that helps to overrite JSON file with data about tickets
  //       const updatedJson = JSON.stringify(concertsArray[i])
  //       console.log(`updatedJson[${i}]`, updatedJson)
  //       fs.writeFileSync(functions.concertsFileNames[i], updatedJson, 'utf-8')
  //     } else {
  //       concertsArray[i].availableTickets.push(0)
  //     }
  //   }
  // }

  // console.log('Concerts Array', concertsArray)

  console.log(`Concertowa Tablica`, concertowaTablica)

  // aws.uploadFilesToS3('./concerts')
}

printResults()

// functions.chatGPT(process.env.OPEN_AI_API)
