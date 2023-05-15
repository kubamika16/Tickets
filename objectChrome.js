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
  "https://www.ticketmaster.com/the-gangs-all-here-tour-skid-suquamish-washington-10-06-2023/event/0F005E91A2BA884C",
  "https://concerts.livenation.com/event/04005E94BCCC2670",
  "https://www.ticketmaster.com/ava-max-on-tour-finally-nashville-tennessee-06-12-2023/event/1B005E8E813B2068",
  "https://www.ticketmaster.com/owl-city-nashville-tennessee-10-15-2023/event/1B005E8DD4608F6C",
  "https://www.ticketmaster.com/ripe-asbury-park-new-jersey-07-12-2023/event/00005E999F2529D9",
  "https://www.ticketmaster.com/ayoni-with-support-new-york-new-york-06-14-2023/event/00005EA5EE1F94C6",
  "https://www.ticketmaster.com/dramarama-asbury-park-new-jersey-08-12-2023/event/00005EA4A463C6CD",
  "https://www.ticketmaster.com/flamingos-in-the-tree-wilmington-delaware-07-16-2023/event/02005EA9D049677D",
  "https://concerts.livenation.com/pacific-dub-with-special-guest-tunnel-denver-colorado-09-29-2023/event/1E005E9C14306E09",
  "https://concerts.livenation.com/have-a-nice-life-chicago-illinois-08-24-2023/event/04005EA8B765183C",
  "https://concerts.livenation.com/insomniac-presents-william-black-18-santa-ana-california-08-18-2023/event/09005EA8DC9E4653",
  "https://www.ticketmaster.com/flamingos-in-the-tree-houston-texas-07-25-2023/event/3A005EA9940028AF",
  "https://concerts.livenation.com/yngwie-malmsteen-sacramento-california-09-07-2023/event/1C005EAA8F2028DD",
  "https://concerts.livenation.com/orthodox-denver-colorado-07-26-2023/event/1E005EA4F04A5F80",
  "https://concerts.livenation.com/kany-garcia-usa-tour-2023-san-francisco-california-08-30-2023/event/1C005EA6B09337AA",
  "https://www.ticketmaster.com/kany-garcia-usa-tour-2023-boston-massachusetts-09-16-2023/event/01005EA58B323D51",
  "https://www.ticketmaster.com/high-tolerance-ent-presents-icewear-vezzo-atlanta-georgia-06-17-2023/event/0E005EA4DD2C6CB2",
  "https://concerts.livenation.com/ashley-metha-san-diego-california-07-21-2023/event/0A005EA5CF5C519D",
  "https://www.ticketmaster.com/bassrush-presents-dirt-monkey-washington-district-of-columbia-05-31-2023/event/15005EAA8FF91FB6",
  "https://www.ticketmaster.com/black-country-new-road-los-angeles-california-09-01-2023/event/09005EA9980E2F79",
];
const links2 = [
  "https://www.ticketmaster.com/drumming-bird-andrew-montana-houston-texas-08-09-2023/event/3A005EA80C8E7A94",
  "https://www.ticketmaster.com/florist-skullcrusher-191-toole-tucson-arizona-08-13-2023/event/19005EA58E851EF9",
  "https://www.ticketmaster.com/the-chainsmokers-everett-massachusetts-06-06-2023/event/01005EA414A7A0F1",
  "https://www.ticketmaster.com/ludacris-music-by-dj-infamous-boston-massachusetts-05-19-2023/event/01005EA978D1125F",
  "https://www.ticketmaster.com/musiq-soulchild-new-york-new-york-05-31-2023/event/00005EA9A90C3C0D",
  "https://concerts.livenation.com/bowling-for-soup-boston-massachusetts-09-11-2023/event/01005EA3C7765747",
  "https://www.ticketmaster.com/underoath-official-platinum-detroit-michigan-07-14-2023/event/08005EAC65FA0FDD",
  "https://concerts.livenation.com/charlotte-cardin-boston-massachusetts-10-25-2023/event/01005E95AE53445A",
  "https://www.ticketmaster.com/dvbbs-washington-district-of-columbia-07-20-2023/event/15005EAA1D4F7E4B",
  "https://www.ticketmaster.com/the-outlaws-ponte-vedra-beach-florida-12-10-2023/event/22005EA1A6AFBC35",
  "https://concerts.livenation.com/dizzy-los-angeles-california-11-15-2023/event/09005EA5ACDA6639",
  "https://www.ticketmaster.com/above-beyond-boston-massachusetts-06-23-2023/event/01005EA97E2F131F",
  "https://www.ticketmaster.com/sam-feldt-boston-massachusetts-08-11-2023/event/01005EA41828A220",
  "https://www.ticketmaster.com/bowling-for-soup-atlanta-georgia-09-05-2023/event/0E005EA19D022591",
  "https://www.ticketmaster.com/kflay-albany-new-york-08-11-2023/event/30005EA5EA6932DE",
  "https://www.ticketmaster.com/wolfmother-seattle-washington-09-22-2023/event/0F005EA896A81747",
  "https://concerts.livenation.com/tim-atlas-philadelphia-pennsylvania-09-19-2023/event/02005EAAABB1660D",
  "https://concerts.livenation.com/charlotte-cardin-philadelphia-pennsylvania-10-28-2023/event/02005EA1D9586118",
  "https://concerts.livenation.com/attila-about-that-life-10-year-new-york-new-york-09-12-2023/event/00005E9AEC2575CF",
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
