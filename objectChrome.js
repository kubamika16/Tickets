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

// 02/03/2023 Data
const links = [
  'https://www.ticketmaster.com/pre-show-cory-asbury-vip-ticket-anderson-indiana-04-14-2023/event/05005E39E95A6042',
  'https://www.ticketmaster.com/houndmouth-asbury-park-new-jersey-04-23-2023/event/00005E2AEB984BA2',
  'https://www.ticketmaster.com/snow-tha-product-the-quince-i-boston-massachusetts-04-25-2023/event/01005E3BE0737EBA',
  'https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2',
  'https://www.ticketmaster.com/sloan-new-york-new-york-04-20-2023/event/00005E3AB0F93742',
  'https://www.ticketmaster.com/mora-paraiso-tour-boston-massachusetts-05-04-2023/event/01005E4A89BC217E',
  'https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA',
  'https://www.ticketmaster.ca/dean-lewis-the-future-is-bright-toronto-ontario-05-26-2023/event/10005E438AC31336',
  'https://concerts.livenation.com/event/09005E4EDBAC4224',
  'https://www.ticketmaster.com/young-nudy-ft-lauderdale-florida-04-18-2023/event/0D005E4EDD66BB3F',
  'https://www.ticketmaster.ca/milky-chance-summer-haze-tour-ottawa-ontario-05-29-2023/event/31005E48E9BC44CF',
  'https://www.ticketmaster.com/strawberry-girls-houston-texas-03-26-2023/event/3A005E50ED72770B',
  'https://concerts.livenation.com/mc-magic-salt-lake-city-utah-10-21-2023/event/1E005E50006A5AE0',
  'https://www.ticketmaster.com/the-red-jumpsuit-apparatus-atlanta-georgia-04-16-2023/event/0E005E4DD1E548BF',
  'https://www.ticketmaster.com/high-tolerance-ent-presents-dsavage-live-los-angeles-california-04-16-2023/event/09005E55858710D5',
  'https://www.ticketmaster.com/k-camp-atlanta-georgia-04-23-2023/event/0E005E55B15136DF',
  'https://www.ticketmaster.com/1017-the-bull-presents-songs-stories-boston-massachusetts-03-27-2023/event/01005E4DF5EF63D4',
  'https://concerts.livenation.com/k-camp-charlotte-north-carolina-04-08-2023/event/2D005E51BC5365C7',
  'https://concerts.livenation.com/pote-baby-ben-reilly-santa-ana-california-04-18-2023/event/09005E55A4382268',
  'https://www.ticketmaster.com/hunter-hayes-harrisburg-pennsylvania-05-20-2023/event/02005E50FD96850D',
  'https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354',
  'https://concerts.livenation.com/dub-club-presents-sister-nancy-feat-los-angeles-california-04-15-2023/event/09005E47AAEF3220',
  'https://www.ticketmaster.com/hollywood-casino-greektown-present-george-thorogood-detroit-michigan-07-16-2023/event/08005E51DD9352B0',
]

async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], '_blank')
        resolve()
      }, 7000)
    })
  }
}

openLinks()
