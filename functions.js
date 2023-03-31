const fs = require("fs");
const path = require("path");
const csvToJson = require("csvtojson");
const { filter } = require("async");

const concertsFileNames = [];
const concertDataPath = [];

const csvToObject = async function (folder) {
  // Files are being red by the function (FILE READER)
  const files = await new Promise((resolve, reject) => {
    fs.readdir(`./${folder}`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        // Jeśli nie ma żadnego błędu, do tablicy 'files' zostają dodane nazwy plików z rozszeżeniem csv
        resolve(files.filter((file) => path.extname(file) === ".csv"));
      }
    });
  });
  // console.log('Files:', files)

  // Logika która zwraca posortowane już obiekty JSON z plików CSV
  const jsonFiles = await Promise.all(
    // Praca na tablicy plików (a raczej na nazwach tablic plików, np. [ 'exportPrices (1).csv', 'exportPrices (2).csv', 'exportPrices.csv' ])
    files.map(async (file) => {
      // Pobranie ścieżki danego pliku
      const filePath = `./${folder}/${file}`;
      // Przeczytanie pliku CSV
      const fileData = await fs.promises.readFile(filePath, "utf8");
      // Zamiana pliku CSV na JSON
      const jsonArray = await csvToJson().fromString(fileData);
      // Przeczytanie statystyk pliku CSV (potrzebne do pobrania czasu utworzenia pliku)
      const fileStats = await fs.promises.stat(filePath);
      // Dodanie do pliku JSON zmiennej czasu utworzenia pliku
      jsonArray.fileCreationDate = fileStats.birthtime.toISOString();
      // console.log(jsonArray);
      // console.log(jsonArray.length);

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Logic about collecting data for later 3 charts (if not possible then only two/one chart). 3 charts represent first 3 types of tickets. Usually there are 3 types of tickets. First is the cheapest, then more expensive, and then the most expensive. It's good to have that documented on charts, because it can easier evaluate tickets we want to buy.
      const prefixes = ["FLOOR", "GA", "AG", "GENADM"];

      // The filteredArray is the first box with all the cars (objects) that have different prices (colors) and numbers of tickets (stickers).
      const filteredArray = jsonArray.filter(
        (obj) =>
          obj.Type === "primary" &&
          prefixes.some((prefix) => obj.Section.startsWith(prefix))
      );

      // Using .reduce() method to merge objects with the same 'Price Range'
      // .reduce() is being used for sorting different data points with the same price range
      // We go through each object in the filteredArray one by one.
      // The empty box is an empty array called accumulator. This will hold the combined objects with the same price.
      const mergedArray = filteredArray.reduce((accumulator, current) => {
        // We look into the accumulator (new box) to see if there's already an object with the same Price Range as the current object.
        const existingIndex = accumulator.findIndex(
          (item) => item["Price Range"] === current["Price Range"]
        );

        // If we find an object with the same Price Range
        if (existingIndex !== -1) {
          // Update the number of tickets by summing up the '# of tickets (>=0)' values
          // Add the current object's # of tickets (>=0) to the existing object's # of tickets (>=0). We also combine the Section values.

          // Getting the current number of tickets from the accumulator
          const currentTicketNumber = Number(
            accumulator[existingIndex]["# of tickets (>=0)"]
          );
          // Getting the additional ticket number from the current object
          const additionalTicketNumber = Number(current["# of tickets (>=0)"]);
          // Calculate the new ticket count by summing up the current and additional ticket count
          const newTicketNumber = currentTicketNumber + additionalTicketNumber;

          // Update the accumulator with the new ticket count
          accumulator[existingIndex]["# of tickets (>=0)"] = newTicketNumber;
          // Get the current section from the accumulator
          const currentSection = accumulator[existingIndex].Section;
          // Get the section from the current object
          const additionalSection = current.Section;
          // Combine the current and additional sections
          const combinedSection = `${currentSection}, ${additionalSection}`;
          // Update the accumulator with the combined sections
          accumulator[existingIndex].Section = combinedSection;

          // If we don't find an object with the same Price Range, we put the current object in the accumulator by itself.
        } else {
          // If the 'Price Range' is not in the accumulator array, add the current object
          accumulator.push(current);
        }
        // In the end, we have a new array (mergedArray) with objects (cars) of the same Price Range (color) together and the total number of # of tickets (>=0) (stickers) for each Price Range (color).
        return accumulator;
        // return jsonArray
      }, []);
      // Adding creation date time to JSON file and all available tickets
      mergedArray.fileCreationDate = fileStats.birthtime.toISOString();
      mergedArray.remainingTickets = remainingTickets(jsonArray);

      // // GA TICEKTS (GA1, GA2, GA3)
      // const sortedArray = mergedArray.sort((a, b) => {
      //   return (
      //     parseFloat(a["Price Range"].slice(1)) -
      //     parseFloat(b["Price Range"].slice(1))
      //   );
      // });
      // mergedArray.ga1 = {
      //   price: sortedArray[0]["Price Range"],
      //   amount: sortedArray[0]["# of tickets (>=0)"],
      // };
      // mergedArray.ga2 = {
      //   price: sortedArray[1]["Price Range"],
      //   amount: sortedArray[1]["# of tickets (>=0)"],
      // };
      // mergedArray.ga3 = {
      //   price: sortedArray[2]["Price Range"],
      //   amount: sortedArray[2]["# of tickets (>=0)"],
      // };

      console.log(
        "-------------------------------------------------------------------------------"
      );
      console.log("mergedArray", mergedArray);
      console.log("jsonArray", jsonArray);

      // return jsonArray;
      return mergedArray;
    })
  );

  // Posortowanie obiektów danych w końcowej tablicy
  const sortedPricesData = jsonFiles.sort((a, b) =>
    a.fileCreationDate.localeCompare(b.fileCreationDate)
  );

  return sortedPricesData;
};

