////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT DOWNLOADS DATA FROM GOOGLE CHROME WEBSITE

// Get the name of the event
const eventName = document.querySelector('.event-header__event-name-text')
  .innerText

// Get the date of the event (with only the day and month)
const eventDate = document
  .querySelector('.event-header__event-date')
  .textContent.trim()
const dateArray = eventDate.split('•').map((str) => str.trim())
const eventMonthDay = dateArray[1]

// Get the link to the event page
const eventUrl = window.location.href

// Create an object with the event details
const eventDetails = {
  name: `${eventName} (${eventMonthDay})`,
  date: eventMonthDay,
  url: eventUrl,
  availableTickets: [],
  minPrice: [],
  checkingDate: [],
  fileCreationDate: new Date(),
}

// Convert the object to a JSON string
const eventDetailsJson = JSON.stringify(eventDetails)

// Create a blob with the JSON string
const blob = new Blob([eventDetailsJson], { type: 'application/json' })

// Create a download link with the blob URL
const downloadLink = document.createElement('a')
downloadLink.href = URL.createObjectURL(blob)
downloadLink.download = `${eventDetails.name}.json`
downloadLink.click()
console.log(`Event details saved as ${filename}.json`)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT OPENS LINKS

// 11/03/2023 Data
// 18 concerts
const links = [
  'https://concerts.livenation.com/rico-nasty-houston-texas-04-29-2023/event/3A005E4977A72B62',
  'https://concerts.livenation.com/pote-baby-ben-reilly-los-angeles-california-04-19-2023/event/09005E5129189C6B',
  'https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354',
  'https://concerts.livenation.com/tiffany-new-orleans-louisiana-04-30-2023/event/1B005E5BEFB39EB4',
  'https://concerts.livenation.com/icon-for-hire-boston-massachusetts-05-15-2023/event/01005E5C84051272',
  'https://www.ticketmaster.com/forever-miles-houston-texas-05-19-2023/event/3A005E5B80122C07',
  'https://www.ticketmaster.com/citywide-new-york-new-york-04-29-2023/event/00005E5702367C0C',
  'https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553',
  'https://www.ticketmaster.com/la-maquinaria-nortena-los-pescadores-del-tucson-arizona-04-23-2023/event/19005E5CCC883848',
  'https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA',
  'https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989',
  'https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989',
  'https://concerts.livenation.com/grandson-kflay-present-i-love-you-chicago-illinois-06-10-2023/event/04005E66C4FD2142',
  'https://www.ticketmaster.com/event/0C005E67D1BB3D04',
  'https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4',
  'https://concerts.livenation.com/soulja-boy-atlanta-georgia-05-11-2023/event/0E005E3AFC4564E3',
  'https://concerts.livenation.com/soulja-boy-pittsburgh-pennsylvania-05-21-2023/event/16005E4F0C757A1E',
  'https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB',
]
async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], '_blank')
        resolve()
      }, 10000)
    })
  }
}

openLinks()
