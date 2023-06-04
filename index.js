//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// LIBRARIES
const fs = require("fs");
const functions = require("./functions");
const aws = require("./aws");

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Variables
const concertsArray = [];
const pricesArray = [];
const linksArray = [];

// For example 4/3 - Fourth of march
todaysDate = functions.dateFunction();
// console.log(todaysDate)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Results
async function printResults() {
  console.log("---------------------------------------------------------");
  console.log("---------------------------------------------------------");

  // Return an array with sorted JSON files from the 'prices' folder
  const pricesArray = await functions.csvToObject("prices");
  // console.log("Price Array:", pricesArray);
  // console.log("-------------------------------------------------------------");
  // console.log("Price Array 0:", pricesArray[0].remainingTickets);
  // console.log("-------------------------------------------------------------");

  // Return an array with sorted JSON files from the 'concerts' folder
  const concertsArray = await functions.jsonToObject("concerts");
  // console.log(concertsArray)

  // Passing links of concerts for webscraping in Google Chrome
  concertsArray.forEach((element) => {
    linksArray.push(element["url"]);
  });
  console.log(linksArray);
  console.log(linksArray.length);

  // Working on each object of the concerts array. This is where data is added and changes are saved
  const pricesToConcertsSave = async function () {
    for (let i = 0; i < concertsArray.length; i++) {
      // Check the last date argument for adding a date (5/3 or 10/3, etc.)
      const lastCheck =
        concertsArray[i].checkingDate[concertsArray[i].checkingDate.length - 1];

      // If there are dates about the price (they are defined),
      // and when today's date is different from the one that was checked
      // And if the 'Section' key has any value (it happens that it doesn't, i.e., '')
      // So if everything is ok, you can work on the data
      if (todaysDate !== lastCheck) {
        if (
          pricesArray[i]?.[0]?.Section !== undefined &&
          pricesArray[i]?.[0]?.Section !== ""
        ) {
          // Add today's date to the concert object
          concertsArray[i].checkingDate.push(todaysDate);

          // Add the number of remaining tickets to the concert object (primary tickets, not resale)
          concertsArray[i].availableTickets.push(
            pricesArray[i].remainingTickets
          );

          // Add the minimum ticket price to the concert object
          concertsArray[i].minPrice.push(
            functions.findMinPrice(pricesArray[i])
          );

          concertsArray[i].ga1.amount.push(Number(pricesArray[i].ga1.amount));
          concertsArray[i].ga2.amount.push(Number(pricesArray[i].ga2.amount));
          concertsArray[i].ga3.amount.push(Number(pricesArray[i].ga3.amount));

          concertsArray[i].ga1.price = pricesArray[i].ga1.price;
          concertsArray[i].ga2.price = pricesArray[i].ga2.price;
          concertsArray[i].ga3.price = pricesArray[i].ga3.price;

          // Convert the object to JSON
          const updatedJson = JSON.stringify(concertsArray[i]);
          // Overwrite the file with the new data
          fs.writeFileSync(functions.concertDataPath[i], updatedJson, "utf-8");
          // Else if concerts are already sold
        } else {
          // Add today's date to the concert object
          concertsArray[i].checkingDate.push(todaysDate);
          // Add the number of 0 tickets to the concert object (primary tickets, not resale)
          concertsArray[i].availableTickets.push(0);
          // Add the minimum ticket price to the concert object
          concertsArray[i].minPrice.push(0);
          // Convert the object to JSON
          const updatedJson = JSON.stringify(concertsArray[i]);
          // Overwrite the file with the new data
          fs.writeFileSync(functions.concertDataPath[i], updatedJson, "utf-8");
        }
      }
    }
    console.log("Concert Array", concertsArray);
    // console.log(concertsArray[1]);
  };
  // Working with AWS
  const awsWorkload = function () {
    aws.uploadFilesToS3("./concerts");
    aws.dynamoDBFunction("./concerts");
  };
  // pricesToConcertsSave();
  // awsWorkload();
}

printResults();

// functions.chatGPT(process.env.OPEN_AI_API)
