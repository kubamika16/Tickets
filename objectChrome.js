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
  "https://concerts.livenation.com/klub-nocturno-rockero-night-80s-goth-los-angeles-california-06-16-2023/event/09005EB436DB0B40",
  "https://www.ticketmaster.com/saint-motel-seattle-washington-09-26-2023/event/0F005EABF03A9299",
  "https://www.ticketmaster.ca/blackberry-smoke-live-in-concert-ottawa-ontario-07-13-2023/event/31005EB7BBFE19FE",
  "https://concerts.livenation.com/saint-motel-the-awards-show-san-francisco-california-09-23-2023/event/1C005EA9AF864FF4",
  "https://concerts.livenation.com/saint-motel-the-awards-show-san-diego-california-09-19-2023/event/0B005EB1C1672951",
  "https://concerts.livenation.com/saint-motel-the-awards-show-santa-ana-california-09-20-2023/event/09005EB0E508A93A",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-chicago-illinois-08-12-2023/event/04005EB711EC502D",
  "https://concerts.livenation.com/saint-motel-the-awards-show-sacramento-california-09-24-2023/event/1C005EB127AD9694",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-santa-ana-california-08-03-2023/event/09005EB6F4473EFF",
  "https://concerts.livenation.com/blessthefall-hollow-bodies-10-year-anniversary-new-york-new-york-08-18-2023/event/00005EB7B9434821",
  "https://www.ticketmaster.com/ridgeway-los-angeles-california-06-22-2023/event/09005EB3C7B96CFE",
  "https://www.ticketmaster.com/hotel-ugly-houston-texas-06-24-2023/event/3A005EBEA21224DC",
  "https://concerts.livenation.com/freak-show-jordana-with-dev-lemons-santa-ana-california-10-06-2023/event/09005EB3F77C8B89",
  "https://concerts.livenation.com/pluko-los-angeles-california-09-08-2023/event/09005EBA4D8785A4",
  "https://concerts.livenation.com/akthesavior-los-angeles-california-07-19-2023/event/09005EBF9E672B2B",
  "https://concerts.livenation.com/freak-show-jordana-with-dev-lemons-boston-massachusetts-10-20-2023/event/01005EB2E98982E0",
  "https://concerts.livenation.com/miya-folick-the-roach-tour-san-diego-california-09-22-2023/event/0A005EB2B791314A",
];
const links2 = [
  "https://www.ticketmaster.com/pluko-new-york-new-york-09-23-2023/event/00005EBACA93983A",
  "https://www.ticketmaster.com/chris-webby-hampton-new-hampshire-07-27-2023/event/01005EBA8AF81CAC",
  "https://www.ticketmaster.com/the-happy-fits-under-the-shade-tucson-arizona-10-06-2023/event/19005EAFAA321D70",
  "https://www.ticketmaster.com/chris-webby-portland-maine-07-28-2023/event/01005EBA8C1F1CDF",
  "https://www.ticketmaster.com/the-happy-fits-albany-new-york-09-20-2023/event/30005EB2BF541D2D",
  "https://www.ticketmaster.com/the-happy-fits-albany-new-york-09-20-2023/event/30005EB2BF541D2D",
  "https://www.ticketmaster.com/the-happy-fits-under-the-shade-charlottesville-virginia-10-24-2023/event/01005EB89EA54294",
  "https://www.ticketmaster.com/the-happy-fits-under-the-shade-charlottesville-virginia-10-24-2023/event/01005EB89EA54294",
  "https://www.ticketmaster.com/foreigner-farewell-tour-bethlehem-pennsylvania-11-18-2023/event/02005EB9DF985245",
  "https://www.ticketmaster.com/foreigner-farewell-tour-bethlehem-pennsylvania-11-17-2023/event/02005EB9DF8F5242",
  "https://www.ticketmaster.com/puddle-of-mudd-rialto-theatre-tucson-arizona-09-03-2023/event/19005EBABACF2535",
  "https://www.ticketmaster.com/kesha-new-orleans-louisiana-10-18-2023/event/1B005EB7AE462799",
  "https://concerts.livenation.com/boys-like-girls-the-speaking-our-salt-lake-city-utah-10-13-2023/event/1E005EB886F128E2",
  "https://www.ticketmaster.com/black-veil-brides-vv-tour-2023-huntington-new-york-09-25-2023/event/00005EB7A98D2DB8",
  "https://concerts.livenation.com/boys-like-girls-the-speaking-our-las-vegas-nevada-10-02-2023/event/17005EB3FA5F9458",
  "https://concerts.livenation.com/the-japanese-house-san-diego-california-11-17-2023/event/0B005EB8E43C3699",
  "https://www.ticketmaster.com/the-guess-who-atlantic-city-new-jersey-09-23-2023/event/02005EB2AC7B33F3",
  "https://www.ticketmaster.com/the-japanese-house-washington-district-of-columbia-11-04-2023/event/15005EB6C1F62DF6",
  "https://www.ticketmaster.com/boys-like-girls-the-speaking-our-nashville-tennessee-09-18-2023/event/1B005EB3D8297258",
  "https://concerts.livenation.com/pop-evil-skeletons-tour-new-orleans-louisiana-07-26-2023/event/1B005EB9DB7138D2",
];

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
