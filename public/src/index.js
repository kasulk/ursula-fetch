"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const mongoose_1 = __importDefault(require("mongoose"));
const Daten_js_1 = __importDefault(require("../public/db/models/Daten.js"));
const dataUtils_js_1 = require("../utils/dataUtils.js");
const API_KEY_AV = process.env.API_KEY_AV;
const apiLink = `https://www.alphavantage.co/query?apikey=${API_KEY_AV}&function=OVERVIEW&symbol=`;
const fetchIntervall = 3 * 1000; // 15 seconds
// Verbindung zur MongoDB-Datenbank herstellen
mongoose_1.default.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
// Funktion, um die API-Abfrage durchzuführen und die Daten zu speichern
function abfrageUndSpeichern() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ältesten Datensatz in der Datenbank finden
            const aeltesterDatensatz = yield Daten_js_1.default.findOne().sort("updatedAt");
            const singleApiLink = apiLink + aeltesterDatensatz.ticker;
            if (aeltesterDatensatz) {
                // API-Abfrage durchführen (mit node-fetch)
                console.log(`--> Fetche AlphaVantage Overview-Daten fuer ${aeltesterDatensatz.ticker}`);
                const response = yield (0, node_fetch_1.default)(singleApiLink);
                const data = yield response.json();
                // Daten speichern
                //! if the data from the API is the same as in the db, data won't be updated (incl. the timestamp!)
                aeltesterDatensatz.set({
                    // Felder entsprechend der API-Antwort setzen
                    // Beispiel: name: data.name,
                    // ...
                    address: data.Address,
                    analystTargetPrice: (0, dataUtils_js_1.toNumberOrDashToNull)(data.AnalystTargetPrice),
                    assetType: data.AssetType,
                    beta: (0, dataUtils_js_1.toNumberOrDashToNull)(data.Beta),
                    bookValue: (0, dataUtils_js_1.toNumberOrDashToNull)(data.BookValue),
                    cik: (0, dataUtils_js_1.toNumberOrDashToNull)(data.CIK),
                    currency: data.Currency,
                    country: data.Country,
                    description: data.Description,
                    dilutedEPSTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.DilutedEPSTTM),
                    dividendDate: data.DividendDate,
                    dividendPerShare: (0, dataUtils_js_1.toNumberOrDashToNull)(data.DividendPerShare),
                    dividendYield: (0, dataUtils_js_1.toNumberOrDashToNull)(data.DividendYield),
                    ebitda: (0, dataUtils_js_1.toNumberOrDashToNull)(data.EBITDA),
                    eps: (0, dataUtils_js_1.toNumberOrDashToNull)(data.EPS),
                    //! eps15x: (toNumberOrDashToNull(data.EPS) * 15).toFixed(2),
                    evToEBITDA: (0, dataUtils_js_1.toNumberOrDashToNull)(data.EVToEBITDA),
                    evToRevenue: (0, dataUtils_js_1.toNumberOrDashToNull)(data.EVToRevenue),
                    exchange: data.Exchange,
                    exDividendDate: data.ExDividendDate,
                    fiscalYearEnd: data.FiscalYearEnd,
                    forwardPE: (0, dataUtils_js_1.toNumberOrDashToNull)(data.ForwardPE),
                    grossProfitTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.GrossProfitTTM),
                    industry: data.Industry,
                    latestQuarter: data.LatestQuarter,
                    marketCapitalization: (0, dataUtils_js_1.toNumberOrDashToNull)(data.MarketCapitalization),
                    name: data.Name,
                    operatingMarginTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.OperatingMarginTTM),
                    pegRatio: (0, dataUtils_js_1.toNumberOrDashToNull)(data.PEGRatio),
                    peRatio: (0, dataUtils_js_1.toNumberOrDashToNull)(data.PERatio),
                    priceToBookRatio: (0, dataUtils_js_1.toNumberOrDashToNull)(data.PriceToBookRatio),
                    // priceToBookRatio: data.PriceToBookRatio,
                    priceToSalesRatioTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.PriceToSalesRatioTTM),
                    profitMargin: (0, dataUtils_js_1.toNumberOrDashToNull)(data.ProfitMargin),
                    quarterlyEarningsGrowthYOY: (0, dataUtils_js_1.toNumberOrDashToNull)(data.QuarterlyEarningsGrowthYOY),
                    quarterlyRevenueGrowthYOY: (0, dataUtils_js_1.toNumberOrDashToNull)(data.QuarterlyRevenueGrowthYOY),
                    returnOnAssetsTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.ReturnOnAssetsTTM),
                    returnOnEquityTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.ReturnOnEquityTTM),
                    revenuePerShareTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.RevenuePerShareTTM),
                    revenueTTM: (0, dataUtils_js_1.toNumberOrDashToNull)(data.RevenueTTM),
                    sector: data.Sector,
                    sharesOutstanding: (0, dataUtils_js_1.toNumberOrDashToNull)(data.SharesOutstanding),
                    trailingPE: (0, dataUtils_js_1.toNumberOrDashToNull)(data.TrailingPE), // e.g. "1372"
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
