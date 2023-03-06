let dataTest

function getData() {
  return fetch(
    'https://concert-data-bucket-2023.s3.eu-west-2.amazonaws.com/%24NOT(2).json',
  )
    .then((response) => response.json())
    .then((data) => {
      dataTest = data
      return dataTest
    })
}

getData().then(() => {
  console.log(dataTest)
  console.log(dataTest.checkingDate)
  console.log(dataTest.availableTickets)

  const ctx = document.getElementById('myChart').getContext('2d')

  // Gradient fill
  let gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(58,123,213,1')
  gradient.addColorStop(1, 'rgba(0,210,255, 0.3)')

  // X line
  const labels = dataTest.checkingDate

  const data = {
    labels,
    datasets: [
      {
        // Points on the array (X Line)
        data: dataTest.availableTickets,
        // History with name
        label: dataTest.name,
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
  const myChart = new Chart(ctx, config)
})
