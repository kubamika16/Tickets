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
  "https://www.ticketmaster.com/owl-city-nashville-tennessee-10-15-2023/event/1B005E8DD4608F6C",
  "https://www.ticketmaster.com/dramarama-asbury-park-new-jersey-08-12-2023/event/00005EA4A463C6CD",
  "https://concerts.livenation.com/have-a-nice-life-chicago-illinois-08-24-2023/event/04005EA8B765183C",
  "https://concerts.livenation.com/insomniac-presents-william-black-18-santa-ana-california-08-18-2023/event/09005EA8DC9E4653",
  "https://concerts.livenation.com/yngwie-malmsteen-sacramento-california-09-07-2023/event/1C005EAA8F2028DD",
  "https://www.ticketmaster.com/black-country-new-road-los-angeles-california-09-01-2023/event/09005EA9980E2F79",
  "https://www.ticketmaster.com/the-chainsmokers-everett-massachusetts-06-06-2023/event/01005EA414A7A0F1",
  "https://www.ticketmaster.com/ludacris-music-by-dj-infamous-boston-massachusetts-05-19-2023/event/01005EA978D1125F",
  "https://concerts.livenation.com/bowling-for-soup-boston-massachusetts-09-11-2023/event/01005EA3C7765747",
  "https://concerts.livenation.com/charlotte-cardin-boston-massachusetts-10-25-2023/event/01005E95AE53445A",
  "https://www.ticketmaster.com/bowling-for-soup-atlanta-georgia-09-05-2023/event/0E005EA19D022591",
  "https://www.ticketmaster.com/wolfmother-seattle-washington-09-22-2023/event/0F005EA896A81747",
  "https://concerts.livenation.com/charlotte-cardin-philadelphia-pennsylvania-10-28-2023/event/02005EA1D9586118",
  "https://concerts.livenation.com/toosii-naujour-tour-chicago-illinois-08-30-2023/event/04005EAC18654F8A",
  "https://www.ticketmaster.com/concrete-jungle-ent-presents-red-store-los-angeles-california-07-01-2023/event/09005EACDDB05FB3",
  "https://www.ticketmaster.com/bar-italia-madison-wisconsin-12-13-2023/event/07005EAA83860E37",
  "https://concerts.livenation.com/bar-italia-boston-massachusetts-12-05-2023/event/01005EA9F2519CCB",
  "https://www.ticketmaster.com/bar-italia-new-york-new-york-12-04-2023/event/00005EA9FB2D9088",
  "https://www.ticketmaster.com/dogwood-tales-with-deau-eyes-and-charlottesville-virginia-06-09-2023/event/01005EAE8E9B3288",
  "https://www.ticketmaster.com/tom-sandoval-the-most-extras-cincinnati-ohio-05-31-2023/event/16005EACA9B54126",
  "https://www.ticketmaster.com/death-warmed-over-covington-kentucky-07-29-2023/event/16005EACC49B56B8",
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
