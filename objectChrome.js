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
  "https://concerts.livenation.com/ella-mai-the-heart-on-my-chicago-illinois-05-23-2023/event/04005E3ABF404BD2?_ga=2.114333063.1891142984.1678312456-1080492288.1671659989",
  "https://www.ticketmaster.com/event/0C005E67D1BB3D04",
  "https://www.ticketmaster.com/bush-huntington-new-york-04-30-2023/event/00005E6693AF0EBB",
  "https://www.ticketmaster.ca/saint-asonia-montreal-quebec-05-13-2023/event/31005E6AD7CD66EF",
  "https://concerts.livenation.com/larrys-market-run-2023-las-vegas-nevada-07-14-2023/event/17005E6FC6B47A0B",
  "https://www.ticketmaster.com/matt-maeson-washington-district-of-columbia-05-31-2023/event/15005E6ABEE96DC4",
  "https://www.ticketmaster.com/neffex-born-a-rockstar-the-world-new-york-new-york-11-19-2023/event/00005E7CAF17248C",
  "https://concerts.livenation.com/siriusxms-hiphop-nation-presents-key-glock-salt-lake-city-utah-04-04-2023/event/1E005E78C9B64608",
  "https://concerts.livenation.com/malinda-its-all-true-film-screening-new-york-new-york-04-30-2023/event/00005E7BE17F3F92",
  "https://concerts.livenation.com/the-amity-affliction-san-diego-california-05-10-2023/event/0B005E78D6B225A4",
  "https://www.ticketmaster.com/the-amity-affliction-tucson-arizona-05-13-2023/event/19005E77F5A15004",
  "https://concerts.livenation.com/vs-self-and-friends-los-angeles-california-06-30-2023/event/09005E705103644E",
  "https://www.ticketmaster.com/velvet-wounds-los-angeles-california-04-15-2023/event/09005E7BEA044BA3",
  "https://concerts.livenation.com/grand-ole-echo-presents-rob-leines-los-angeles-california-04-16-2023/event/09005E7CC7854609",
  "https://www.ticketmaster.com/jesse-joy-summer-tour-2023-boston-massachusetts-06-16-2023/event/01005E701F679F4F",
  "https://www.ticketmaster.com/candlebox-the-long-goodbye-tour-saint-louis-missouri-08-13-2023/event/06005E75B6D234F8",
  "https://concerts.livenation.com/owl-city-chicago-illinois-10-18-2023/event/04005E69AFF41AAC",
  "https://www.ticketmaster.com/young-buck-saint-louis-missouri-06-09-2023/event/06005E7BC290498C",
  "https://www.ticketmaster.com/owl-city-saint-louis-missouri-10-14-2023/event/06005E6DC3881EB8",
  "https://www.ticketmaster.ca/les-cowboys-fringants-brossard-quebec-09-21-2023/event/31005E7BDA822703",
  "https://www.ticketmaster.com/the-frights-houston-texas-07-09-2023/event/3A005E74220775F7",
  "https://concerts.livenation.com/owl-city-atlanta-georgia-09-20-2023/event/0E005E69B74C2F98",
];
const links2 = [
  "https://concerts.livenation.com/owl-city-sacramento-california-10-02-2023/event/1C005E6A691F173D",
  "https://concerts.livenation.com/launder-santa-ana-california-05-26-2023/event/09005E76F5185C99",
  "https://concerts.livenation.com/owl-city-indianapolis-indiana-09-23-2023/event/05005E75F3F05B8C",
  "https://www.ticketmaster.com/candlebox-the-long-goodbye-tour-huntington-new-york-06-29-2023/event/00005E76F03C6C2A",
  "https://concerts.livenation.com/jesse-joy-summer-tour-2023-atlanta-georgia-08-08-2023/event/0E005E74F0ADB0F0",
  "https://www.ticketmaster.com/duster-new-york-new-york-04-16-2023/event/00005E7DFFF46A6A",
  "https://www.ticketmaster.com/poorstacy-teenage-vertigo-tour-atlanta-georgia-05-19-2023/event/0E005E77945E1B91",
  "https://concerts.livenation.com/owl-city-to-the-moon-tour-san-diego-california-10-07-2023/event/0A005E6F9CC22AFC",
  "https://concerts.livenation.com/cico-p-los-angeles-california-06-03-2023/event/09005E7B14246266",
  "https://concerts.livenation.com/candlebox-the-long-goodbye-tour-louisville-kentucky-08-02-2023/event/16005E78E0F26A6A",
  "https://www.ticketmaster.com/mild-minds-new-york-new-york-06-10-2023/event/00005E7BC3262E52",
  "https://concerts.livenation.com/bluebucksclan-no-rules-tour-detroit-michigan-05-21-2023/event/08005E63360D8B86",
  "https://concerts.livenation.com/owl-city-houston-texas-10-11-2023/event/3A005E699E872C81",
  "https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354",
  "https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4",
  "https://www.ticketmaster.com/prof-brooklyn-new-york-04-30-2023/event/00005E43ED977E18",
  "https://www.ticketmaster.com/devin-the-dude-austin-texas-04-18-2023/event/3A005E3FFA2A7C39",
  "https://concerts.livenation.com/nothing-more-spirits-tour-2023-salt-lake-city-utah-04-19-2023/event/1E005E26F15C4DE6",
  "https://concerts.livenation.com/bankrol-hayden-the-29-tour-dallas-texas-04-20-2023/event/0C005E309F0E3288",
  "https://www.ticketmaster.com/tony-yayo-new-york-new-york-04-26-2023/event/00005E77E21B4BD1",
  "https://concerts.livenation.com/ethan-bortnick-los-angeles-california-04-26-2023/event/09005E43E0DD6CEC",
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