// JSON Into Array of objects| 1. Read files | 2. Sort Files (by creation date)
const jsonToObject = async function (folder) {
  // Files are being red by the function (FILE READER)
  const files = await new Promise((resolve, reject) => {
    fs.readdir(`./${folder}`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.filter((file) => path.extname(file) === ".json"));
      }
    });
  });

  const concertData = await Promise.all(
    // Praca na każdym obiekcie z Tablicy 'files'
    files.map(async (file) => {
      // Zapisanie ścieżki pliku
      const filePath = `./${folder}/${file}`;
      // czytanie pliku JSON
      const fileData = await fs.promises.readFile(filePath, "utf8");
      // Zamiana pliku JSON na obiekt
      const concert = JSON.parse(fileData);
      // Zwrócenie obiektu (już nie JSON), żeby można było na nim przeprowadzić zmiany
      return concert;
    })
  );

  // Posortowanie obiektów danych w końcowej tablicy
  const sortedConcertData = concertData.sort((a, b) =>
    a.fileCreationDate.localeCompare(b.fileCreationDate)
  );

  // Zwrócenie posortowanych ścieżek w folderze z koncertami. Potrzebne do póżniejszego nadpisania danych
  sortedConcertData.forEach((element) => {
    concertDataPath.push(`./${folder}/${element.name}.json`);
  });
  // console.log('concertDataPath', concertDataPath)

  // Zwrócenie końcowego wyniku (posortowane dane)
  return sortedConcertData;
};

//////////////////////////////////////////////////////////////////////////////
// FIND MINIMUM PRICE FROM JSON OBJECT
function findMinPrice(data) {
  // Initialize a variable to store the minimum price found so far
  let minPrice = Infinity;

  // Loop through each item in the data array
  data.forEach((item) => {
    // Get the 'Price Range' value for the current item
    const price = item["Price Range"];

    // Check if the value starts with a "$" symbol
    if (typeof price !== "undefined") {
      if (price.startsWith("$")) {
        // If it does, extract the numeric value by slicing off the "$" symbol and converting it to a float
        const priceValue = parseFloat(price.slice(1));

        // Check if the numeric value is less than the current minimum price
        if (priceValue < minPrice) {
          // If it is, update the minimum price
          minPrice = priceValue;
        }
      }
    }
  });

  // Return the minimum price, formatted as a string with a "$" symbol
  return minPrice;
}

//////////////////////////////////////////////////////////////////////////////
// FUNCTION THAT FINDS OUT THE REMAINING AMOUNT OF TICKETS
const remainingTickets = function (data) {
  let remaining = 0;
  data.forEach((arg) => {
    if (arg.Type !== "resale") {
      const number = Number(arg["# of tickets (>=0)"]);
      remaining += number;
    }
  });
  return remaining;
};

//////////////////////////////////////////////////////////////////////////////
// CURRENT DATE (f.e 4/3 - fourth of march)
const dateFunction = function () {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day}/${month}`;
};

const isoDate = function () {
  const isoDate = new Date().toISOString().slice(0, 10);
  return isoDate;
};

// CHAT GPT
chatGPT = async function (apiKey) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Hello World!`,
    temperature: 1,
    max_tokens: 3000,
  });

  // console.log(response.data.choices[0].text.trim(0))
};

module.exports = {
  findMinPrice,
  remainingTickets,
  concertsFileNames,
  dateFunction,
  chatGPT,
  jsonToObject,
  csvToObject,
  isoDate,
  concertDataPath,
};
