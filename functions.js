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

      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////
      // Logic about collecting data for later 3 charts (if not possible then only two/one chart). 3 charts represent first 3 types of tickets. Usually there is 3 types of tickets. First are the cheapest, then more expensive, and then the most expensive. It's good to have that documented on charts, because it can easier evaluate tickets we want to buy.
      // If array (jsonArray) contains one of these names (FLOOR, GA, AG, GENADM) (it doen't matter for example if GA is GA1/GA2, or AG1/AG2, it has to be that prefix)
      const prefixes = ["FLOOR", "GA", "AG", "GENADM"];

      // TODO
      // DODAĆ KOMENTARZE DO FUNKCJI NIZEJ
      // ADD THESE COMMENTS:
      // We repeat this process for all the objects (cars) in the filteredArray (first box).

      // The filteredArray is the first box with all the cars (objects) that have different prices (colors) and numbers of tickets (stickers).
      const filteredArray = jsonArray.filter(
        (obj) =>
          obj.Type === "primary" &&
          prefixes.some((prefix) => obj.Section.startsWith(prefix))
      );
      // console.log("filteredArray", filteredArray);

      // Using .reduce() method to merge objects with the same 'Price Range'
      // We go through each object (car) in the filteredArray one by one.
      // The empty box is an empty array called accumulator. This will hold the combined objects (cars) with the same price (color).
      // We look into the accumulator (new box) to see if there's already an object (car) with the same Price Range (color) as the current object (car).
      const mergedArray = filteredArray.reduce((accumulator, current) => {
        const existingIndex = accumulator.findIndex(
          (item) => item["Price Range"] === current["Price Range"]
        );

        // If we find an object (car) with the same Price Range (color)
        if (existingIndex !== -1) {
          // Update the number of tickets by summing up the '# of tickets (>=0)' values
          // Add the current object's (car's) # of tickets (>=0) (stickers) to the existing object's (car's) # of tickets (>=0) (stickers). We also combine the Section values.
          accumulator[existingIndex]["# of tickets (>=0)"] =
            Number(accumulator[existingIndex]["# of tickets (>=0)"]) +
            Number(current["# of tickets (>=0)"]);

          // Merge the 'Section' values
          accumulator[existingIndex].Section =
            accumulator[existingIndex].Section + ", " + current.Section;
          // If we don't find an object (car) with the same Price Range (color), we put the current object (car) in the accumulator (new box) by itself.
        } else {
          // If the 'Price Range' is not in the accumulator array, add the current object
          accumulator.push(current);
        }

        // In the end, we have a new array (mergedArray) with objects (cars) of the same Price Range (color) together and the total number of # of tickets (>=0) (stickers) for each Price Range (color).
        return accumulator;
      }, []);

      console.log(mergedArray);

      // console.log("jsonArray from forEach loop:", jsonArray);
      return jsonArray;
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
