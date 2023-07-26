import mongoose from "mongoose";
import { NumberOrNull } from "./_customSchemaTypes.js";
const { Schema } = mongoose;
// Mongoose-Modell für die zu speichernden Overview-Daten definieren
const overviewSchema = new Schema({
    // Symbol: { type: String, required: true },
    ticker: { type: String, required: true },
    // price: NumberOrNull, //! twelve data
    address: String,
    assetType: String,
    cik: String,
    country: String,
    currency: String,
    description: String,
    dividendDate: String,
    exchange: String,
    exDividendDate: String,
    fiscalYearEnd: String,
    industry: String,
    latestQuarter: String,
    name: String,
    sector: String,
    analystTargetPrice: NumberOrNull,
    beta: NumberOrNull,
    bookValue: NumberOrNull,
    dilutedEPSTTM: NumberOrNull,
    dividendPerShare: NumberOrNull,
    dividendYield: NumberOrNull,
    ebitda: NumberOrNull,
    eps: NumberOrNull,
    eps15x: NumberOrNull,
    evToEBITDA: NumberOrNull,
    evToRevenue: NumberOrNull,
    fiftyTwoWeekHigh: NumberOrNull,
    fiftyTwoWeekLow: NumberOrNull,
    forwardPE: NumberOrNull,
    grossProfitTTM: NumberOrNull,
    marketCapitalization: NumberOrNull,
    movingAverage50day: NumberOrNull,
    movingAverage200day: NumberOrNull,
    operatingMarginTTM: NumberOrNull,
    peRatio: NumberOrNull,
    pegRatio: NumberOrNull,
    priceToBookRatio: NumberOrNull,
    priceToSalesRatioTTM: NumberOrNull,
    profitMargin: NumberOrNull,
    quarterlyEarningsGrowthYOY: NumberOrNull,
    quarterlyRevenueGrowthYOY: NumberOrNull,
    returnOnAssetsTTM: NumberOrNull,
    returnOnEquityTTM: NumberOrNull,
    revenuePerShareTTM: NumberOrNull,
    revenueTTM: NumberOrNull,
    sharesOutstanding: NumberOrNull,
    trailingPE: NumberOrNull,
    // fiftyTwoWeekRange: string; // 'calculated'
    // 52WeekHigh: NumberOrNull, //! twelve data
    // 52WeekLow: NumberOrNull,//! twelve data
    // 50DayMovingAverage: NumberOrNull, //!twelve data
    // 200DayMovingAverage: NumberOrNull,//!twelve data
    //? _50DayMovingAverage: Number,
    //? _200DayMovingAverage: Number,
    // Bruchwert52Week: Number, // calculated
    // Favorites: [String], // Field "Favorites" is Array of Strings
    // logoURL: String, //! twelve data
}, 
// create timestamps for createdAt and updatedAt
{ timestamps: true } // https://mongoosejs.com/docs/timestamps.html
);
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Overview = mongoose.models.Overview || mongoose.model("Overview", overviewSchema);
export default Overview;
