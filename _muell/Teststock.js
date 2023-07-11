import mongoose from "mongoose";

const { Schema } = mongoose;

const teststockSchema = new Schema({
  //   ticker: { type: String, required: true },
  //   name: String,
  Symbol: { type: String, required: true },
  Price: Number,
  DataAsOf: String,
  AssetType: String,
  Name: String,
  Description: String,
  CIK: String,
  Exchange: String,
  Currency: String,
  Country: String,
  Sector: String,
  Industry: String,
  Address: String,
  FiscalYearEnd: String,
  LatestQuarter: String,
  MarketCapitalization: Number,
  EBITDA: Number,
  PERatio: Number,
  PEGRatio: Number,
  BookValue: Number,
  DividendPerShare: Number,
  DividendYield: Number,
  EPS: Number,
  EPSx15: Number,
  RevenuePerShareTTM: Number,
  ProfitMargin: Number,
  OperatingMarginTTM: Number,
  ReturnOnAssetsTTM: Number,
  ReturnOnEquityTTM: Number,
  RevenueTTM: Number,
  GrossProfitTTM: Number,
  DilutedEPSTTM: Number,
  QuarterlyEarningsGrowthYOY: Number,
  QuarterlyRevenueGrowthYOY: Number,
  AnalystTargetPrice: Number,
  TrailingPE: Number,
  ForwardPE: Number,
  PriceToSalesRatioTTM: Number,
  PriceToBookRatio: Number,
  EVToRevenue: Number,
  EVToEBITDA: Number,
  Beta: Number,
  // 52WeekHigh: Number,
  // 52WeekLow: Number,
  // 50DayMovingAverage: Number,
  // 200DayMovingAverage: Number,
  _52WeekHigh: Number,
  _52WeekLow: Number,
  _50DayMovingAverage: Number,
  _200DayMovingAverage: Number,
  SharesOutstanding: Number,
  DividendDate: String,
  ExDividendDate: String,
  //   Bruchwert52Week: Number,
  Favorites: [String], // Field "Favorites" is Array of Strings
  LogoURL: String,
  lastUpdated: Date,
});

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Teststock =
  mongoose.models.Teststock || mongoose.model("Teststock", teststockSchema);

export default Teststock;