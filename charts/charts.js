////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Variables

// This works like a login for Access Key and Seret Access Key - data will be downloaded from these variables
const accessKey = window.prompt('Enter Access Key ID')
const secretAccessKey = window.prompt('Enter Secret Access Key ID')

const chartContainer = document.querySelector('.chart-container')
const ticketBucket = 'concert-data-bucket-2023'

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// S3 Connection
const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  region: 'eu-west-2',
})
const params = {
  Bucket: ticketBucket,
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Pobranie wszystkich plików z S3 bucket
s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else {
    // Zapisanie w tablicy nazw plików w s3. Nazwy potrzebne do przeczytania zawartości plików
    const fileNames = data.Contents.map((object) => object.Key)
    console.log(fileNames)

    // Utworzenie końcowej tablicy wyników
    const concertsArray = []

    // Funkcja która pozwala wyciągnąć dane z s3
    async function getData() {
      // Pobranie z tablicy 'fileNames' nazw a na nich fetch (request to a remote server (in this case, an Amazon S3 bucket) to retrieve a JSON file)
      const promises = fileNames.map(async (file) => {
        const response = await fetch(
          `https://${ticketBucket}.s3.eu-west-2.amazonaws.com/${file}?t=${Date.now()}`,
        )
        // const responseText = await response.text()

        // const isErrorResponse = responseText.startsWith('<?xml')

        // if (isErrorResponse) {
        //   console.error('Error response:', responseText)
        // } else {
        //   const responseData = JSON.parse(responseText)
        //   // Process the JSON data as needed
        //   console.log(responseData)
        // }
        return await response.json()
      })

      // The Promise.all() method is called on the promises array, which waits for all the promises in the array to resolve
      //  (i.e., for all the JSON files to be retrieved and parsed)
      // and returns a new promise that resolves to an array of the results.
      const data = await Promise.all(promises)

      data.forEach((data) => concertsArray.push(data))
    }

    //then() method takes a callback function that logs the concertsArray to the console when the Promise is resolved.
    getData().then(() => {
      console.log(concertsArray)

      // I wreszcie praca na danych 'concertsArray'
      concertsArray.forEach((arrayData, index) => {
        const canvasID = `myChart${index + 1}`
        const canvasHTML = `<div class="chart"><canvas id="${canvasID}"></canvas></div>`
        chartContainer.insertAdjacentHTML('beforeend', canvasHTML)

        const canvas = document.getElementById(canvasID)
        const ctx = canvas.getContext('2d')

        let gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(58,123,213,1')
        gradient.addColorStop(1, 'rgba(0,210,255, 0.3)')

        const labels = arrayData.checkingDate

        const data = {
          labels,
          datasets: [
            {
              // Points on the array (X Line)
              data: arrayData.availableTickets,
              // History with name
              label: arrayData.name,
              fill: true,
              backgroundColor: gradient,
              borderColor: '#fff',
            },
          ],
        }

        // Configuration of the chart (line, circle, etc.)
        const config = {
          type: 'line',
          // Passing data object
          data: data,
          options: {
            radius: 5,
            hitRadius: 100,
            responsive: true,
            scales: {
              y: {
                ticks: {
                  callback: function (value) {
                    return value + ' tickets'
                  },
                },
              },
            },
          },
        }

        // Object that gets 2 params (ctx, config object)
        const chart = new Chart(ctx, config)
        // canvas.chart = chart
      })
    })
  }
})
