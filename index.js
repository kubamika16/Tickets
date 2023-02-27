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

  console.log(linksArray)
}

printResults()
