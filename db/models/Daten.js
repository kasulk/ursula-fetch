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
    marketCapitalization: Schema.Types.Mixed,
    ebitda: Schema.Types.Mixed,
    peRatio: Schema.Types.Mixed,
    pegRatio: Schema.Types.Mixed,
    bookValue: Schema.Types.Mixed,
    dividendPerShare: Schema.Types.Mixed,
    dividendYield: Schema.Types.Mixed,
    eps: Schema.Types.Mixed,
    eps15x: Schema.Types.Mixed, // calulated
    revenuePerShareTTM: Schema.Types.Mixed,
    profitMargin: Schema.Types.Mixed,
    operatingMarginTTM: Schema.Types.Mixed,
    returnOnAssetsTTM: Schema.Types.Mixed,
    returnOnEquityTTM: Schema.Types.Mixed,
    revenueTTM: Schema.Types.Mixed,
    grossProfitTTM: Schema.Types.Mixed,
    dilutedEPSTTM: Schema.Types.Mixed,
    quarterlyEarningsGrowthYOY: Schema.Types.Mixed,
    quarterlyRevenueGrowthYOY: Schema.Types.Mixed,
    analystTargetPrice: Schema.Types.Mixed,
    trailingPE: Schema.Types.Mixed,
    forwardPE: Schema.Types.Mixed,
    priceToSalesRatioTTM: Schema.Types.Mixed,
    // priceToBookRatio: Number,
    priceToBookRatio: Schema.Types.Mixed,
    evToRevenue: Schema.Types.Mixed,
    evToEBITDA: Schema.Types.Mixed,
    beta: Schema.Types.Mixed,
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
    sharesOutstanding: Schema.Types.Mixed,
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
