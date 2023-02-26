const fs = require('fs')
const path = require('path')

//////////////////////////////////////////////////////////////////////////////
// READ FILES FROM FOLDR AND PUT IT IN AN ARRAY
const filesIntoArray = async (array, folder) => {
  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(`./${folder}`, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })

    for (const file of files) {
      if (path.extname(file) === '.json') {
        let rawData = fs.readFileSync(`./${folder}/${file}`)
        let data = JSON.parse(rawData)
        array.push(data)
      }
    }

    // console.log(`The ${folder} folder has ${array.length} elements.`)
  } catch (err) {
    console.error(err)
  }
}

//////////////////////////////////////////////////////////////////////////////
// FIND MINIMUM PRICE FROM JSON OBJECT
function findMinPrice(data) {
  // Initialize a variable to store the minimum price found so far
  let minPrice = Infinity

  // Loop through each item in the data array
  data.forEach((item) => {
    // Get the 'Price Range' value for the current item
    const price = item['Price Range']

    // Check if the value starts with a "$" symbol
    if (price.startsWith('$')) {
      // If it does, extract the numeric value by slicing off the "$" symbol and converting it to a float
      const priceValue = parseFloat(price.slice(1))

      // Check if the numeric value is less than the current minimum price
      if (priceValue < minPrice) {
        // If it is, update the minimum price
        minPrice = priceValue
      }
    }
  })

  // Return the minimum price, formatted as a string with a "$" symbol
  return '$' + minPrice
}

//////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT FINDS OUT THE REMAINING AMOUNT OF TICKETS
const remainingTickets = function (data) {
  let remaining = 0

  data.forEach((arg) => {
    const number = Number(arg['# of tickets (>=0)'])
    remaining += number
  })
  return remaining
}

module.exports = { findMinPrice, filesIntoArray, remainingTickets }
