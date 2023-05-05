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
  "https://concerts.livenation.com/idk-santa-ana-california-10-10-2023/event/09005E9303AB49CD",
  "https://concerts.livenation.com/roar-los-angeles-california-09-13-2023/event/09005E98F680337F",
  "https://concerts.livenation.com/belly-18-boston-massachusetts-10-05-2023/event/01005E95E0BA6C8D",
  "https://www.ticketmaster.com/the-gangs-all-here-tour-skid-suquamish-washington-10-06-2023/event/0F005E91A2BA884C",
  "https://concerts.livenation.com/event/04005E94BCCC2670",
  "https://concerts.livenation.com/boz-scaggs-summer-23-tour-san-francisco-california-08-26-2023/event/1C005E8DD13055D8",
  "https://www.ticketmaster.com/ava-max-on-tour-finally-nashville-tennessee-06-12-2023/event/1B005E8E813B2068",
  "https://www.ticketmaster.com/waka-flocka-flame-nashville-tennessee-05-18-2023/event/1B005E8DF3C7A42F",
  "https://www.ticketmaster.com/owl-city-nashville-tennessee-10-15-2023/event/1B005E8DD4608F6C",
  "https://www.ticketmaster.com/crankdat-harrisburg-pennsylvania-11-03-2023/event/02005E9E294CB9EB",
  "https://www.ticketmaster.com/diaz-music-group-presents-caifanes-nashville-tennessee-06-08-2023/event/1B005E8EDEC99DAB",
  "https://www.ticketmaster.com/crankdat-albany-new-york-10-28-2023/event/30005E9BDF552DC7",
  "https://www.ticketmaster.com/future-islands-nashville-tennessee-05-05-2023/event/1B005E8DCEB48D0D",
  "https://www.ticketmaster.com/declan-mckenna-the-big-return-nashville-tennessee-07-30-2023/event/1B005E8DDC6996B7",
  "https://www.ticketmaster.com/pouya-nashville-tennessee-05-22-2023/event/1B005E8E76D01610",
  "https://www.ticketmaster.com/pouya-nashville-tennessee-05-22-2023/event/1B005E8E76D01610",
  "https://www.ticketmaster.com/less-than-jake-nashville-tennessee-07-06-2023/event/1B005E8E88F32614",
  "https://www.ticketmaster.com/the-wailers-leesburg-virginia-09-13-2023/event/01005EA18B5213C8",
  "https://www.ticketmaster.com/ripe-asbury-park-new-jersey-07-12-2023/event/00005E999F2529D9",
  "https://www.ticketmaster.com/reva-devito-dreamcast-moe-los-angeles-california-06-17-2023/event/09005EA386521496",
  "https://concerts.livenation.com/gaelic-storm-cleveland-ohio-08-03-2023/event/05005EA2C41128D6",
  "https://www.ticketmaster.com/mustard-plug-madison-wisconsin-11-11-2023/event/07005EA2A86815AD",
  "https://www.ticketmaster.com/club-90s-jonas-brothers-night-los-angeles-california-05-13-2023/event/09005EA3AF2F3237",
  "https://concerts.livenation.com/klub-nocturno-presents-caifanes-night-a-san-diego-california-05-27-2023/event/0A005EA3AED92996",
  "https://www.ticketmaster.com/hermitude-washington-district-of-columbia-07-06-2023/event/15005EA3882318B0",
  "https://www.ticketmaster.com/the-way-down-wanderers-columbia-missouri-07-19-2023/event/06005E9ACCEB59C3",
  "https://concerts.livenation.com/rock-and-roll-playhouse-plays-show-los-angeles-california-06-17-2023/event/09005EA2000A4940",
  "https://concerts.livenation.com/sabaidee-fest-sacramento-california-06-02-2023/event/1C005E9CBDAC484C",
];

const links2 = [
  "https://www.ticketmaster.com/joy-oladokun-living-proof-tour-charlottesville-virginia-09-23-2023/event/01005E93A29931A2",
  "https://www.ticketmaster.com/alice-phoebe-lou-asbury-park-new-jersey-07-25-2023/event/00005E95BFC753D0",
  "https://www.ticketmaster.com/secrets-houston-texas-06-22-2023/event/3A005E9B088E72F5",
  "https://www.ticketmaster.com/the-gangs-all-here-tour-skid-suquamish-washington-10-06-2023/event/0F005E91A2BA884C",
  "https://www.ticketmaster.com/chris-renzema-charlottesville-virginia-10-28-2023/event/01005E95CE716233",
  "https://concerts.livenation.com/chris-renzema-with-special-guest-jess-boston-massachusetts-09-30-2023/event/01005E92A23921B2",
  "https://www.ticketmaster.com/three-dog-night-alexandria-virginia-11-29-2023/event/15005E98A8122811",
  "https://concerts.livenation.com/drew-holcomb-and-the-neighbors-18-boston-massachusetts-09-29-2023/event/01005E8DADB23E48",
  "https://www.ticketmaster.com/beast-in-black-with-support-from-baltimore-maryland-09-09-2023/event/15005E95BB6646AC",
  "https://www.ticketmaster.com/pepper-portland-maine-07-08-2023/event/01005E98B198313A",
  "https://www.ticketmaster.com/fit-for-an-autopsy-mechanicsburg-pennsylvania-06-10-2023/event/02005E9AE57953D1",
  "https://concerts.livenation.com/navy-blue-ways-of-knowing-tour-los-angeles-california-06-25-2023/event/09005E99859A131E",
  "https://www.ticketmaster.com/goodbye-for-now-squitch-final-show-somerville-massachusetts-08-05-2023/event/01005E99D2704DC5",
  "https://www.ticketmaster.com/metric-wichita-kansas-06-16-2023/event/06005E9994C75782",
  "https://www.ticketmaster.com/pride-calling-hosted-by-trina-rockstarr-boston-massachusetts-06-04-2023/event/01005E9CAF014B4D",
  "https://concerts.livenation.com/event/04005E94BCCC2670",
  "https://concerts.livenation.com/jidenna-santa-ana-california-07-21-2023/event/09005E7EA4D624C0",
  "https://concerts.livenation.com/boz-scaggs-summer-23-tour-san-francisco-california-08-26-2023/event/1C005E8DD13055D8",
  "https://concerts.livenation.com/boz-scaggs-summer-23-tour-san-francisco-california-08-25-2023/event/1C005E8DD12E55D0",
  "https://concerts.livenation.com/joy-oladokun-living-proof-tour-charlotte-north-carolina-09-22-2023/event/2D005E91BF1439B1",
  "https://concerts.livenation.com/event/1C005E7D79F5112F",
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
