// Tablica w której istnieją:
// dni tygodmia (Pon - Nied)
// 3 kategorie z których stworzone będą wykresy: food, drinks, cakes
// Przykład: W pon sprzedaz jedzenia: 1500, napojów 350, ciast 300
// We wtorek sprzedaz była inna, itd.

const salesNumbers = [
  { day: "Mon", sales: { food: 1500, drinks: 350, cakes: 300 } },
  { day: "Tue", sales: { food: 1800, drinks: 250, cakes: 300 } },
  { day: "Wed", sales: { food: 1200, drinks: 200, cakes: 200 } },
  { day: "Thu", sales: { food: 1200, drinks: 100, cakes: 250 } },
  { day: "Fri", sales: { food: 1800, drinks: 300, cakes: 100 } },
  { day: "Sat", sales: { food: 1500, drinks: 400, cakes: 100 } },
  { day: "Sun", sales: { food: 2100, drinks: 500, cakes: 400 } },
];

const tests = [];

// setup
const data = {
  // labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Food Sales",
      data: salesNumbers,
      // Chart color
      backgroundColor: "rgba(255, 26, 104, 0.2)",
      borderColor: "rgba(255, 26, 104, 1)",
      tension: 0.4,
      // Parse and get data that we need (make sure that food data from salesNumber array is readable for us)
      // The parsing object doesn't know about the salesNumbers array directly.
      // Instead, it serves as a set of instructions for Chart.js to interpret the data provided in the data property of the dataset object.
      parsing: {
        yAxisKey: "sales.food",
      },
    },
    {
      label: "Drinks Sales",
      data: salesNumbers,
      // Chart color
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      tension: 0.4,
      // Parse and get data that we need (make sure that food data from salesNumber array is readable for us)
      // The parsing object doesn't know about the salesNumbers array directly.
      // Instead, it serves as a set of instructions for Chart.js to interpret the data provided in the data property of the dataset object.
      parsing: {
        yAxisKey: "sales.drinks",
      },
    },
    {
      label: "Cakes Sales",
      data: salesNumbers,
      // Chart color
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4,
      // Parse and get data that we need (make sure that food data from salesNumber array is readable for us)
      // The parsing object doesn't know about the salesNumbers array directly.
      // Instead, it serves as a set of instructions for Chart.js to interpret the data provided in the data property of the dataset object.
      parsing: {
        yAxisKey: "sales.cakes",
      },
    },
  ],
};

// config
const config = {
  type: "line",
  data,
  options: {
    parsing: {
      xAxisKey: "day",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

// Instantly assign Chart.js version
const chartVersion = document.getElementById("chartVersion");
chartVersion.innerText = Chart.version;

// // 3 kolory wykresów które potrzebujemy do 3 wykresów (red, green, blue)
// backgroundColor: [
//   "rgba(255, 26, 104, 0.2)",
//   "rgba(54, 162, 235, 0.2)",
//   "rgba(75, 192, 192, 0.2)",
// ],
// const ticketArray = [
//   {
//     Section: "GA3",
//     "# of tickets (>=0)": "90",
//     "Price Range": "$149.5",
//     Type: "primary",
//   },
//   {
//     Section: "GA1",
//     "# of tickets (>=0)": "2",
//     "Price Range": "$79.5",
//     Type: "primary",
//   },
//   {
//     Section: "GA3",
//     "# of tickets (>=0)": "1",
//     "Price Range": "$360.5",
//     Type: "primary",
//   },
// ];
// console.log(ticketArray);

const ticketArray = [
  {
    Section: "FLOOR3, FLOOR4, FLOOR5, FLOOR2, FLOOR3, FLOOR1, FLOOR3",
    "# of tickets (>=0)": 1192,
    "Price Range": "$56.25",
    Type: "primary",
  },
  {
    Section: "FLOOR3, FLOOR4, FLOOR5, FLOOR2, FLOOR3, FLOOR1, FLOOR3",
    "# of tickets (>=0)": 85,
    "Price Range": "$56.25",
    Type: "primary",
  },
];

// Sort the array based on the 'Price Range' property
const sortedArray = ticketArray.sort(
  (a, b) =>
    parseFloat(a["Price Range"].slice(1)) -
    parseFloat(b["Price Range"].slice(1))
);

// Initialize GA1, GA2, and GA3 variables with default values
const GA1 = { amount: 0, price: 0 };
const GA2 = { amount: 0, price: 0 };
const GA3 = { amount: 0, price: 0 };

// Assign the ticket information based on the sorted array length
if (sortedArray.length > 0) {
  GA1.amount = sortedArray[0]["# of tickets (>=0)"];
  GA1.price = sortedArray[0]["Price Range"];
}

if (sortedArray.length > 1) {
  GA2.amount = sortedArray[1]["# of tickets (>=0)"];
  GA2.price = sortedArray[1]["Price Range"];
}

if (sortedArray.length > 2) {
  GA3.amount = sortedArray[2]["# of tickets (>=0)"];
  GA3.price = sortedArray[2]["Price Range"];
}

console.log("GA1:", GA1);
console.log("GA2:", GA2);
console.log("GA3:", GA3);
