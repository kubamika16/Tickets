const chartContainer = document.querySelector('.chart-container')

console.log(ticketBucket)

let dataTest

async function getData() {
  const response = await fetch(
    'https://concert-data-bucket-2023.s3.eu-west-2.amazonaws.com/50+Cent+(Apr+01).json',
  )
  return await response.json()
}

getData().then((data) => {
  dataTest = data
  console.log(dataTest)
})

async function getDataTest() {
  // List the contents of the S3 bucket
  const objectsInBucket = await s3
    .listObjectsV2({ Bucket: ticketBucket })
    .promise()

  // Extract the filenames from the S3 objects
  const filesInBucket = objectsInBucket.Contents.map((object) => object.Key)
  console.log(filesInBucket)
}
getDataTest()

// let dataTest = [];

// async function getData() {
//   const files = ['50+Cent+(Apr+01).json', 'Bush+(Apr+30).json', ...];
//   const promises = files.map(async (file) => {
//     const response = await fetch(
//       `https://concert-data-bucket-2023.s3.eu-west-2.amazonaws.com/${file}`,
//     );
//     return await response.json();
//   });

//   const data = await Promise.all(promises);
//   data.forEach((d) => dataTest.push(d));
// }

// getData().then(() => {
//   console.log(dataTest);
// });

// Wyimituję obiekt który został pobrany z AWS

