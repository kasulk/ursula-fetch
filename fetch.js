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

function turnToNumberOrNull(value) {
  if (Number(value)) {
    return Number(value);
  }
  return null;
}

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
        assetType: data.AssetType, // e.g. "Common Stock"
        beta: data.Beta,
        bookValue: data.BookValue,
        cik: data.CIK, // ?
        currency: data.Currency, // e.g. "USD"
        country: data.Country, // e.g. "USA"
        description: data.Description,
        dilutedEPSTTM: data.DilutedEPSTTM,
        dividendDate: data.DividendDate, // e.g. "2023-06-12"
        dividendPerShare: data.DividendPerShare, // e.g. "1.2"
        dividendYield: data.DividendYield, // e.g. "0.0852"
        ebitda: data.EBITDA,
        eps: data.EPS,
        eps15x: (data.EPS * 15).toFixed(2),
        evToEBITDA: data.EVToEBITDA, // Enterprise Value to EBITDA (EV/EBITDA)
        evToRevenue: data.EVToRevenue, // Enterprise Value to Revenue (EV/R)
        exchange: data.Exchange, // e.g. "NASDAQ"
        exDividendDate: data.ExDividendDate, // e.g. "2023-06-05"
        fiscalYearEnd: data.FiscalYearEnd, // e.g. "March"
        forwardPE: data.ForwardPE,
        grossProfitTTM: data.GrossProfitTTM,
        industry: data.Industry, // e.g. "RETAIL-DRUG STORES AND PROPRIETARY STORES"
        latestQuarter: data.LatestQuarter, // e.g. "2023-03-31"
        marketCapitalization: data.MarketCapitalization, // e.g. "290498000"
        name: data.Name, // e.g. "PetMed Express Inc"
        operatingMarginTTM: data.OperatingMarginTTM,
        pegRatio: data.PEGRatio, // e.g. "2.58"
        peRatio: data.PERatio, // e.g. "1372"
        // priceToBookRatio: Number(data.PriceToBookRatio)
        //   ? // ? Number(data.PriceToBookRatio.toFixed(2))
        //     Number(data.PriceToBookRatio)
        //   : null,
        // priceToBookRatio: turnToNumberOrNull(data.PriceToBookRatio),
        priceToBookRatio: data.PriceToBookRatio,
        priceToSalesRatioTTM: data.PriceToSalesRatioTTM,
        profitMargin: data.ProfitMargin, // e.g. "0.0009"
        quarterlyEarningsGrowthYOY: data.QuarterlyEarningsGrowthYOY, // e.g. "-0.589"
        quarterlyRevenueGrowthYOY: data.QuarterlyRevenueGrowthYOY, // e.g. "-0.054"
        returnOnAssetsTTM: data.ReturnOnAssetsTTM, // e.g. "0.0031"
        returnOnEquityTTM: data.ReturnOnEquityTTM, // e.g. "0.0017"
        revenuePerShareTTM: data.RevenuePerShareTTM,
        revenueTTM: data.RevenueTTM, // e.g. "256858000"
        sector: data.Sector, // e.g. "TRADE & SERVICES"
        sharesOutstanding: data.SharesOutstanding, // e.g. "21173300"
        trailingPE: data.TrailingPE, // e.g. "1372"
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
