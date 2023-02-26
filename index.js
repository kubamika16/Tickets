//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require('fs')
const path = require('path')
const { addAbortSignal } = require('stream')
const functions = require('./functions')

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = []

const pricesArray = []

const allData = []

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Functions

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
  console.log('---------------------------------------------------------')
  console.log('---------------------------------------------------------')
  console.log('---------------------------------------------------------')
  await functions.filesIntoArray(pricesArray, 'prices')
  await functions.filesIntoArray(concertsArray, 'concerts')
  //   console.log(concertsArray[0])
  //   console.log(pricesArray[0])
  //   console.log(functions.findMinPrice(data))

  functions.mergeArray(concertsArray, pricesArray, allData)
  console.log(allData[0])
}

printResults()

// Dodać informacje na temat
