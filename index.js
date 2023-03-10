//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require('fs')
const functions = require('./functions')
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

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Results
async function printResults() {
  console.log('---------------------------------------------------------')
  console.log('---------------------------------------------------------')

  // Zwrócenie tablicy z posortowanymi plikami JSON z folderu 'prices'
  const pricesArray = await functions.csvToObject('prices')
  // console.log('Prajsowa Tablica:', pricesArray)

  // Zwrócenie tablicy z posortowanymi plikami JSON folderu 'concerts'
  const concertsArray = await functions.jsonToObject('concerts')
  // console.log(concertsArray)

  // Passing links of concerts for webscraping in Google Chrome
  concertsArray.forEach((element) => {
    linksArray.push(element['url'])
  })
  // console.log(linksArray)
  // console.log(linksArray.length)

  // Praca na każdym obiekcie tablicy z koncertami. To właśnie do tych obiektów dodaje się dane i zapisuje się zmiany
  for (let i = 0; i < concertsArray.length; i++) {
    // Sprawdzenie ostatniego argumentu dotyczącego dodania daty (5/3 albo 10/3 itp.)
    const lastCheck =
      concertsArray[i].checkingDate[concertsArray[i].checkingDate.length - 1]

    // Jeśli istnieją date na temat ceny (są zdefiniowane),
    // oraz gdy dzisiejsza data jest różna tej która była sprawdzo
    // Oraz jeśli klucz 'Section' posiada jakąkolwiek wartość (zdaża się że nie posiada, czyli '')
    // Czyli jeśli wszystko jest ok, można pracować na danych
    if (
      pricesArray[i] != undefined &&
      todaysDate !== lastCheck &&
      pricesArray[i][0].Section !== ''
    ) {
      // Dodanie dzisiejszej daty do obiektu na temat koncertu
      concertsArray[i].checkingDate.push(todaysDate)

      // Dodanie liczby pozostałych biletów do obiektu na temat koncertu (bilety 'primary', nie 'resale')
      concertsArray[i].availableTickets.push(
        functions.remainingTickets(pricesArray[i]),
      )

      // Dodanie minimalnej ceny biletu do obiektu na temat koncertu
      concertsArray[i].minPrice.push(functions.findMinPrice(pricesArray[i]))

      // Zamiana obiektu na JSON
      const updatedJson = JSON.stringify(concertsArray[i])
      // Nadpisanie nowymi danymi danego pliku
      fs.writeFileSync(functions.concertDataPath[i], updatedJson, 'utf-8')
    }
  }

  // console.log(`Concertowa Tablica`, concertsArray)

  // Praca z AWS
  const awsWorkload = function () {
    // aws.uploadFilesToS3('./concerts')
  }
  awsWorkload()
}

printResults()

// functions.chatGPT(process.env.OPEN_AI_API)
