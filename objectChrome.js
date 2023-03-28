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
  "https://concerts.livenation.com/ekkstacy-los-angeles-california-07-21-2023/event/09005E66C061CE15",
  "https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF",
  "https://concerts.livenation.com/man-with-a-mission-world-tour-boston-massachusetts-05-28-2023/event/01005E6809707D33",
  "https://concerts.livenation.com/311-houston-texas-05-26-2023/event/3A005E6ADBF97BD2",
  "https://www.ticketmaster.com/matt-maeson-washington-district-of-columbia-05-31-2023/event/15005E6ABEE96DC4",
  "https://concerts.livenation.com/2rare-new-york-new-york-04-16-2023/event/00005E71C5D939E1",
  "https://www.ticketmaster.com/the-dan-band-new-york-new-york-04-29-2023/event/00005E74B8FF1DA1",
  "https://www.ticketmaster.com/mipso-savannah-georgia-04-20-2023/event/0E005E74C1D02B25",
  "https://concerts.livenation.com/dead-poet-society-dallas-texas-05-15-2023/event/0C005E7411424ED9",
  "https://www.ticketmaster.com/duster-w-sour-widows-houston-texas-06-17-2023/event/3A005E75BA4231FD",
  "https://concerts.livenation.com/event/0E005E6FC9044F50",
  "https://concerts.livenation.com/kat-dahlia-2023-north-american-tour-los-angeles-california-05-12-2023/event/09005E77CA703A7E",
];
const links2 = [
  "https://www.ticketmaster.com/rick-springfield-madison-wisconsin-07-31-2023/event/07005E7078AD5808",
  "https://concerts.livenation.com/larrys-market-run-2023-las-vegas-nevada-07-14-2023/event/17005E6FC6B47A0B",
  "https://www.ticketmaster.ca/nickel-creek-toronto-ontario-07-19-2023/event/10005E63D7D05F5C",
  "https://concerts.livenation.com/sleeping-with-sirens-sacramento-california-06-01-2023/event/1C005E74004756E6",
  "https://www.ticketmaster.com/blackberry-smoke-detroit-michigan-08-03-2023/event/08005E74B3A61A13",
  "https://www.ticketmaster.com/steel-pulse-del-mar-california-07-22-2023/event/0A005E74CF50311C",
  "https://concerts.livenation.com/peezy-detroit-michigan-05-05-2023/event/08005E75088945C0",
  "https://concerts.livenation.com/arkells-los-angeles-california-05-17-2023/event/09005E71F60968D5",
  "https://www.ticketmaster.com/hosted-by-ty-dolla-ign-boston-massachusetts-04-01-2023/event/01005E78E31274D0",
  "https://concerts.livenation.com/sleeping-with-sirens-family-tree-tour-silver-spring-maryland-05-22-2023/event/15005E74931E1A7C",
  "https://concerts.livenation.com/rio-romeo-tour-2023-new-york-new-york-05-21-2023/event/00005E74F5C44384",
  "https://www.ticketmaster.ca/social-distortion-toronto-ontario-07-22-2023/event/10005E6F32285CB6",
  "https://concerts.livenation.com/kxt-917-presents-first-aid-kit-dallas-texas-09-14-2023/event/0C005E742177548C",
  "https://concerts.livenation.com/girlfriends-boston-massachusetts-05-17-2023/event/01005E6EC98F400F",
  "https://www.ticketmaster.com/snarky-puppy-los-angeles-california-09-24-2023/event/09005E6AC0967B53",
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
