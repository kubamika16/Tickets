//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// ONLY FOR GOOGLE CHROME

// FUNCTION THAT OPENS LINKS
// links.forEach((link) => {
//   window.open(link, '_blank')
// })

const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

//////////////////////////////////////////////////////////////////////////////
// READ FILES FROM FOLDR AND PUT IT IN AN ARRAY (SORTED)
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

    // Sort files by creation time
    const sortedFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(folder, file)
        const { birthtime } = await fs.promises.stat(filePath)
        return { name: file, birthtime }
      }),
    ).then((filesWithBirthtimes) =>
      filesWithBirthtimes.sort(
        (a, b) => a.birthtime.getTime() - b.birthtime.getTime(),
      ),
    )

    // Push files into array in sorted order
    for (const file of sortedFiles) {
      if (path.extname(file.name) === '.json') {
        let rawData = fs.readFileSync(`./${folder}/${file.name}`)
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
    if (typeof price !== 'undefined') {
      if (price.startsWith('$')) {
        // If it does, extract the numeric value by slicing off the "$" symbol and converting it to a float
        const priceValue = parseFloat(price.slice(1))

        // Check if the numeric value is less than the current minimum price
        if (priceValue < minPrice) {
          // If it is, update the minimum price
          minPrice = priceValue
        }
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

//////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT SAVES FILE NAMES IN THE ARRAY
const fileNameSave = function (directory, array) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err)
      return
    }

    files.forEach((file) => {
      if (file.endsWith('.csv')) {
        array.push(file)
      }
    })

    console.log(array)
  })
}

// Sort out files in the folder by date of creation
const sortFilesByCreationDate = (folderPath) => {
  const files = fs.readdirSync(folderPath)

  return files
    .filter((file) => !file.startsWith('.'))
    .map((file) => ({
      name: file,
      time: fs.statSync(path.join(folderPath, file)).ctime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)
    .map((file) => file.name)
}

module.exports = {
  findMinPrice,
  filesIntoArray,
  remainingTickets,
  fileNameSave,
  sortFilesByCreationDate,
}
