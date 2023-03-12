// This works like a login for Access Key and Seret Access Key - data will be downloaded from these variables
const accessKey = window.prompt('Enter Access Key ID')
const secretAccessKey = window.prompt('Enter Secret Access Key ID')

const chartContainer = document.querySelector('.chart-container')
const ticketBucket = 'concert-data-bucket-2023'

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  region: 'eu-west-2',
})

const params = {
  Bucket: ticketBucket,
}

s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else {
    const files = data.Contents.map((object) => object.Key)
    console.log(files)

    const concertsArray = []

    async function getData() {
      const promises = files.map(async (file) => {
        const response = await fetch(
          `https://${ticketBucket}.s3.eu-west-2.amazonaws.com/${file}`,
        )
        return await response.json()
      })

      const data = await Promise.all(promises)
      data.forEach((data) => concertsArray.push(data))
    }

    getData().then(() => {
      console.log(concertsArray)

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
