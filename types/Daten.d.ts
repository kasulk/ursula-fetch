type NumberOrNull = number | null;

type DatenModel = {
  // Symbol: { type: String, required: true },
  ticker: string;
  // Price: Number,
  // DataAsOf: String,
  assetType: String;
  name: String;
  description: String;
  cik: String;
  exchange: String;
  currency: String;
  country: String;
  sector: String;
  industry: String;
  address: String;
  fiscalYearEnd: String;
  latestQuarter: String;
  dividendDate: String;
  exDividendDate: String;
  marketCapitalization: NumberOrNull;
  // marketCapitalization: Number,
  ebitda: NumberOrNull;
  peRatio: NumberOrNull;
  pegRatio: NumberOrNull;
  bookValue: NumberOrNull;
  dividendPerShare: NumberOrNull;
  dividendYield: NumberOrNull;
  eps: NumberOrNull;
  eps15x: NumberOrNull; // calulated
  revenuePerShareTTM: NumberOrNull;
  profitMargin: NumberOrNull;
  operatingMarginTTM: NumberOrNull;
  returnOnAssetsTTM: NumberOrNull;
  returnOnEquityTTM: NumberOrNull;
  revenueTTM: NumberOrNull;
  grossProfitTTM: NumberOrNull;
  dilutedEPSTTM: NumberOrNull;
  quarterlyEarningsGrowthYOY: NumberOrNull;
  quarterlyRevenueGrowthYOY: NumberOrNull;
  analystTargetPrice: NumberOrNull;
  trailingPE: NumberOrNull;
  forwardPE: NumberOrNull;
  priceToSalesRatioTTM: NumberOrNull;
  // priceToBookRatio: Number,
  priceToBookRatio: NumberOrNull;
  evToRevenue: NumberOrNull;
  evToEBITDA: NumberOrNull;
  sharesOutstanding: NumberOrNull;
  beta: NumberOrNull;
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
};

export default DatenModel;
