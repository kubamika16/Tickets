////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT DOWNLOADS DATA FROM GOOGLE CHROME WEBSITE

// Get the name of the event
const eventName = document
  .querySelector(".event-header__event-name-text")
  .innerText.split(" ");

const eventNameShort = `${eventName[0]} ${eventName[1]}`;

// Get the date of the event (with only the day and month)
const eventDate = document
  .querySelector(".event-header__event-date")
  .textContent.trim();
const dateArray = eventDate.split("•").map((str) => str.trim());
const eventMonthDay = dateArray[1];

// Get the link to the event page
const eventUrl = window.location.href;

// Create an object with the event details
const eventDetails = {
  name: `${eventNameShort} (${eventMonthDay})`,
  date: eventMonthDay,
  url: eventUrl,
  availableTickets: [],
  minPrice: [],
  checkingDate: [],
  fileCreationDate: new Date(),
};

// Convert the object to a JSON string
const eventDetailsJson = JSON.stringify(eventDetails);

// Create a blob with the JSON string
const blob = new Blob([eventDetailsJson], { type: "application/json" });

// Create a download link with the blob URL
const downloadLink = document.createElement("a");
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = `${eventDetails.name}.json`;
downloadLink.click();
console.log(`Event details saved.`);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT OPENS LINKS

const links = [
  "https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989",
  "https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989",
  "https://www.ticketmaster.com/event/0C005E67D1BB3D04",
  "https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB",
  "https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF",
  "https://concerts.livenation.com/311-houston-texas-05-26-2023/event/3A005E6ADBF97BD2",
  "https://concerts.livenation.com/larrys-market-run-2023-las-vegas-nevada-07-14-2023/event/17005E6FC6B47A0B",
  "https://concerts.livenation.com/sleeping-with-sirens-family-tree-tour-silver-spring-maryland-05-22-2023/event/15005E74931E1A7C",
  "https://www.ticketmaster.com/matt-maeson-washington-district-of-columbia-05-31-2023/event/15005E6ABEE96DC4",
  "https://www.ticketmaster.com/neffex-born-a-rockstar-the-world-new-york-new-york-11-19-2023/event/00005E7CAF17248C",
  "https://www.ticketmaster.com/abhw-x-lola-brooke-somerville-massachusetts-04-13-2023/event/01005E7B4509C2F0",
  "https://concerts.livenation.com/siriusxms-hiphop-nation-presents-key-glock-salt-lake-city-utah-04-04-2023/event/1E005E78C9B64608",
  "https://concerts.livenation.com/malinda-its-all-true-film-screening-new-york-new-york-04-30-2023/event/00005E7BE17F3F92",
  "https://concerts.livenation.com/the-amity-affliction-san-diego-california-05-10-2023/event/0B005E78D6B225A4",
  "https://www.ticketmaster.com/the-amity-affliction-tucson-arizona-05-13-2023/event/19005E77F5A15004",
];
const links2 = [];
async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], "_blank");
        resolve();
      }, 12000);
    });
  }
}

openLinks();
