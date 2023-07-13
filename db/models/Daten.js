import mongoose from "mongoose";
// import { connect, connection, Schema, model } from "mongoose";

// const { Schema } = mongoose;
const { Schema, connection } = mongoose;

// Custom SchemaType, turns '-' into null using a set-function
/* not used because need to calculate with some values to create
/  new/special values before storing them to the db...
const NumberAsNumberOrNull = {
  type: Number,
  set: (value) => (value === "-" ? null : value),
};
*/

// Custom SchemaType, accepts Number and/or null
const NumberOrNull = {
  type: Number,
  set: (value) => (value ? value : null),
};

// Mongoose-Modell für die zu speichernden Daten definieren
const datenSchema = new Schema(
  {
    // Symbol: { type: String, required: true },
    ticker: { type: String, required: true },
    // Price: Number,
    // DataAsOf: String,
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
    // marketCapitalization: Number,
    ebitda: NumberOrNull,
    peRatio: NumberOrNull,
    pegRatio: NumberOrNull,
    bookValue: NumberOrNull,
    dividendPerShare: NumberOrNull,
    dividendYield: NumberOrNull,
    eps: NumberOrNull,
    eps15x: NumberOrNull, // calulated
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
    // priceToBookRatio: Number,
    priceToBookRatio: NumberOrNull,
    evToRevenue: NumberOrNull,
    evToEBITDA: NumberOrNull,
    sharesOutstanding: NumberOrNull,
    beta: NumberOrNull,
    // 52WeekHigh: Number,
    // 52WeekLow: Number,
    // 50DayMovingAverage: Number,
    // 200DayMovingAverage: Number,
    //! get 52weekdata from twelvedata
    // _52WeekHigh: Number,
    // _52WeekLow: Number,
    //? _50DayMovingAverage: Number,
    //? _200DayMovingAverage: Number,
    // Bruchwert52Week: Number,
    // Favorites: [String], // Field "Favorites" is Array of Strings
    // logoURL: String, //! twelve data
    // lastUpdated: Date,
  },
  // create a timestamps for createdAt and updatedAt
  { timestamps: true } // https://mongoosejs.com/docs/timestamps.html
);

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Daten = mongoose.models.Daten || mongoose.model("Daten", datenSchema);

export default Daten;
