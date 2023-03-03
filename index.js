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
}

printResults()

const objectArray = [
  {
    name: 'Pre- Show Cory Asbury VIP Ticket Add-on',
    date: 'Apr 14',
    url:
      'https://www.ticketmaster.com/pre-show-cory-asbury-vip-ticket-anderson-indiana-04-14-2023/event/05005E39E95A6042',
    availableTickets: [92, 92],
    minPrice: [42, 42],
    checkingDate: ['2/3', '3/3'],
  },
  {
    name: 'Houndmouth',
    date: 'Apr 23',
    url:
      'https://www.ticketmaster.com/houndmouth-asbury-park-new-jersey-04-23-2023/event/00005E2AEB984BA2',
    availableTickets: [0, 0],
    minPrice: [71, 71],
    checkingDate: ['2/3', '3/3'],
  },
  {
    name: 'Snow Tha Product - The Quince I Never Had Tour',
    date: 'Apr 25',
    url:
      'https://www.ticketmaster.com/snow-tha-product-the-quince-i-boston-massachusetts-04-25-2023/event/01005E3BE0737EBA',
    availableTickets: [89, 47],
    minPrice: [29.5, 29.5],
    checkingDate: ['2/3', '3/3'],
  },
]

// CHAT GPT
chatGPT = async function (apiKey) {
  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: apiKey,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Hello World!`,
    temperature: 0,
    max_tokens: 3000,
  })

  console.log(response.data.choices[0].text.trim(0))
}
// chatGPT()
