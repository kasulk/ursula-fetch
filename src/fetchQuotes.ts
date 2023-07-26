import "dotenv/config";
import fetch from "node-fetch";
import mongoose from "mongoose";
import { processApiResponseQuote } from "./utils/dataHelpers.js";
import logMessages from "./utils/consoleLogs.js";
import Quote from "./db/models/Quote.js";
import { db } from "./db/connect.js";

const API_KEY = process.env.API_KEY_AV;
const dataProvider = "AlphaVantage";
const dataFunction = "GLOBAL_QUOTE";
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY}&function=${dataFunction}&symbol=`;
// const fetchInterval = 13 * 1000; // free: 13 seconds; ~5 per minute
const fetchInterval = 2.1 * 1000; // premium: 2.1 seconds; ~30 per minute
let requestCount = 0;
// const dailyRequestLimit = 100; // free
const dailyRequestLimit = 99999; // premium

// Conduct API request and save data in db
async function requestAndSaveToDatabase() {
  try {
    // Find oldest dataset in the db
    const oldestDataset = await Quote.findOne().sort("updatedAt");
    const singleApiLink = apiLink + oldestDataset.ticker;

    if (oldestDataset) {
      // Conduct API request (with node-fetch)
      console.log(
        logMessages.fetching(dataProvider, dataFunction, oldestDataset.ticker)
      );

      const response = await fetch(singleApiLink);
      const data = (await response.json()) as ApiResponseQuote;
      requestCount++;

      // Format data
      const processedData = processApiResponseQuote(data);

      // Show counter
      console.log(`Requested fetches: ${requestCount}/${dailyRequestLimit}`);

      // If data is bad show error, and don't save to db
      if (!processedData.price) {
        console.log(
          logMessages.dbUpdate.error.badResponse(
            fetchInterval,
            oldestDataset.ticker
          )
        );
        console.log(data, "\n");

        return;
      }

      // Save data
      //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
      oldestDataset.set({
        ...processedData,
      });
      await oldestDataset.save();

      console.log(`${logMessages.dbUpdate.success} ${oldestDataset.ticker}!`);
    } else {
      console.log(
        `${logMessages.dbUpdate.error.else} ${oldestDataset.ticker}!`
      );
    }
    console.log(`${logMessages.fetchInterval(fetchInterval)}`);
  } catch (error) {
    console.error(logMessages.dbRequest.catchError, error);
  }
}

// Conduct API request in interval
function startRequestInterval() {
  // Conduct initial API-request
  requestAndSaveToDatabase();

  // Start request interval every x seconds
  setInterval(() => {
    requestAndSaveToDatabase();
    // stop script, if daily limit is reached
    if (requestCount === dailyRequestLimit) {
      console.log(
        logMessages.requestLimit.limitReached(
          dailyRequestLimit,
          dataProvider,
          dataFunction
        )
      );
      console.log(logMessages.requestLimit.stopScript);
      process.exit(0); // successful exit with exit-code 0
    }
  }, fetchInterval);
}

// Connect to db and start request interval
db.on("error", console.error.bind(console, logMessages.dbConnect.error));
db.once("open", () => {
  console.log(logMessages.dbConnect.success);

  startRequestInterval();
});
