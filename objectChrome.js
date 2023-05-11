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
  "https://www.ticketmaster.com/declan-mckenna-the-big-return-nashville-tennessee-07-30-2023/event/1B005E8DDC6996B7",
  "https://www.ticketmaster.com/pouya-nashville-tennessee-05-22-2023/event/1B005E8E76D01610",
  "https://www.ticketmaster.com/the-wailers-leesburg-virginia-09-13-2023/event/01005EA18B5213C8",
  "https://www.ticketmaster.com/ripe-asbury-park-new-jersey-07-12-2023/event/00005E999F2529D9",
  "https://www.ticketmaster.com/reva-devito-dreamcast-moe-los-angeles-california-06-17-2023/event/09005EA386521496",
  "https://concerts.livenation.com/gaelic-storm-cleveland-ohio-08-03-2023/event/05005EA2C41128D6",
  "https://www.ticketmaster.com/club-90s-jonas-brothers-night-los-angeles-california-05-13-2023/event/09005EA3AF2F3237",
  "https://concerts.livenation.com/klub-nocturno-presents-caifanes-night-a-san-diego-california-05-27-2023/event/0A005EA3AED92996",
  "https://www.ticketmaster.com/hermitude-washington-district-of-columbia-07-06-2023/event/15005EA3882318B0",
];
const links2 = [
  "https://www.ticketmaster.com/the-way-down-wanderers-columbia-missouri-07-19-2023/event/06005E9ACCEB59C3",
  "https://concerts.livenation.com/rock-and-roll-playhouse-plays-show-los-angeles-california-06-17-2023/event/09005EA2000A4940",
  "https://www.ticketmaster.com/ludacris-music-by-dj-infamous-boston-massachusetts-05-19-2023/event/01005EA978D1125F",
  "https://www.ticketmaster.com/musiq-soulchild-new-york-new-york-05-31-2023/event/00005EA9A90C3C0D",
  "https://www.ticketmaster.com/sungazer-washington-district-of-columbia-12-08-2023/event/15005EA3EB005899",
  "https://www.ticketmaster.com/lord-nelson-with-low-water-bridge-charlottesville-virginia-06-10-2023/event/01005EA81B14805F",
  "https://www.ticketmaster.com/passion-and-power-tour-w-cinema-covington-kentucky-06-03-2023/event/16005EA48E7E2CB4",
  "https://www.ticketmaster.com/the-lowdown-brass-band-asbury-park-new-jersey-08-25-2023/event/00005EA98D7717A8",
  "https://concerts.livenation.com/belly-new-york-new-york-10-08-2023/event/00005EA5BF3876E2",
  "https://www.ticketmaster.com/ayoni-with-support-new-york-new-york-06-14-2023/event/00005EA5EE1F94C6",
  "https://www.ticketmaster.com/zach-nugents-dead-port-chester-new-york-05-24-2023/event/1D005EA5E3F14561",
  "https://www.ticketmaster.com/millie-oliver-the-missing-pieces-covington-kentucky-08-05-2023/event/16005E8A91141005",
  "https://www.ticketmaster.com/cooper-alan-columbia-missouri-08-17-2023/event/06005EA5F3C4A2D4",
  "https://www.ticketmaster.com/nautics-mons-vi-new-york-new-york-05-19-2023/event/00005EA8BD633137",
  "https://www.ticketmaster.com/michael-williams-band-covington-kentucky-06-16-2023/event/16005EA4A8985336",
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
