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

      // Logic about collecting data for later 3 charts (if not possible then only two/one chart)
      // If array (jsonArray) contains one of these names (FLOOR, GA, AG, GENADM) (it doen't matter for example if GA is GA1/GA2, or AG1/AG2, it has to be that prefix)
      // Save in new array only elements with these type of names
      // In that new array
      const prefixes = ["FLOOR", "GA", "AG", "GENADM"];
      let GA1;
      let GA2;
      let GA3;

      // Pętla dla kadego obiektu danego biletu (np. koncert 50 Cent - GA 50, Resale 12, itd.)
      // Sprawdzamy czy właściwość 'Section' zaczyna się od jednej z wymienionych w tablicy 'prefixes'
      // To pozwala na wyciągnięcie danych o biletach TYLKO z tych 4 rodzajów biletów (FLOOR, GA, AG, GENADM)
      // Dodatkowo, wazne jest zeby pracować na biletach 'primary' a nie resale

      const filteredArray = jsonArray.filter(
        (obj) =>
          obj.Type === "primary" &&
          prefixes.some((prefix) => obj.Section.startsWith(prefix))
      );
      // console.log("filteredArray", filteredArray);

      // Teraz pracuję na tablicy która przefiltrowała i zwróciła tylko potrzebne wartości
      // Jeśli w tablicy kilku obiektów np. 2 obiekty mają takie same ceny, dodaj liczby biletów do siebie
      // Najpierw zwróć te obiekty których wartości są takie same

      // Use .reduce() method to merge objects with the same 'Price Range'
      const mergedArray = filteredArray.reduce((accumulator, current) => {
        const existingIndex = accumulator.findIndex(
          (item) => item["Price Range"] === current["Price Range"]
        );

        if (existingIndex !== -1) {
          // Update the number of tickets by summing up the '# of tickets (>=0)' values
          accumulator[existingIndex]["# of tickets (>=0)"] =
            Number(accumulator[existingIndex]["# of tickets (>=0)"]) +
            Number(current["# of tickets (>=0)"]);

          // Merge the 'Section' values
          accumulator[existingIndex].Section =
            accumulator[existingIndex].Section + ", " + current.Section;
        } else {
          // If the 'Price Range' is not in the accumulator array, add the current object
          accumulator.push(current);
        }

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
