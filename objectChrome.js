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
  "https://www.ticketmaster.com/wolfmother-seattle-washington-09-22-2023/event/0F005EA896A81747",
  "https://concerts.livenation.com/toosii-naujour-tour-chicago-illinois-08-30-2023/event/04005EAC18654F8A",
  "https://www.ticketmaster.com/tom-sandoval-the-most-extras-cincinnati-ohio-05-31-2023/event/16005EACA9B54126",
  "https://www.ticketmaster.com/black-sherif-atlanta-georgia-05-24-2023/event/0E005EAFE63548C2",
  "https://concerts.livenation.com/cavetown-los-angeles-california-07-19-2023/event/09005EA9B7754A31",
  "https://www.ticketmaster.com/jean-dawson-191-toole-tucson-arizona-09-26-2023/event/19005EA9BFC231AA",
  "https://www.ticketmaster.com/the-expendables-191-toole-tucson-arizona-10-12-2023/event/19005EAD114E50C1",
  "https://www.ticketmaster.com/hulvey-the-beautiful-tour-memphis-tennessee-08-20-2023/event/1B005EACAA0F355B",
  "https://www.ticketmaster.com/jean-dawson-whats-the-big-fing-madison-wisconsin-10-14-2023/event/07005EA59C593501",
  "https://concerts.livenation.com/hulvey-houston-texas-08-11-2023/event/3A005EABC62A632F",
  "https://www.ticketmaster.com/matt-maeson-a-solo-experience-thats-los-angeles-california-09-27-2023/event/09005EA9DD876A17",
  "https://concerts.livenation.com/netta-santa-ana-california-11-14-2023/event/09005EAFBC04306B",
  "https://concerts.livenation.com/hulvey-dallas-texas-08-13-2023/event/0C005EACDBEA58F4",
  "https://concerts.livenation.com/the-paper-kites-plus-the-cactus-new-orleans-louisiana-11-08-2023/event/1B005EAAADF5512A",
  "https://concerts.livenation.com/the-expendables-bumpin-uglies-w-special-new-orleans-louisiana-10-23-2023/event/1B005EAD305999FE",
  "https://concerts.livenation.com/dyl-dion-los-angeles-california-08-16-2023/event/09005EACDA185EB0",
  "https://concerts.livenation.com/gavin-degraw-chicago-illinois-08-17-2023/event/04005EABCCC13226",
  "https://www.ticketmaster.com/the-moss-washington-district-of-columbia-11-29-2023/event/15005EA42F3773A3",
  "https://www.ticketmaster.com/steve-earle-alone-again-tour-solo-alexandria-virginia-08-23-2023/event/15005EABB1C939BE",
];
const links2 = [
  "https://www.ticketmaster.com/the-moss-charlottesville-virginia-12-05-2023/event/01005EAABC157CA3",
  "https://www.ticketmaster.com/dreamstate-presents-paul-oakenfold-washington-district-of-columbia-07-22-2023/event/15005EB22C8A7F4A",
  "https://concerts.livenation.com/everclear-with-the-ataris-new-york-new-york-09-18-2023/event/00005EABAEA646CB",
  "https://www.ticketmaster.com/yung-pinch-atlanta-georgia-07-15-2023/event/0E005EA9C9DB49F2",
  "https://www.ticketmaster.com/jeffrey-osborne-new-york-new-york-02-17-2024/event/00005EAEA3C02EE2",
  "https://concerts.livenation.com/netta-philadelphia-pennsylvania-11-07-2023/event/02005EAFF8966219",
  "https://concerts.livenation.com/dylan-matthew-no-rain-no-flowers-boston-massachusetts-10-07-2023/event/01005E8D98852DE0",
  "https://concerts.livenation.com/matt-maeson-a-solo-experience-thats-boston-massachusetts-07-07-2023/event/01005EB3B77E8125",
  "https://concerts.livenation.com/the-moss-philadelphia-pennsylvania-11-30-2023/event/02005EABAC6D5947",
  "https://www.ticketmaster.com/modern-english-cincinnati-ohio-09-01-2023/event/16005EAC379B9451",
  "https://www.ticketmaster.ca/eric-lapointe-brossard-quebec-12-21-2023/event/31005EAFC43E2855",
  "https://www.ticketmaster.com/sun-room-charlottesville-virginia-10-10-2023/event/01005EAA10C6B1B4",
  "https://www.ticketmaster.com/matisyahu-g-love-special-sauce-with-baltimore-maryland-08-16-2023/event/15005EABF81F631B",
  "https://www.ticketmaster.com/brett-young-charles-town-west-virginia-09-16-2023/event/15005EA4A9332F4F",
  "https://www.ticketmaster.com/alok-21-boston-massachusetts-08-11-2023/event/01005EAD0C5BA845",
  "https://www.ticketmaster.com/boyz-ii-men-englewood-new-jersey-09-17-2023/event/00005EADF8B99D9C",
  "https://www.ticketmaster.com/leann-rimes-englewood-new-jersey-11-17-2023/event/00005EADE01F8732",
  "https://concerts.livenation.com/matt-maeson-a-solo-experience-thats-santa-ana-california-10-02-2023/event/09005EAAAD4554B2",
  "https://www.ticketmaster.com/matisyahu-g-love-special-sauce-with-st-augustine-florida-08-25-2023/event/22005EABAD02C5F0",
  "https://www.ticketmaster.com/rick-springfield-huntington-new-york-09-22-2023/event/00005EAAA1AB33CD",
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
