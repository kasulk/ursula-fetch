import "dotenv/config";
import fetch from "node-fetch";
import mongoose, { ConnectOptions } from "mongoose";
import { processApiResponse } from "./utils/dataHelpers.js";
import Daten from "./db/models/Daten.js";

const MONGODB_URI = process.env.MONGODB_URI; // || ''
const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const fetchInterval = 10 * 1000; // 15 seconds

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
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
const db = mongoose.connection;

// Conduct API request and save data in db
async function requestAndSaveToDatabase() {
  try {
    // Find oldest dataset in the db
    const oldestDataset = await Daten.findOne().sort("updatedAt");
    const singleApiLink = apiLink + oldestDataset.ticker;

    if (oldestDataset) {
      // Conduct API request (with node-fetc)
      console.log(
        `--> Fetche AlphaVantage Overview-Daten fuer ${oldestDataset.ticker}`
      );
      const response = await fetch(singleApiLink);
      const data = (await response.json()) as ApiResponse;

      // Format data
      const processedData = processApiResponse(data);

      // Save data
      //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
      oldestDataset.set({
        ...processedData,
      });
      await oldestDataset.save();

      console.log(
        `Datensatz fuer ${oldestDataset.ticker} erfolgreich aktualisiert und gespeichert!`
      );
    } else {
      console.log(
        `Keine Daten fuer ${oldestDataset.ticker} in der Datenbank vorhanden.`
      );
    }
    console.log(
      `Warte ${fetchInterval / 1000} Sekunden bis zum naechsten fetch...`
    );
  } catch (error) {
    console.error("Fehler beim Aktualisieren und Speichern der Daten:", error);
  }
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
db.on(
  "error",
  console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
);
db.once("open", () => {
  console.log("Verbunden mit Datenbank...");
  startRequestInterval();
});
