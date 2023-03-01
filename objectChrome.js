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
downloadLink.download = 'eventDetails.json'

// Click the download link to prompt the user to download the file
downloadLink.click()

console.log('Event details saved as eventDetails.json')
