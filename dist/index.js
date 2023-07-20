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
// const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=${dataFunction}&symbol=`;
const fetchInterval = 10 * 1000; // 15 seconds
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
    // console.log("MongoDB connected successfully!");
    console.log(logMessages.dbConnect.success);
})
    .catch((error) => {
    // console.error("MongoDB connection error:", error);
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
                console.log(
                // `--> Fetche AlphaVantage Overview-Daten fuer ${oldestDataset.ticker}`
                // `${logMessages.fetch} ${dataProvider} ${dataFunction}-Data for: ${oldestDataset.ticker}`
                logMessages.fetching(dataProvider, dataFunction, oldestDataset.ticker));
                const response = yield fetch(singleApiLink);
                const data = (yield response.json());
                // Format data
                const processedData = processApiResponse(data);
                // Save data
                //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
                oldestDataset.set(Object.assign({}, processedData));
                yield oldestDataset.save();
                console.log(
                // `Datensatz fuer ${oldestDataset.ticker} erfolgreich aktualisiert und gespeichert!`
                `${logMessages.dbUpdate.success} ${oldestDataset.ticker}!`);
            }
            else {
                console.log(
                // `Keine Daten fuer ${oldestDataset.ticker} in der Datenbank vorhanden.`
                `${logMessages.dbUpdate.elseError} ${oldestDataset.ticker}!`);
            }
            console.log(
            // `Warte ${fetchInterval / 1000} Sekunden bis zum naechsten fetch...`
            `${logMessages.fetchInterval(fetchInterval)}`);
        }
        catch (error) {
            // console.error("Fehler beim Aktualisieren und Speichern der Daten:", error);
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
        // }, 15000);
    }, fetchInterval);
}
// Connect to db and start request interval
db.on("error", 
// console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
console.error.bind(console, logMessages.dbConnect.error));
db.once("open", () => {
    // console.log("Verbunden mit Datenbank...");
    console.log(logMessages.dbConnect.success);
    startRequestInterval();
});