const awsData = [
  {
    name: 'Rico Nasty (Apr 29)',
    date: 'Apr 29',
    url:
      'https://concerts.livenation.com/rico-nasty-houston-texas-04-29-2023/event/3A005E4977A72B62',
    availableTickets: [11, 11, 6, 6],
    minPrice: [93.5, 93.5, 93.5, 93.5],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:53:48.928Z',
  },
  {
    name: 'Pote Baby & Ben Reilly (Apr 19)',
    date: 'Apr 19',
    url:
      'https://concerts.livenation.com/pote-baby-ben-reilly-los-angeles-california-04-19-2023/event/09005E5129189C6B',
    availableTickets: [344, 344, 344, 344],
    minPrice: [20, 20, 20, 20],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:54:10.206Z',
  },
  {
    name: 'Beanie Sigel plus special guest Freeway (Apr 28)',
    date: 'Apr 28',
    url:
      'https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354',
    availableTickets: [845, 845, 844, 843],
    minPrice: [37, 37, 37, 37],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:54:30.758Z',
  },
  {
    name: 'Tiffany (Apr 30)',
    date: 'Apr 30',
    url:
      'https://concerts.livenation.com/tiffany-new-orleans-louisiana-04-30-2023/event/1B005E5BEFB39EB4',
    availableTickets: [292, 292, 292, 292],
    minPrice: [29.5, 29.5, 29.5, 29.5],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:54:46.841Z',
  },
  {
    name: 'Icon for Hire (May 15)',
    date: 'May 15',
    url:
      'https://concerts.livenation.com/icon-for-hire-boston-massachusetts-05-15-2023/event/01005E5C84051272',
    availableTickets: [458, 459, 456, 454],
    minPrice: [18, 18, 18, 18],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:55:01.685Z',
  },
  {
    name: 'Forever Miles (May 19)',
    date: 'May 19',
    url:
      'https://www.ticketmaster.com/forever-miles-houston-texas-05-19-2023/event/3A005E5B80122C07',
    availableTickets: [248, 248, 248, 248],
    minPrice: [12, 12, 12, 12],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:55:23.753Z',
  },
  {
    name: 'CityWide (Apr 29)',
    date: 'Apr 29',
    url:
      'https://www.ticketmaster.com/citywide-new-york-new-york-04-29-2023/event/00005E5702367C0C',
    availableTickets: [235, 235, 235, 235],
    minPrice: [15, 15, 15, 15],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:55:41.504Z',
  },
  {
    name: 'Bastille (May 24)',
    date: 'May 24',
    url:
      'https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553',
    availableTickets: [679, 669, 664, 644],
    minPrice: [46, 46, 46, 46],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:55:59.333Z',
  },
  {
    name:
      'La Maquinaria Norteña & Los Pescadores del Rio Conchos @Rialto Theatre (Apr 23)',
    date: 'Apr 23',
    url:
      'https://www.ticketmaster.com/la-maquinaria-nortena-los-pescadores-del-tucson-arizona-04-23-2023/event/19005E5CCC883848',
    availableTickets: [1257, 1257, 1255, 1252],
    minPrice: [65, 65, 65, 65],
    checkingDate: ['8/3', '9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-08T21:56:12.090Z',
  },
  {
    name: '50 Cent (Apr 01)',
    date: 'Apr 01',
    url:
      'https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA',
    availableTickets: [55, 47, 43],
    minPrice: [95, 95, 95],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T04:57:09.327Z',
  },
  {
    name: '$NOT presents Get Busy Or Die North American Tour 2023 (May 21)',
    date: 'May 21',
    url:
      'https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989',
    availableTickets: [0, 0, 58],
    minPrice: [69, 70, 64.5],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T04:57:22.009Z',
  },
  {
    name: 'Ella Mai - The Heart On My Sleeve Tour (May 23)',
    date: 'May 23',
    url:
      'https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989',
    availableTickets: [76, 70, 68],
    minPrice: [108, 106, 106],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T04:57:33.504Z',
  },
  {
    name: "Grandson & K.Flay Present: I Love You, I'm Trying Tour (Jun 10)",
    date: 'Jun 10',
    url:
      'https://concerts.livenation.com/grandson-kflay-present-i-love-you-chicago-illinois-06-10-2023/event/04005E66C4FD2142',
    availableTickets: [764, 855, 840],
    minPrice: [39.5, 32, 32],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T14:09:33.260Z',
  },
  {
    name: 'Ella Mai - The Heart On My Sleeve Tour (Apr 30)',
    date: 'Apr 30',
    url: 'https://www.ticketmaster.com/event/0C005E67D1BB3D04',
    availableTickets: [764, 719, 680],
    minPrice: [39.5, 39.5, 39.5],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T14:09:41.714Z',
  },
  {
    name: 'Alec Benjamin (Apr 29)',
    date: 'Apr 29',
    url:
      'https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4',
    availableTickets: [1170, 1164, 1158],
    minPrice: [45, 45, 45],
    checkingDate: ['9/3', '10/3', '11/3'],
    fileCreationDate: '2023-03-09T14:09:49.046Z',
  },
  {
    name: 'Soulja Boy (May 11)',
    date: 'May 11',
    url:
      'https://concerts.livenation.com/soulja-boy-atlanta-georgia-05-11-2023/event/0E005E3AFC4564E3',
    availableTickets: [102, 121],
    minPrice: [91, 106.5],
    checkingDate: ['10/3', '11/3'],
    fileCreationDate: '2023-03-10T09:29:55.574Z',
  },
  {
    name: 'Soulja Boy (May 21)',
    date: 'May 21',
    url:
      'https://concerts.livenation.com/soulja-boy-pittsburgh-pennsylvania-05-21-2023/event/16005E4F0C757A1E',
    availableTickets: [74, 1287],
    minPrice: [73, 33],
    checkingDate: ['10/3', '11/3'],
    fileCreationDate: '2023-03-10T09:30:12.317Z',
  },
  {
    name: 'Bush (Apr 30)',
    date: 'Apr 30',
    url:
      'https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB',
    availableTickets: [8, 329],
    minPrice: [209.5, 49.5],
    checkingDate: ['10/3', '11/3'],
    fileCreationDate: '2023-03-10T09:30:27.769Z',
  },
]
awsData.forEach((arrayData, index) => {
  const canvasID = `myChart${index + 1}`
  const canvasHTML = `<div class="chart"><canvas id="${canvasID}"></canvas></div>`
  chartContainer.insertAdjacentHTML('beforeend', canvasHTML)

  const canvas = document.getElementById(canvasID)
  const ctx = canvas.getContext('2d')

  // Destroy the existing chart if it exists
  // if (canvas.chart) {
  //   canvas.chart.destroy()
  // }

  let gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(58,123,213,1')
  gradient.addColorStop(1, 'rgba(0,210,255, 0.3)')

  const labels = arrayData.checkingDate

  // let timeLeft = []

  // let checkingDates = arrayData.checkingDate

  // let concertDate = new Date(`${arrayData.date}/2023`)
  // console.log('Concert Date', concertDate)

  // for (const checkingDate of checkingDates) {
  //   const currentCheckingDate = new Date(
  //     `${checkingDate.split('/')[1]}/${checkingDate.split('/')[0]}/2023`,
  //   )
  //   while (currentCheckingDate <= concertDate) {
  //     const dateString = `${currentCheckingDate.getDate()}/${
  //       currentCheckingDate.getMonth() + 1
  //     }`
  //     timeLeft.push(dateString)
  //     currentCheckingDate.setDate(currentCheckingDate.getDate() + 1)
  //   }
  // }
  // console.log(timeLeft)
  // const labels = timeLeft

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

// getData().then(() => {
//   // console.log(dataTest)
//   // console.log(dataTest.checkingDate)
//   // console.log(dataTest.availableTickets)

//   const ctx = document.getElementById('myChart').getContext('2d')

//   // Gradient fill
//   let gradient = ctx.createLinearGradient(0, 0, 0, 400)
//   gradient.addColorStop(0, 'rgba(58,123,213,1')
//   gradient.addColorStop(1, 'rgba(0,210,255, 0.3)')

//   // X line
//   const labels = dataTest.checkingDate

//   const data = {
//     labels,
//     datasets: [
//       {
//         // Points on the array (X Line)
//         data: dataTest.availableTickets,
//         // History with name
//         label: dataTest.name,
//         fill: true,
//         backgroundColor: gradient,
//         borderColor: '#fff',
//       },
//     ],
//   }

//   // Configuration of the chart (line, circle, etc.)
//   const config = {
//     type: 'line',
//     // Passing data object
//     data: data,
//     options: {
//       radius: 5,
//       hitRadius: 100,
//       responsive: true,
//       scales: {
//         y: {
//           ticks: {
//             callback: function (value) {
//               return value + ' tickets'
//             },
//           },
//         },
//       },
//     },
//   }

//   // Object that gets 2 params (ctx, config object)
//   const myChart = new Chart(ctx, config)

//   /////////////////////////////////////////////////////////////////////////////////
//   /////////////////////////////////////////////////////////////////////////////////
//   /////////////////////////////////////////////////////////////////////////////////

//   const ctx2 = document.getElementById('myChart2').getContext('2d')

//   const data2 = {
//     labels,
//     datasets: [
//       {
//         data: dataTest.availableTickets,
//         label: 'Second Chart',
//         fill: true,
//         backgroundColor: gradient,
//         borderColor: '#fff',
//       },
//     ],
//   }

//   const config2 = {
//     type: 'line',
//     data: data2,
//     options: {
//       radius: 5,
//       hitRadius: 100,
//       responsive: true,
//       scales: {
//         y: {
//           ticks: {
//             callback: function (value) {
//               return value + ' tickets'
//             },
//           },
//         },
//       },
//     },
//   }

//   const myChart2 = new Chart(ctx2, config2)

//   /////////////////////////////////////////////////////////////////////////////////
//   /////////////////////////////////////////////////////////////////////////////////
//   /////////////////////////////////////////////////////////////////////////////////

//   const ctx3 = document.getElementById('myChart3').getContext('2d')

//   const data3 = {
//     labels,
//     datasets: [
//       {
//         data: dataTest.availableTickets,
//         label: 'Third Chart',
//         fill: true,
//         backgroundColor: gradient,
//         borderColor: '#fff',
//       },
//     ],
//   }

//   const config3 = {
//     type: 'line',
//     data: data3,
//     options: {
//       radius: 5,
//       hitRadius: 100,
//       responsive: true,
//       scales: {
//         y: {
//           ticks: {
//             callback: function (value) {
//               return value + ' tickets'
//             },
//           },
//         },
//       },
//     },
//   }

//   const myChart3 = new Chart(ctx3, config3)
// })
