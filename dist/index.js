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
// import "dotenv";
// import * as dotenv from "dotenv";
import fetch from "node-fetch";
// import fetch from "../node_modules/node-fetch/@types/index";
import mongoose from "mongoose";
// import { toNumberOrDashToNull } from "./utils/dataUtils.js";
// import Daten from "./db/models/Daten";
import Daten from "./db/models/Daten.js";
// import path from "path";
// const envPath = path.resolve(__dirname, '../.env');
// dotenv.config({ path: envPath });
function toNumberOrDashToNull(value) {
    //  return Number(value) ? Number(value) : null;
    return value === "-" ? null : Number(value);
}
// const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_URI = process.env.MONGODB_URI;
console.log("mongoUri", MONGODB_URI);
const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const fetchIntervall = 3 * 1000; // 15 seconds
const mongooseConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Verbindung zur MongoDB-Datenbank herstellen
mongoose
    .connect(MONGODB_URI, mongooseConnectionOptions)
    .then(() => {
    console.log("MongoDB connected successfully!");
})
    .catch((error) => {
    console.error("MongoDB connection error:", error);
});
const db = mongoose.connection;
// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
function abfrageUndSpeichern() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ältesten Datensatz in der Datenbank finden
            const aeltesterDatensatz = yield Daten.findOne().sort("updatedAt");
            const singleApiLink = apiLink + aeltesterDatensatz.ticker;
            if (aeltesterDatensatz) {
                // API-Abfrage durchführen (mit node-fetch)
                console.log(`--> Fetche AlphaVantage Overview-Daten fuer ${aeltesterDatensatz.ticker}`);
                const response = yield fetch(singleApiLink);
                const data = (yield response.json());
                // Daten speichern
                //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
                aeltesterDatensatz.set({
                    // Felder entsprechend der API-Antwort setzen
                    // Beispiel: name: data.name,
                    // ...
                    address: data.Address,
                    analystTargetPrice: toNumberOrDashToNull(data.AnalystTargetPrice),
                    assetType: data.AssetType,
                    beta: toNumberOrDashToNull(data.Beta),
                    bookValue: toNumberOrDashToNull(data.BookValue),
                    cik: toNumberOrDashToNull(data.CIK),
                    currency: data.Currency,
                    country: data.Country,
                    description: data.Description,
                    dilutedEPSTTM: toNumberOrDashToNull(data.DilutedEPSTTM),
                    dividendDate: data.DividendDate,
                    dividendPerShare: toNumberOrDashToNull(data.DividendPerShare),
                    dividendYield: toNumberOrDashToNull(data.DividendYield),
                    ebitda: toNumberOrDashToNull(data.EBITDA),
                    eps: toNumberOrDashToNull(data.EPS),
                    //! eps15x: (toNumberOrDashToNull(data.EPS) * 15).toFixed(2),
                    evToEBITDA: toNumberOrDashToNull(data.EVToEBITDA),
                    evToRevenue: toNumberOrDashToNull(data.EVToRevenue),
                    exchange: data.Exchange,
                    exDividendDate: data.ExDividendDate,
                    fiscalYearEnd: data.FiscalYearEnd,
                    forwardPE: toNumberOrDashToNull(data.ForwardPE),
                    grossProfitTTM: toNumberOrDashToNull(data.GrossProfitTTM),
                    industry: data.Industry,
                    latestQuarter: data.LatestQuarter,
                    marketCapitalization: toNumberOrDashToNull(data.MarketCapitalization),
                    name: data.Name,
                    operatingMarginTTM: toNumberOrDashToNull(data.OperatingMarginTTM),
                    pegRatio: toNumberOrDashToNull(data.PEGRatio),
                    peRatio: toNumberOrDashToNull(data.PERatio),
                    priceToBookRatio: toNumberOrDashToNull(data.PriceToBookRatio),
                    // priceToBookRatio: data.PriceToBookRatio,
                    priceToSalesRatioTTM: toNumberOrDashToNull(data.PriceToSalesRatioTTM),
                    profitMargin: toNumberOrDashToNull(data.ProfitMargin),
                    quarterlyEarningsGrowthYOY: toNumberOrDashToNull(data.QuarterlyEarningsGrowthYOY),
                    quarterlyRevenueGrowthYOY: toNumberOrDashToNull(data.QuarterlyRevenueGrowthYOY),
                    returnOnAssetsTTM: toNumberOrDashToNull(data.ReturnOnAssetsTTM),
                    returnOnEquityTTM: toNumberOrDashToNull(data.ReturnOnEquityTTM),
                    revenuePerShareTTM: toNumberOrDashToNull(data.RevenuePerShareTTM),
                    revenueTTM: toNumberOrDashToNull(data.RevenueTTM),
                    sector: data.Sector,
                    sharesOutstanding: toNumberOrDashToNull(data.SharesOutstanding),
                    trailingPE: toNumberOrDashToNull(data.TrailingPE), // e.g. "1372"
                });
                yield aeltesterDatensatz.save();
                console.log(`Datensatz fuer ${aeltesterDatensatz.ticker} erfolgreich aktualisiert und gespeichert!`);
            }
            else {
                console.log(`Keine Daten fuer ${aeltesterDatensatz.ticker} in der Datenbank vorhanden.`);
            }
            console.log(`Warte ${fetchIntervall / 1000} Sekunden bis zum naechsten fetch...`);
        }
        catch (error) {
            console.error("Fehler beim Aktualisieren und Speichern der Daten:", error);
        }
    });
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
db.on("error", console.error.bind(console, "Fehler beim Verbinden mit der Datenbank:"));
db.once("open", () => {
    console.log("Verbunden mit Datenbank...");
    startAbfrageIntervall();
});
