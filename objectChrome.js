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
  "https://www.ticketmaster.com/project-glow-after-party-w-wax-washington-district-of-columbia-04-30-2023/event/15005E8B3A395D26",
  "https://www.ticketmaster.com/adam-ezra-group-savannah-georgia-06-11-2023/event/0E005E918D3F1B2F",
  "https://www.ticketmaster.com/jeffrey-martin-anna-tivel-madison-wisconsin-07-23-2023/event/07005E92D4F11DF4",
  "https://concerts.livenation.com/idk-santa-ana-california-10-10-2023/event/09005E9303AB49CD",
  "https://concerts.livenation.com/idk-dallas-texas-10-05-2023/event/0C005E98F40E4756",
  "https://concerts.livenation.com/idk-houston-texas-10-06-2023/event/3A005E98AF473272",
  "https://www.ticketmaster.com/panda-bear-sonic-boom-seattle-washington-07-16-2023/event/0F005E949A101BAC",
  "https://www.ticketmaster.com/the-down-outs-scab-comatosed-brooklyn-new-york-05-26-2023/event/00005E9BBD7C73E4",
  "https://www.ticketmaster.com/rema-rave-roses-north-american-tour-seattle-washington-08-12-2023/event/0F005E956F8911A3",
  "https://concerts.livenation.com/roar-los-angeles-california-09-13-2023/event/09005E98F680337F",
];

const links2 = [
  "https://concerts.livenation.com/kat-dahlia-2023-north-american-tour-los-angeles-california-05-12-2023/event/09005E77CA703A7E",
  "https://www.ticketmaster.com/blu-eyes-new-york-new-york-05-12-2023/event/00005E62D8666CD4",
  "https://www.ticketmaster.com/the-menzingers-albany-new-york-05-12-2023/event/30005E62F62824F6",
  "https://www.ticketmaster.com/adelitas-way-hampton-new-hampshire-05-12-2023/event/01005E3BD10B7773",
  "https://www.ticketmaster.com/the-bouncing-souls-saint-louis-missouri-05-12-2023/event/06005E318D471CF6",
  "https://www.ticketmaster.com/nelly-everett-massachusetts-05-12-2023/event/01005E91015E97B2",
  "https://www.ticketmaster.com/paul-oakenfold-baltimore-maryland-05-12-2023/event/15005E37F16F566D",
  "https://www.ticketmaster.com/the-amity-affliction-tucson-arizona-05-13-2023/event/19005E77F5A15004",
  "https://www.ticketmaster.com/meg-myers-tzias-arc-tour-ft-lauderdale-florida-05-13-2023/event/0D005E3A9D9ACAA8",
  "https://www.ticketmaster.com/smith-cleveland-ohio-05-13-2023/event/05005E91E5773117",
  "https://www.ticketmaster.com/ones-to-watch-presents-valley-lost-austin-texas-05-13-2023/event/3A005E9283AC1DA8",
  "https://www.ticketmaster.com/g-perico-hot-shot-tour-191-tucson-arizona-05-13-2023/event/19005E37AA9B25E7",
  "https://www.ticketmaster.com/dr-fresch-washington-district-of-columbia-05-13-2023/event/15005E2CBB433CDB",
  "https://concerts.livenation.com/elder-santa-ana-california-05-13-2023/event/09005E2CD5276E03",
  "https://www.ticketmaster.com/saosin-charleston-south-carolina-05-13-2023/event/2D005E50D3BB65F8",
  "https://www.ticketmaster.com/costa-boston-massachusetts-05-13-2023/event/01005E8CFC1F6D61",
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
