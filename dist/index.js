var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import fetch from "node-fetch";
import mongoose from "mongoose";
import { processApiResponse } from "./utils/dataHelpers.js";
import Daten from "./db/models/Daten.js";
import logMessages from "./utils/consoleLogs.js";
const MONGODB_URI = process.env.MONGODB_URI; // || ''
const dataProvider = "AlphaVantage";
const dataFunction = "OVERVIEW";
const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=${dataFunction}&symbol=`;
const fetchInterval = 3 * 1000; // 15 seconds
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable not found.");
}
const mongooseConnectionOptions = {
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
function requestAndSaveToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find oldest dataset in the db
            const oldestDataset = yield Daten.findOne().sort("updatedAt");
            const singleApiLink = apiLink + oldestDataset.ticker;
            if (oldestDataset) {
                // Conduct API request (with node-fetc)
                console.log(logMessages.fetching(dataProvider, dataFunction, oldestDataset.ticker));
                const response = yield fetch(singleApiLink);
                const data = (yield response.json());
                // Format data
                const processedData = processApiResponse(data);
                // If data is bad show error, and don't save to db
                if (!processedData.name) {
                    console.log(logMessages.dbUpdate.error.badResponse(fetchInterval, oldestDataset.ticker));
                    console.log(data.Note, "\n");
                    return;
                }
                // Save data
                //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
                oldestDataset.set(Object.assign({}, processedData));
                yield oldestDataset.save();
                console.log(`${logMessages.dbUpdate.success} ${oldestDataset.ticker}!`);
            }
            else {
                console.log(`${logMessages.dbUpdate.error.else} ${oldestDataset.ticker}!`);
            }
            console.log(`${logMessages.fetchInterval(fetchInterval)}`);
        }
        catch (error) {
            console.error(logMessages.dbRequest.catchError, error);
        }
    });
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
