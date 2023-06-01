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
  "https://concerts.livenation.com/toosii-naujour-tour-chicago-illinois-08-30-2023/event/04005EAC18654F8A",
  "https://concerts.livenation.com/hulvey-dallas-texas-08-13-2023/event/0C005EACDBEA58F4",
  "https://concerts.livenation.com/matt-maeson-a-solo-experience-thats-boston-massachusetts-07-07-2023/event/01005EB3B77E8125",
  "https://concerts.livenation.com/koe-wetzel-vip-mg-experience-woodlands-texas-06-10-2023/event/3A005EB799373350",
  "https://concerts.livenation.com/vision-video-santa-ana-california-08-12-2023/event/09005EB13F2389A2",
  "https://concerts.livenation.com/klub-nocturno-rockero-night-80s-goth-los-angeles-california-06-16-2023/event/09005EB436DB0B40",
  "https://www.ticketmaster.com/saint-motel-seattle-washington-09-26-2023/event/0F005EABF03A9299",
  "https://www.ticketmaster.ca/blackberry-smoke-live-in-concert-ottawa-ontario-07-13-2023/event/31005EB7BBFE19FE",
  "https://concerts.livenation.com/saint-motel-the-awards-show-san-francisco-california-09-23-2023/event/1C005EA9AF864FF4",
  "https://concerts.livenation.com/fame-on-fire-the-chaos-tour-dallas-texas-10-11-2023/event/0C005EAF33B76852",
  "https://concerts.livenation.com/saint-motel-the-awards-show-san-diego-california-09-19-2023/event/0B005EB1C1672951",
  "https://concerts.livenation.com/saint-motel-the-awards-show-santa-ana-california-09-20-2023/event/09005EB0E508A93A",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-chicago-illinois-08-12-2023/event/04005EB711EC502D",
  "https://www.ticketmaster.ca/blackberry-smoke-london-ontario-07-11-2023/event/10005EB7C4EC231F",
  "https://www.ticketmaster.ca/blackberry-smoke-live-in-concert-toronto-ontario-07-12-2023/event/10005EB7CCDF2656",
  "https://www.ticketmaster.com/saint-motel-the-awards-show-austin-texas-09-14-2023/event/3A005EA8BA9C32A5",
  "https://concerts.livenation.com/saint-motel-the-awards-show-sacramento-california-09-24-2023/event/1C005EB127AD9694",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-santa-ana-california-08-03-2023/event/09005EB6F4473EFF",
  "https://www.ticketmaster.ca/rafsaperra-toronto-ontario-07-15-2023/event/10005EB3CB11366D",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-new-york-new-york-08-18-2023/event/00005EB7B9434821",
  "https://www.ticketmaster.com/ridgeway-los-angeles-california-06-22-2023/event/09005EB3C7B96CFE",
  "https://www.ticketmaster.com/mass-destruction-metal-fest-sunday-only-atlanta-georgia-11-05-2023/event/0E005EB6C7043636",
  "https://www.ticketmaster.com/mass-destruction-metal-fest-friday-only-atlanta-georgia-11-03-2023/event/0E005EB6C5AE35DC",
  "https://www.ticketmaster.com/mass-destruction-metal-fest-saturday-only-atlanta-georgia-11-04-2023/event/0E005EB6C5E735EA",
];
const links2 = [];

async function openLinks() {
  for (let i = 0; i < links.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.open(links[i], "_blank");
        resolve();
      }, 10000);
    });
  }
}

openLinks();
