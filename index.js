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

  // // Passing links of concerts for webscraping in Google Chrome
  concertsArray.forEach((element) => {
    linksArray.push(element['url'])
  })
  console.log(linksArray)
  console.log(linksArray.length)

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

  // aws.uploadFilesToS3('./concerts')
}

printResults()

// functions.chatGPT(process.env.OPEN_AI_API)

// 'https://concerts.livenation.com/rico-nasty-houston-texas-04-29-2023/event/3A005E4977A72B62',
// 'https://concerts.livenation.com/pote-baby-ben-reilly-los-angeles-california-04-19-2023/event/09005E5129189C6B',
// 'https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354',
// 'https://concerts.livenation.com/tiffany-new-orleans-louisiana-04-30-2023/event/1B005E5BEFB39EB4',
// 'https://concerts.livenation.com/icon-for-hire-boston-massachusetts-05-15-2023/event/01005E5C84051272',
// 'https://www.ticketmaster.com/forever-miles-houston-texas-05-19-2023/event/3A005E5B80122C07',
// 'https://www.ticketmaster.com/citywide-new-york-new-york-04-29-2023/event/00005E5702367C0C',
// 'https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553',
// 'https://www.ticketmaster.com/la-maquinaria-nortena-los-pescadores-del-tucson-arizona-04-23-2023/event/19005E5CCC883848'
