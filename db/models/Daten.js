import mongoose from "mongoose";
// import { connect, connection, Schema, model } from "mongoose";

// const { Schema } = mongoose;
const { Schema, connection } = mongoose;

// Custom Type turns '-' into null using a set-function
const NumberOrDashToNullType = {
  type: Number,
  set: (value) => (value === "-" ? null : value),
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
    marketCapitalization: NumberOrDashToNullType,
    ebitda: NumberOrDashToNullType,
    peRatio: NumberOrDashToNullType,
    pegRatio: NumberOrDashToNullType,
    bookValue: NumberOrDashToNullType,
    dividendPerShare: NumberOrDashToNullType,
    dividendYield: NumberOrDashToNullType,
    eps: NumberOrDashToNullType,
    eps15x: NumberOrDashToNullType, // calulated
    revenuePerShareTTM: NumberOrDashToNullType,
    profitMargin: NumberOrDashToNullType,
    operatingMarginTTM: NumberOrDashToNullType,
    returnOnAssetsTTM: NumberOrDashToNullType,
    returnOnEquityTTM: NumberOrDashToNullType,
    revenueTTM: NumberOrDashToNullType,
    grossProfitTTM: NumberOrDashToNullType,
    dilutedEPSTTM: NumberOrDashToNullType,
    quarterlyEarningsGrowthYOY: NumberOrDashToNullType,
    quarterlyRevenueGrowthYOY: NumberOrDashToNullType,
    analystTargetPrice: NumberOrDashToNullType,
    trailingPE: NumberOrDashToNullType,
    forwardPE: NumberOrDashToNullType,
    priceToSalesRatioTTM: NumberOrDashToNullType,
    // priceToBookRatio: Number,
    priceToBookRatio: NumberOrDashToNullType,
    evToRevenue: NumberOrDashToNullType,
    evToEBITDA: NumberOrDashToNullType,
    beta: NumberOrDashToNullType,
    // 52WeekHigh: Number,
    // 52WeekLow: Number,
    // 50DayMovingAverage: Number,
    // 200DayMovingAverage: Number,
    //! get 52weekdata from twelvedata
    // _52WeekHigh: Number,
    // _52WeekLow: Number,
    //? _50DayMovingAverage: Number,
    //? _200DayMovingAverage: Number,
    //
    sharesOutstanding: NumberOrDashToNullType,
    dividendDate: String,
    exDividendDate: String,
    //
    //   Bruchwert52Week: Number,
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
