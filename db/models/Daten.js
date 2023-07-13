import mongoose from "mongoose";
// import { connect, connection, Schema, model } from "mongoose";

// const { Schema } = mongoose;
const { Schema, connection } = mongoose;

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
    marketCapitalization: Number,
    ebitda: Number,
    peRatio: Number,
    pegRatio: Number,
    bookValue: Number,
    dividendPerShare: Number,
    dividendYield: Number,
    eps: Number,
    eps15x: Number, // calulated
    revenuePerShareTTM: Number,
    profitMargin: Number,
    operatingMarginTTM: Number,
    returnOnAssetsTTM: Number,
    returnOnEquityTTM: Number,
    revenueTTM: Number,
    grossProfitTTM: Number,
    dilutedEPSTTM: Number,
    quarterlyEarningsGrowthYOY: Number,
    quarterlyRevenueGrowthYOY: Number,
    analystTargetPrice: Number,
    trailingPE: Number,
    forwardPE: Number,
    priceToSalesRatioTTM: Number,
    // priceToBookRatio: Number,
    priceToBookRatio: Schema.Types.Mixed,
    evToRevenue: Number,
    evToEBITDA: Number,
    beta: Number,
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
    sharesOutstanding: Number,
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
