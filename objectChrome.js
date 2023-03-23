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

// 21/03/2023
// 29 concerts
const links = [
  "https://www.ticketmaster.com/bastille-tucson-arizona-05-24-2023/event/19005E589CFB2553",
  "https://www.ticketmaster.com/50-cent-everett-massachusetts-04-01-2023/event/01005E4AE6FE7CBA",
  "https://concerts.livenation.com/not-presents-get-busy-or-die-sacramento-california-05-21-2023/event/1C005E58CF70600D?_ga=2.78240404.1891142984.1678312456-1080492288.1671659989",
  "https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989",
  "https://www.ticketmaster.com/event/0C005E67D1BB3D04",
  "https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB",
  "https://concerts.livenation.com/ekkstacy-los-angeles-california-07-21-2023/event/09005E66C061CE15",
  "https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF",
  "https://concerts.livenation.com/fangirl-fantasy-one-direction-vs-5sos-boston-massachusetts-04-15-2023/event/01005E579FC93D0B",
  "https://concerts.livenation.com/zae-france-cleveland-ohio-04-24-2023/event/05005E6E9839218E",
  "https://www.ticketmaster.com/waka-flocka-flame-with-the-homies-louisville-kentucky-03-31-2023/event/16005E6DA63813A7",
  "https://concerts.livenation.com/man-with-a-mission-world-tour-boston-massachusetts-05-28-2023/event/01005E6809707D33",
  "https://concerts.livenation.com/311-houston-texas-05-26-2023/event/3A005E6ADBF97BD2",
  "https://concerts.livenation.com/roc-marciano-thank-god-for-roc-boston-massachusetts-05-18-2023/event/01005E6F8F2A20EC",
  "https://concerts.livenation.com/bullet-for-my-valentine-raleigh-north-carolina-05-21-2023/event/2D005E6ADBEE7856",
  "https://www.ticketmaster.com/matt-maeson-washington-district-of-columbia-05-31-2023/event/15005E6ABEE96DC4",
  "https://concerts.livenation.com/saviii-3rd-santa-ana-california-04-09-2023/event/09005E6FC8714415",
  "https://concerts.livenation.com/joeyy-with-marlon-dubois-and-shed-los-angeles-california-04-22-2023/event/09005E6ECBBB316F",
  "https://concerts.livenation.com/ruel-4th-wall-world-tour-north-boston-massachusetts-06-14-2023/event/01005E71C829628F",
  "https://concerts.livenation.com/scarface-chicago-illinois-07-07-2023/event/04005E6ECB401E24",
  "https://www.ticketmaster.com/dreamers-191-toole-tucson-arizona-06-09-2023/event/19005E71AD8A267A",
  "https://concerts.livenation.com/robert-delong-dreamers-philadelphia-pennsylvania-05-30-2023/event/02005E71931F2470",
  "https://www.ticketmaster.com/dreamers-robert-delong-atlanta-georgia-06-05-2023/event/0E005E71C1CD464B",
  "https://concerts.livenation.com/dreamers-robert-delong-santa-ana-california-06-15-2023/event/09005E6FCD4945DB",
  "https://concerts.livenation.com/2rare-new-york-new-york-04-16-2023/event/00005E71C5D939E1",
  "https://www.ticketmaster.com/the-dan-band-new-york-new-york-04-29-2023/event/00005E74B8FF1DA1",
  "https://www.ticketmaster.com/mipso-savannah-georgia-04-20-2023/event/0E005E74C1D02B25",
];
async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], "_blank");
        resolve();
      }, 5000);
    });
  }
}

openLinks();
