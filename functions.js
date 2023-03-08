const fs = require('fs')
const path = require('path')
// const puppeteer = require('puppeteer')
const csv = require('csv-parser')
const csvToJson = require('csvtojson')

const concertsFileNames = []
const concertDataPath = []

const csvToObject = async function (folder) {
  // Files are being red by the function (FILE READER)
  const files = await new Promise((resolve, reject) => {
    fs.readdir(`./${folder}`, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files.filter((file) => path.extname(file) === '.csv'))
      }
    })
  })
  console.log(files)

  // Logika która zwraca posortowane już obiekty JSON z plików CSV
  const jsonFiles = await Promise.all(
    // Praca na tablicy plików (a raczej na nazwach tablic plików, np. [ 'exportPrices (1).csv', 'exportPrices (2).csv', 'exportPrices.csv' ])
    files.map(async (file) => {
      // Pobranie ścieżki danego pliku
      const filePath = `./${folder}/${file}`
      // Przeczytanie pliku CSV
      const fileData = await fs.promises.readFile(filePath, 'utf8')
      // Zamiana pliku CSV na JSON
      const jsonArray = await csvToJson().fromString(fileData)
      // Przeczytanie statystyk pliku CSV (potrzebne do pobrania czasu utworzenia pliku)
      const fileStats = await fs.promises.stat(filePath)
      // Dodanie do pliku JSON zmiennej czasu utworzenia pliku
      jsonArray.fileCreationDate = fileStats.birthtime.toISOString()

      return jsonArray
    }),
  )

  // Posortowanie obiektów danych w końcowej tablicy
  const sortedPricesData = jsonFiles.sort((a, b) =>
    a.fileCreationDate.localeCompare(b.fileCreationDate),
  )

  return sortedPricesData
}

// JSON Into Array of objects| 1. Read files | 2. Sort Files (by creation date)
const jsonToObject = async function (folder) {
  // Files are being red by the function (FILE READER)
  const files = await new Promise((resolve, reject) => {
    fs.readdir(`./${folder}`, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files.filter((file) => path.extname(file) === '.json'))
      }
    })
  })

  const concertData = await Promise.all(
    // Praca na każdym obiekcie z Tablicy 'files'
    files.map(async (file) => {
      // Zapisanie ścieżki pliku
      const filePath = `./${folder}/${file}`
      // czytanie pliku JSON
      const fileData = await fs.promises.readFile(filePath, 'utf8')
      // Zamiana pliku JSON na obiekt
      const concert = JSON.parse(fileData)
      // Zwrócenie obiektu (już nie JSON), żeby można było na nim przeprowadzić zmiany
      return concert
    }),
  )

  // Posortowanie obiektów danych w końcowej tablicy
  const sortedConcertData = concertData.sort((a, b) =>
    a.fileCreationDate.localeCompare(b.fileCreationDate),
  )

  sortedConcertData.forEach((element) => {
    concertDataPath.push(`./${folder}/${element.name}.json`)
  })
  console.log('concertDataPath', concertDataPath)

  // // Push name of files from "concerts folder". I need it because to overrite JSON file with an object I need a name of file
  // if (folder === 'concerts') {
  //   sortedFiles.forEach((element) => {
  //     if (path.extname(element.name) === '.json')
  //       concertsFileNames.push(`./${folder}/${element.name}`)
  //   })
  //   console.log('concertsFileNames', concertsFileNames)
  // }

  // Zwrócenie końcowego wyniku (posortowane dane)
  return sortedConcertData
}

//////////////////////////////////////////////////////////////////////////////
// READ FILES FROM FOLDR AND PUT IT IN AN ARRAY (SORTED)
const filesIntoArray = async (array, folder) => {
  try {
    // Files are being red by the function (FILE READER)
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

    // Push name of files from "concerts folder". I need it because to overrite JSON file with an object I need a name of file
    if (folder === 'concerts') {
      sortedFiles.forEach((element) => {
        if (path.extname(element.name) === '.json')
          concertsFileNames.push(`./${folder}/${element.name}`)
      })
      console.log('concertsFileNames', concertsFileNames)
    }

    // Push files into array in sorted order
    for (const file of sortedFiles) {
      if (path.extname(file.name) === '.json') {
        let rawData = fs.readFileSync(`./${folder}/${file.name}`)
        let data = JSON.parse(rawData)
        array.push(data)
      }
    }
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
  return minPrice
}

//////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT FINDS OUT THE REMAINING AMOUNT OF TICKETS
const remainingTickets = function (data) {
  let remaining = 0
  data.forEach((arg) => {
    if (arg.Type !== 'resale') {
      const number = Number(arg['# of tickets (>=0)'])
      remaining += number
    }
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
  })
}

//////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////
// CURRENT DATE (f.e 4/3 - fourth of march)
const dateFunction = function () {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${day}/${month}`
}

const isoDate = function () {
  const isoDate = new Date().toISOString().slice(0, 10)
  return isoDate
}

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
    temperature: 1,
    max_tokens: 3000,
  })

  console.log(response.data.choices[0].text.trim(0))
}

module.exports = {
  findMinPrice,
  filesIntoArray,
  remainingTickets,
  fileNameSave,
  sortFilesByCreationDate,
  concertsFileNames,
  dateFunction,
  convertCSVToJSON,
  chatGPT,
  jsonToObject,
  csvToObject,
  isoDate,
  concertDataPath,
}
