import mongoose from "mongoose";
// const { Schema } = mongoose;
const { Schema, connection } = mongoose;
// Custom SchemaType, accepts number or null
// and returns number or null
const NumberOrNull = {
    type: Number,
    set: (value) => (typeof value === "number" ? value : null),
};
// Mongoose-Modell für die zu speichernden Daten definieren
const datenSchema = new Schema({
    // Symbol: { type: String, required: true },
    ticker: { type: String, required: true },
    // price: Number,
    assetType: String,
    name: String,
    description: String,
    cik: String,
    exchange: String,
    currency: String,
    country: String,
    sector: String,
    industry: String,
    address: String,
    fiscalYearEnd: String,
    latestQuarter: String,
    dividendDate: String,
    exDividendDate: String,
    marketCapitalization: NumberOrNull,
    ebitda: NumberOrNull,
    peRatio: NumberOrNull,
    pegRatio: NumberOrNull,
    bookValue: NumberOrNull,
    dividendPerShare: NumberOrNull,
    dividendYield: NumberOrNull,
    eps: NumberOrNull,
    eps15x: NumberOrNull,
    revenuePerShareTTM: NumberOrNull,
    profitMargin: NumberOrNull,
    operatingMarginTTM: NumberOrNull,
    returnOnAssetsTTM: NumberOrNull,
    returnOnEquityTTM: NumberOrNull,
    revenueTTM: NumberOrNull,
    grossProfitTTM: NumberOrNull,
    dilutedEPSTTM: NumberOrNull,
    quarterlyEarningsGrowthYOY: NumberOrNull,
    quarterlyRevenueGrowthYOY: NumberOrNull,
    analystTargetPrice: NumberOrNull,
    trailingPE: NumberOrNull,
    forwardPE: NumberOrNull,
    priceToSalesRatioTTM: NumberOrNull,
    priceToBookRatio: NumberOrNull,
    evToRevenue: NumberOrNull,
    evToEBITDA: NumberOrNull,
    sharesOutstanding: NumberOrNull,
    beta: NumberOrNull,
    // 52WeekHigh: Number, //! twelve data
    // 52WeekLow: Number,//! twelve data
    // 50DayMovingAverage: Number, //!twelve data
    // 200DayMovingAverage: Number,//!twelve data
    //? _50DayMovingAverage: Number,
    //? _200DayMovingAverage: Number,
    // Bruchwert52Week: Number,
    // Favorites: [String], // Field "Favorites" is Array of Strings
    // logoURL: String, //! twelve data
}, 
// create timestamps for createdAt and updatedAt
{ timestamps: true } // https://mongoosejs.com/docs/timestamps.html
);
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Daten = mongoose.models.Daten || mongoose.model("Daten", datenSchema);
export default Daten;
