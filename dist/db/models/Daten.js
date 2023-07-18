import mongoose from "mongoose";
const { Schema } = mongoose;
// const { Schema, connection } = mongoose;
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
    forwardPE: NumberOrNull,
    grossProfitTTM: NumberOrNull,
    marketCapitalization: NumberOrNull,
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
