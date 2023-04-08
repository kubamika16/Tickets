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
  "https://concerts.livenation.com/vs-self-and-friends-los-angeles-california-06-30-2023/event/09005E705103644E",
  "https://concerts.livenation.com/owl-city-chicago-illinois-10-18-2023/event/04005E69AFF41AAC",
  "https://www.ticketmaster.ca/les-cowboys-fringants-brossard-quebec-09-21-2023/event/31005E7BDA822703",
  "https://concerts.livenation.com/owl-city-sacramento-california-10-02-2023/event/1C005E6A691F173D",
  "https://concerts.livenation.com/nothing-more-spirits-tour-2023-salt-lake-city-utah-04-19-2023/event/1E005E26F15C4DE6",
  "https://www.ticketmaster.com/meg-myers-tzias-arc-tour-asbury-park-new-jersey-05-06-2023/event/00005E38D473654E",
  "https://concerts.livenation.com/lecrae-the-final-church-clothes-tour-philadelphia-pennsylvania-05-12-2023/event/02005E2D803F1D7D",
  "https://concerts.livenation.com/set-it-off-the-dopamine-tour-philadelphia-pennsylvania-05-07-2023/event/02005E3ACF226BC9",
  "https://www.ticketmaster.com/uncle-kracker-leesburg-virginia-05-27-2023/event/01005E4D8DCF0E81",
  "https://concerts.livenation.com/set-it-off-the-dopamine-tour-salt-lake-city-utah-05-24-2023/event/1E005E3AFC2B57EB",
  "https://www.ticketmaster.com/larrys-market-run-2023-madison-wisconsin-05-09-2023/event/07005E708C735953",
  "https://www.ticketmaster.com/collective-soul-red-bank-new-jersey-05-26-2023/event/1D005E67B51A19E1",
  "https://concerts.livenation.com/not-presents-get-busy-or-die-san-diego-california-05-17-2023/event/0A005E588E6422D7",
];
const links2 = [
  "https://www.ticketmaster.com/the-frights-houston-texas-07-09-2023/event/3A005E74220775F7",
  "https://concerts.livenation.com/owl-city-atlanta-georgia-09-20-2023/event/0E005E69B74C2F98",
  "https://concerts.livenation.com/owl-city-sacramento-california-10-02-2023/event/1C005E6A691F173D",
  "https://concerts.livenation.com/launder-santa-ana-california-05-26-2023/event/09005E76F5185C99",
  "https://concerts.livenation.com/owl-city-indianapolis-indiana-09-23-2023/event/05005E75F3F05B8C",
  "https://www.ticketmaster.com/candlebox-the-long-goodbye-tour-huntington-new-york-06-29-2023/event/00005E76F03C6C2A",
  "https://www.ticketmaster.com/duster-new-york-new-york-04-16-2023/event/00005E7DFFF46A6A",
  "https://concerts.livenation.com/owl-city-houston-texas-10-11-2023/event/3A005E699E872C81",
  "https://www.ticketmaster.com/beanie-sigel-plus-special-guest-freeway-new-york-new-york-04-28-2023/event/00005E54CC2B6354",
  "https://www.ticketmaster.com/alec-benjamin-harrisburg-pennsylvania-04-29-2023/event/02005E63AFB247F4",
  "https://www.ticketmaster.com/prof-brooklyn-new-york-04-30-2023/event/00005E43ED977E18",
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
