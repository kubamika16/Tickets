//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require('fs')
const path = require('path')
const { addAbortSignal } = require('stream')
const functions = require('./functions')
const puppeteer = require('puppeteer')

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = []

const pricesArray = []

const linksArray = []

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Functions
// //////////////////////////////////////////////////////////////////////////////
// // FUNCTION THAT OPENS LINKS
// async function openWebsites(websites) {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   for (let i = 0; i < websites.length; i++) {
//     await page.goto(websites[i])
//     await page.waitForTimeout(1000) // wait for a second
//   }
//   await browser.close()
// }

// Read the JSON file
let rawData = fs.readFileSync('./prices/csvjson.json')
// Parse the JSON data
let data = JSON.parse(rawData)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Results
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

  console.log('Concerts Array', concertsArray[0])

  functions.openWebsites(linksArray)
}

printResults()

// Stworzę nową tablicę o nazwie "finalPriceArray"
// Tablica będzie wynikiem pracy na tablicy "pricesArray"
// Najpierw zacznę od jednego, pierwszego rekordu
// Wywołam funkcję która weźmie obiekt i zwróci z niego minimalną cenę biletu, oraz ogólną liczbę biletów
