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

// 19/03/2023 11:50 Data
// 37 concerts
const links = [
  "https://concerts.livenation.com/icon-for-hire-boston-massachusetts-05-15-2023/event/01005E5C84051272",
  "https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553",
  "https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA",
  "https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989",
  "https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989",
  "https://concerts.livenation.com/grandson-kflay-present-i-love-you-chicago-illinois-06-10-2023/event/04005E66C4FD2142",
  "https://www.ticketmaster.com/event/0C005E67D1BB3D04",
  "https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4",
  "https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB",
  "https://concerts.livenation.com/ekkstacy-los-angeles-california-07-21-2023/event/09005E66C061CE15",
  "https://www.ticketmaster.com/powerman-5000-atlanta-georgia-08-06-2023/event/0E005E68A0A2287D",
  "https://concerts.livenation.com/darnell-cole-the-vibe-anaheim-california-04-13-2023/event/09005E6B11484B63",
  "https://www.ticketmaster.com/alix-page-new-york-new-york-05-14-2023/event/00005E6AFD73731A",
  "https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF",
  "https://concerts.livenation.com/fangirl-fantasy-one-direction-vs-5sos-boston-massachusetts-04-15-2023/event/01005E579FC93D0B",
  "https://www.ticketmaster.com/new-west-new-york-new-york-05-09-2023/event/00005E67BEF6297B",
  "https://concerts.livenation.com/big-bubble-rave-21-salt-lake-city-utah-04-08-2023/event/1E005E68E1164093",
  "https://concerts.livenation.com/zae-france-cleveland-ohio-04-24-2023/event/05005E6E9839218E",
];

const links2 = [
  "https://concerts.livenation.com/electric-feels-salt-lake-city-utah-05-13-2023/event/1E005E6CE97B1F23",
  "https://concerts.livenation.com/isabella-lovestory-laticonica-tour-dallas-texas-05-04-2023/event/0C005E69B03820CB",
  "https://concerts.livenation.com/bob-vylan-ban-bob-vylan-tour-boston-massachusetts-05-12-2023/event/01005E67C1C13D80",
  "https://www.ticketmaster.com/waka-flocka-flame-with-the-homies-louisville-kentucky-03-31-2023/event/16005E6DA63813A7",
  "https://www.ticketmaster.com/twin-tribes-191-toole-tucson-arizona-05-22-2023/event/19005E6ECD0D3DFE",
  "https://concerts.livenation.com/man-with-a-mission-world-tour-boston-massachusetts-05-28-2023/event/01005E6809707D33",
  "https://concerts.livenation.com/311-houston-texas-05-26-2023/event/3A005E6ADBF97BD2",
  "https://concerts.livenation.com/atreyu-with-special-guests-point-north-dallas-texas-05-13-2023/event/0C005E6DD8192E5D",
  "https://concerts.livenation.com/shy-glizzy-silver-spring-maryland-05-26-2023/event/15005E6A1CCE869E",
  "https://concerts.livenation.com/roc-marciano-thank-god-for-roc-boston-massachusetts-05-18-2023/event/01005E6F8F2A20EC",
  "https://concerts.livenation.com/bullet-for-my-valentine-raleigh-north-carolina-05-21-2023/event/2D005E6ADBEE7856",
  "https://www.ticketmaster.com/declan-mckenna-the-big-return-albany-new-york-05-28-2023/event/30005E67B71E150F",
  "https://www.ticketmaster.com/matt-maeson-washington-district-of-columbia-05-31-2023/event/15005E6ABEE96DC4",
  "https://concerts.livenation.com/badflower-charlotte-north-carolina-05-24-2023/event/2D005E67914C1B6D",
  "https://concerts.livenation.com/peezy-los-angeles-california-04-16-2023/event/09005E6A1630945D",
  "https://www.ticketmaster.com/yungblud-del-mar-california-04-19-2023/event/0A005E69B3853DF9",
  "https://concerts.livenation.com/saviii-3rd-santa-ana-california-04-09-2023/event/09005E6FC8714415",
  "https://concerts.livenation.com/joeyy-with-marlon-dubois-and-shed-los-angeles-california-04-22-2023/event/09005E6ECBBB316F",
  "https://concerts.livenation.com/aly-aj-with-love-from-denver-colorado-04-04-2023/event/1E005E6EF3E13A8A",
];
async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], "_blank");
        resolve();
      }, 15000);
    });
  }
}

openLinks();
