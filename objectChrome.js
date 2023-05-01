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
  "https://www.ticketmaster.com/adam-ezra-group-savannah-georgia-06-11-2023/event/0E005E918D3F1B2F",
  "https://www.ticketmaster.com/jeffrey-martin-anna-tivel-madison-wisconsin-07-23-2023/event/07005E92D4F11DF4",
  "https://concerts.livenation.com/idk-santa-ana-california-10-10-2023/event/09005E9303AB49CD",
  "https://concerts.livenation.com/idk-dallas-texas-10-05-2023/event/0C005E98F40E4756",
  "https://concerts.livenation.com/idk-houston-texas-10-06-2023/event/3A005E98AF473272",
  "https://www.ticketmaster.com/panda-bear-sonic-boom-seattle-washington-07-16-2023/event/0F005E949A101BAC",
  "https://www.ticketmaster.com/the-down-outs-scab-comatosed-brooklyn-new-york-05-26-2023/event/00005E9BBD7C73E4",
  "https://www.ticketmaster.com/rema-rave-roses-north-american-tour-seattle-washington-08-12-2023/event/0F005E956F8911A3",
  "https://concerts.livenation.com/roar-los-angeles-california-09-13-2023/event/09005E98F680337F",
  "https://www.ticketmaster.com/bobby-shmurda-new-york-new-york-06-07-2023/event/00005E9CAD3433BD",
  "https://www.ticketmaster.com/pepper-twenty-years-of-kona-town-los-angeles-california-09-21-2023/event/09005E981210494E",
  "https://www.ticketmaster.com/andy-frasco-the-un-washington-district-of-columbia-10-01-2023/event/15005E95B2043FB0",
  "https://www.ticketmaster.com/jidenna-baltimore-maryland-08-06-2023/event/15005E78E7514A46",
  "https://concerts.livenation.com/otr-los-angeles-california-09-22-2023/event/09005E94091861A1",
  "https://www.ticketmaster.com/959-the-ranch-presents-steve-earle-fort-worth-texas-07-08-2023/event/0C005E982BC95723",
  "https://concerts.livenation.com/beast-in-black-with-support-from-new-york-new-york-09-11-2023/event/00005E95A3803DB2",
  "https://www.ticketmaster.com/albert-bouchards-imaginos-new-york-new-york-07-12-2023/event/00005E98EACC614D",
  "https://www.ticketmaster.com/morgan-wade-asbury-park-new-jersey-08-16-2023/event/00005E92BB50E616",
  "https://www.ticketmaster.com/generationals-washington-district-of-columbia-10-14-2023/event/15005E939CAF2BE3",
];

const links2 = [
  "https://concerts.livenation.com/belly-18-boston-massachusetts-10-05-2023/event/01005E95E0BA6C8D",
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
