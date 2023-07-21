import "dotenv/config";
import fetch from "node-fetch";
import mongoose from "mongoose";
import { processApiResponse } from "./utils/dataHelpers.js";
import Quote from "./db/models/Quote.js";
import logMessages from "./utils/consoleLogs.js";

const MONGODB_URI = process.env.MONGODB_URI; // || ''
const dataProvider = "TwelveData";
const dataFunction = "QUOTE";
const API_KEY = process.env.API_KEY_TD;
// const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY}&function=${dataFunction}&symbol=`;
const apiLink = `https://api.twelvedata.com/${dataFunction}?apikey=${API_KEY}&symbol=`;
const fetchInterval = 3 * 1000; // 15 seconds

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable not found.");
}

const mongooseConnectionOptions: MongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, mongooseConnectionOptions)
  .then(() => {
    console.log(logMessages.dbConnect.success);
  })
  .catch((error) => {
    console.error(logMessages.dbConnect.catchError, error);
  });
const db = mongoose.connection;

// Conduct API request and save data in db
async function requestAndSaveToDatabase() {
  try {
    // Find oldest dataset in the db
    const oldestDataset = await Quote.findOne().sort("updatedAt");
    const singleApiLink = apiLink + oldestDataset.ticker;

    if (oldestDataset) {
      // Conduct API request (with node-fetc)
      console.log(
        logMessages.fetching(dataProvider, dataFunction, oldestDataset.ticker)
      );
      const response = await fetch(singleApiLink);
      const data = (await response.json()) as ApiResponseQuotes;

      // Format data
      const processedData = processApiResponse(data);

      // If data is bad show error, and don't save to db
      if (!processedData.name) {
        console.log(
          logMessages.dbUpdate.error.badResponse(
            fetchInterval,
            oldestDataset.ticker
          )
        );
        // console.log(data.Note, "\n");
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
  }, fetchInterval);
}

// Connect to db and start request interval
db.on("error", console.error.bind(console, logMessages.dbConnect.error));
db.once("open", () => {
  console.log(logMessages.dbConnect.success);

  startRequestInterval();
});
