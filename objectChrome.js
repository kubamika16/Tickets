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
  "https://concerts.livenation.com/have-a-nice-life-chicago-illinois-08-24-2023/event/04005EA8B765183C",
  "https://www.ticketmaster.com/black-country-new-road-los-angeles-california-09-01-2023/event/09005EA9980E2F79",
  "https://www.ticketmaster.com/wolfmother-seattle-washington-09-22-2023/event/0F005EA896A81747",
  "https://concerts.livenation.com/toosii-naujour-tour-chicago-illinois-08-30-2023/event/04005EAC18654F8A",
  "https://www.ticketmaster.com/concrete-jungle-ent-presents-red-store-los-angeles-california-07-01-2023/event/09005EACDDB05FB3",
  "https://concerts.livenation.com/bar-italia-boston-massachusetts-12-05-2023/event/01005EA9F2519CCB",
  "https://www.ticketmaster.com/tom-sandoval-the-most-extras-cincinnati-ohio-05-31-2023/event/16005EACA9B54126",
  "https://www.ticketmaster.com/black-sherif-atlanta-georgia-05-24-2023/event/0E005EAFE63548C2",
  "https://www.ticketmaster.com/los-cafres-atlanta-georgia-08-19-2023/event/0E005EACEAE25875",
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
