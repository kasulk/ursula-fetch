// require("dotenv").config();
import "dotenv/config";
import fetch from "node-fetch";
// import { connect, connection, Schema, model } from "mongoose";
// import connect, connection, Schema, model from "mongoose";
import connection from "mongoose";
import Daten from "./db/models/Daten.js";
import mongoose from "mongoose";
// import Daten from "../db/models/Daten";

const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const fetchIntervall = 3 * 1000; // 15 seconds

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Mongoose-Modell für die zu speichernden Daten definieren
//! wird von db/models/Daten.js importiert
// const DatenSchema = new mongoose.Schema({
//   link: String,
//   lastUpdated: Date,
// });
// const Daten = mongoose.model("Daten", DatenSchema);

// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
async function abfrageUndSpeichern() {
  try {
    // Ältesten Datensatz in der Datenbank finden
    const aeltesterDatensatz = await Daten.findOne().sort("updatedAt");
    // const singleApiLink = apiLink + aeltesterDatensatz.Symbol;
    const singleApiLink = apiLink + aeltesterDatensatz.ticker;

    // console.log(aeltesterDatensatz);

    if (aeltesterDatensatz) {
      // API-Abfrage durchführen (mit node-fetch)
      console.log(
        // `Fetche AlphaVantage Overview-Daten fuer ${aeltesterDatensatz.Symbol}`
        `Fetche AlphaVantage Overview-Daten fuer ${aeltesterDatensatz.ticker}`
      );
      // const response = await fetch(aeltesterDatensatz.link);  //! chatti
      const response = await fetch(singleApiLink);
      const data = await response.json();
      // console.log("fetched data:", data);

      // Daten speichern und den lastUpdated-Zeitstempel aktualisieren
      //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
      aeltesterDatensatz.set({
        // lastUpdated: Date.now(), // note: dank timestamp in mongoose model nicht mehr noetig...
        // Felder entsprechend der API-Antwort setzen
        // Beispiel: name: data.name,
        // ...
        address: data.Address,
        analystTargetPrice: data.AnalystTargetPrice,
        assetType: data.AssetType,
        bookValue: data.BookValue,
        cik: data.CIK,
        currency: data.Currency,
        country: data.Country,
        description: data.Description,
        dilutedEPSTTM: data.DilutedEPSTTM,
        dividendPerShare: data.DividendPerShare,
        dividendYield: data.DividendYield,
        ebitda: data.EBITDA,
        eps: data.EPS,
        eps15x: (data.EPS * 15).toFixed(2),
        exchange: data.Exchange,
        fiscalYearEnd: data.FiscalYearEnd,
        forwardPE: data.ForwardPE,
        grossProfitTTM: data.GrossProfitTTM,
        industry: data.Industry,
        latestQuarter: data.LatestQuarter,
        marketCapitalization: data.MarketCapitalization,
        name: data.Name,
        operatingMarginTTM: data.OperatingMarginTTM,
        pegRatio: data.PEGRatio,
        peRatio: data.PERatio,
        priceToBookRatio: data.PriceToBookRatio,
        priceToSalesRatioTTM: data.PriceToSalesRatioTTM,
        profitMargin: data.ProfitMargin,
        quarterlyEarningsGrowthYOY: data.QuarterlyEarningsGrowthYOY,
        quarterlyRevenueGrowthYOY: data.QuarterlyRevenueGrowthYOY,
        returnOnAssetsTTM: data.ReturnOnAssetsTTM,
        returnOnEquityTTM: data.ReturnOnEquityTTM,
        revenuePerShareTTM: data.RevenuePerShareTTM,
        revenueTTM: data.RevenueTTM,
        sector: data.Sector,
        trailingPE: data.TrailingPE,
      });
      await aeltesterDatensatz.save();

      console.log(
        `Datensatz fuer ${aeltesterDatensatz.ticker} erfolgreich aktualisiert und gespeichert!`
      );
    } else {
      console.log(
        `Keine Daten fuer ${aeltesterDatensatz.ticker} in der Datenbank vorhanden.`
      );
    }
    console.log(
      `Warte ${fetchIntervall / 1000} Sekunden bis zum naechsten fetch...`
    );
  } catch (error) {
    console.error("Fehler beim Aktualisieren und Speichern der Daten:", error);
  }
}

// Funktion, um die API-Abfrage in einem Intervall auszuführen
function startAbfrageIntervall() {
  // Initial eine API-Abfrage durchführen
  abfrageUndSpeichern();

  // Abfrage-Intervall alle 15 Sekunden starten
  setInterval(() => {
    abfrageUndSpeichern();
    // }, 15000);
  }, fetchIntervall);
}

// Verbindung zur Datenbank herstellen und Abfrage-Intervall starten
db.on(
  "error",
  console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:")
);
db.once("open", () => {
  console.log("Verbunden mit Datenbank...");
  startAbfrageIntervall();
});
