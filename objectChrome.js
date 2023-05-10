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
  ga1: {
    amount: [],
    price: 0,
  },
  ga2: {
    amount: [],
    price: 0,
  },
  ga3: {
    amount: [],
    price: 0,
  },
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
  "https://concerts.livenation.com/belly-18-boston-massachusetts-10-05-2023/event/01005E95E0BA6C8D",
  "https://www.ticketmaster.com/the-gangs-all-here-tour-skid-suquamish-washington-10-06-2023/event/0F005E91A2BA884C",
  "https://concerts.livenation.com/event/04005E94BCCC2670",
  "https://www.ticketmaster.com/ava-max-on-tour-finally-nashville-tennessee-06-12-2023/event/1B005E8E813B2068",
  "https://www.ticketmaster.com/waka-flocka-flame-nashville-tennessee-05-18-2023/event/1B005E8DF3C7A42F",
  "https://www.ticketmaster.com/owl-city-nashville-tennessee-10-15-2023/event/1B005E8DD4608F6C",
  "https://www.ticketmaster.com/crankdat-albany-new-york-10-28-2023/event/30005E9BDF552DC7",
  "https://www.ticketmaster.com/declan-mckenna-the-big-return-nashville-tennessee-07-30-2023/event/1B005E8DDC6996B7",
  "https://www.ticketmaster.com/pouya-nashville-tennessee-05-22-2023/event/1B005E8E76D01610",
  "https://www.ticketmaster.com/pouya-nashville-tennessee-05-22-2023/event/1B005E8E76D01610",
  "https://www.ticketmaster.com/the-wailers-leesburg-virginia-09-13-2023/event/01005EA18B5213C8",
  "https://www.ticketmaster.com/ripe-asbury-park-new-jersey-07-12-2023/event/00005E999F2529D9",
  "https://www.ticketmaster.com/reva-devito-dreamcast-moe-los-angeles-california-06-17-2023/event/09005EA386521496",
  "https://concerts.livenation.com/gaelic-storm-cleveland-ohio-08-03-2023/event/05005EA2C41128D6",
  "https://www.ticketmaster.com/mustard-plug-madison-wisconsin-11-11-2023/event/07005EA2A86815AD",
  "https://www.ticketmaster.com/club-90s-jonas-brothers-night-los-angeles-california-05-13-2023/event/09005EA3AF2F3237",
];
const links2 = [
  "https://concerts.livenation.com/klub-nocturno-presents-caifanes-night-a-san-diego-california-05-27-2023/event/0A005EA3AED92996",
  "https://www.ticketmaster.com/hermitude-washington-district-of-columbia-07-06-2023/event/15005EA3882318B0",
  "https://www.ticketmaster.com/the-way-down-wanderers-columbia-missouri-07-19-2023/event/06005E9ACCEB59C3",
  "https://concerts.livenation.com/rock-and-roll-playhouse-plays-show-los-angeles-california-06-17-2023/event/09005EA2000A4940",
  "https://concerts.livenation.com/island-block-concert-series-siaosi-anaheim-california-08-26-2023/event/09005EA1E456382A",
  "https://concerts.livenation.com/cat-burns-burns-in-the-usa-boston-massachusetts-07-26-2023/event/01005E9B983335E3",
  "https://concerts.livenation.com/the-red-jumpsuit-apparatus-new-orleans-louisiana-06-11-2023/event/1B005E9E0330841E",
  "https://concerts.livenation.com/claud-supermodel-tour-part-1-boston-massachusetts-09-17-2023/event/01005E9CBC7B548F",
  "https://concerts.livenation.com/boldy-james-detroit-michigan-06-10-2023/event/08005EA2AB8418FC",
  "https://www.ticketmaster.com/ziggy-alberts-rewind-tour-with-kim-alexandria-virginia-08-17-2023/event/15005E9A9A4D22D1",
  "https://www.ticketmaster.com/a-flock-of-seagulls-ft-lauderdale-florida-08-04-2023/event/0D005E9B179FF641",
  "https://concerts.livenation.com/des-rocs-never-ending-moment-tour-cleveland-ohio-07-22-2023/event/05005E9BB62452AF",
  "https://www.ticketmaster.com/nurko-washington-district-of-columbia-06-22-2023/event/15005EA5BC016A87",
  "https://concerts.livenation.com/malinda-denver-colorado-09-26-2023/event/1E005E99F964572C",
  "https://www.ticketmaster.com/malinda-austin-texas-10-11-2023/event/3A005E9999702D1F",
  "https://concerts.livenation.com/event/3A005E978D4027C4",
  "https://concerts.livenation.com/malinda-boston-massachusetts-09-06-2023/event/01005E95A7FE40C0",
];

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
