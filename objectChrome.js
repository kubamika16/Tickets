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
  name: eventName,
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

// 05/03/2023 Data
// 12 concerts
const links = [
  'https://concerts.livenation.com/not-presents-get-busy-or-die-san-diego-california-05-17-2023/event/0A005E588E6422D7',
  'https://www.ticketmaster.com/not-seattle-washington-05-25-2023/event/0F005E58C19B4987',
  'https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D',
  'https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA',
  'https://www.ticketmaster.ca/dean-lewis-the-future-is-bright-toronto-ontario-05-26-2023/event/10005E438AC31336',
  'https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2',
  'https://concerts.livenation.com/grandson-kflay-present-i-love-you-silver-spring-maryland-05-29-2023/event/15005E57127B6CA7',
  'https://www.ticketmaster.com/high-tolerance-ent-presents-dsavage-live-los-angeles-california-04-16-2023/event/09005E55858710D5',
  'https://www.ticketmaster.com/k-camp-atlanta-georgia-04-23-2023/event/0E005E55B15136DF',
  'https://www.ticketmaster.ca/milky-chance-summer-haze-tour-ottawa-ontario-05-29-2023/event/31005E48E9BC44CF',
  'https://www.ticketmaster.com/snow-tha-product-the-quince-i-boston-massachusetts-04-25-2023/event/01005E3BE0737EBA',
  'https://www.ticketmaster.com/young-nudy-ft-lauderdale-florida-04-18-2023/event/0D005E4EDD66BB3F',
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
