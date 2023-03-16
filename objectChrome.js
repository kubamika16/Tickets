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

// 16/03/2023 Data
// 20 concerts
const links = [
  'https://concerts.livenation.com/rico-nasty-houston-texas-04-29-2023/event/3A005E4977A72B62',
  'https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354',
  'https://concerts.livenation.com/icon-for-hire-boston-massachusetts-05-15-2023/event/01005E5C84051272',
  'https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553',
  'https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA',
  'https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989',
  'https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989',
  'https://concerts.livenation.com/grandson-kflay-present-i-love-you-chicago-illinois-06-10-2023/event/04005E66C4FD2142',
  'https://www.ticketmaster.com/event/0C005E67D1BB3D04',
  'https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4',
  'https://concerts.livenation.com/soulja-boy-atlanta-georgia-05-11-2023/event/0E005E3AFC4564E3',
  'https://concerts.livenation.com/soulja-boy-pittsburgh-pennsylvania-05-21-2023/event/16005E4F0C757A1E',
  'https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB',
  'https://concerts.livenation.com/ekkstacy-los-angeles-california-07-21-2023/event/09005E66C061CE15',
  'https://concerts.livenation.com/ruel-4th-wall-world-tour-north-boston-massachusetts-06-14-2023/event/01005E58DB0B7F33',
  'https://www.ticketmaster.com/powerman-5000-atlanta-georgia-08-06-2023/event/0E005E68A0A2287D',
  'https://concerts.livenation.com/darnell-cole-the-vibe-anaheim-california-04-13-2023/event/09005E6B11484B63',
  'https://www.ticketmaster.com/alix-page-new-york-new-york-05-14-2023/event/00005E6AFD73731A',
  'https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF',
  'https://concerts.livenation.com/fangirl-fantasy-one-direction-vs-5sos-boston-massachusetts-04-15-2023/event/01005E579FC93D0B',
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
