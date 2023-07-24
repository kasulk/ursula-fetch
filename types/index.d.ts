type NumberOrNull = number | null;

type MongooseConnectionOptions = ConnectOptions & {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

type ApiResponseOverview = {
  Address: string;
  AnalystTargetPrice: string;
  AssetType: string;
  Beta: string;
  BookValue: string;
  CIK: string;
  Currency: string;
  Country: string;
  Description: string;
  DilutedEPSTTM: string;
  DividendDate: string;
  DividendPerShare: string;
  DividendYield: string;
  EBITDA: string;
  EPS: string;
  EVToEBITDA: string;
  EVToRevenue: string;
  Exchange: string;
  ExDividendDate: string;
  FiscalYearEnd: string;
  ForwardPE: string;
  GrossProfitTTM: string;
  Industry: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  Name: string;
  OperatingMarginTTM: string;
  PEGRatio: string;
  PERatio: string;
  PriceToBookRatio: string;
  PriceToSalesRatioTTM: string;
  ProfitMargin: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenuePerShareTTM: string;
  RevenueTTM: string;
  Sector: string;
  SharesOutstanding: string;
  TrailingPE: string;
  //
  Note?: string; // AlphaVantage error message if request is bad
};

type ProcessedApiResponseOverview = {
  address: string;
  analystTargetPrice: NumberOrNull;
  assetType: string;
  beta: NumberOrNull;
  bookValue: NumberOrNull;
  cik: string;
  currency: string;
  country: string;
  description: string;
  dilutedEPSTTM: NumberOrNull;
  dividendDate: string;
  dividendPerShare: NumberOrNull;
  dividendYield: NumberOrNull;
  ebitda: NumberOrNull;
  eps: NumberOrNull;
  eps15x: NumberOrNull;
  evToEBITDA: NumberOrNull;
  evToRevenue: NumberOrNull;
  exchange: string;
  exDividendDate: string;
  fiscalYearEnd: string;
  forwardPE: NumberOrNull;
  grossProfitTTM: NumberOrNull;
  industry: string;
  latestQuarter: string;
  marketCapitalization: NumberOrNull;
  name: string;
  operatingMarginTTM: NumberOrNull;
  pegRatio: NumberOrNull;
  peRatio: NumberOrNull;
  priceToBookRatio: NumberOrNull;
  priceToSalesRatioTTM: NumberOrNull;
  profitMargin: NumberOrNull;
  quarterlyEarningsGrowthYOY: NumberOrNull;
  quarterlyRevenueGrowthYOY: NumberOrNull;
  returnOnAssetsTTM: NumberOrNull;
  returnOnEquityTTM: NumberOrNull;
  revenuePerShareTTM: NumberOrNull;
  revenueTTM: NumberOrNull;
  sector: string;
  sharesOutstanding: NumberOrNull;
  trailingPE: NumberOrNull;
};

// alphaVantage
type ApiResponseQuote = {
  "Global Quote": {
    "01. symbol": string; // e.g. "PETS";
    "02. open": string; // e.g. "13.9000";
    "03. high": string; // e.g. "13.9500";
    "04. low": string; // e.g. "13.5000";
    "05. price": string; // e.g. "13.5800";
    "06. volume": string; // e.g. "313821";
    "07. latest trading day": string; // e.g. "2023-07-21";
    "08. previous close": string; // e.g. "13.8000";
    "09. change": string; // e.g. "-0.2200";
    "10. change percent": string; // e.g. "-1.5942%";
  };
};

// alphaVantage
type ProcessedApiResponseQuote = {
  // symbol: string; // e.g. "PETS"
  ohlc: {
    open: NumberOrNull;
    high: NumberOrNull;
    low: NumberOrNull;
    close: NumberOrNull;
  };
  // price: NumberOrNull;
  volume: NumberOrNull;
  latestTradingDay: string; // e.g. 2023-07-23
  previousClose: NumberOrNull;
  change: string; // e.g. -0.2200
  changePercent: string; // e.g. -1.5942%
};

// twelveData
// type ApiResponseQuotes = {
//   symbol: string; // e.g. "PETS",
//   name: string; // e.g. "PetMed Express Inc",
//   exchange: string; // e.g. "NASDAQ",
//   mic_code: string; // e.g. "XNGS",
//   currency: string; // e.g. "USD",
//   datetime: string; // e.g. "2023-07-20",
//   timestamp: number; // e.g. 1689883199,
//   open: string; // e.g. "14.10000",
//   high: string; // e.g. "14.11000",
//   low: string; // e.g. "13.71000",
//   close: string; // e.g. "13.80000",
//   volume: string; // e.g. "231200",
//   previous_close: string; // e.g. "14.08000",
//   change: string; // e.g. "-0.28000",
//   percent_change: string; // e.g. "-1.98863",
//   average_volume: string; // e.g. "388850",
//   is_market_open: boolean; // e.g. false,
//   fifty_two_week: {
//     low: string; // e.g. "12.92000",
//     high: string; // e.g. "24.01000",
//     low_change: string; // e.g. "0.88000",
//     high_change: string; // e.g. "-10.21000",
//     low_change_percent: string; // e.g. "6.81115",
//     high_change_percent: string; // e.g. "-42.52395",
//     range: string; // e.g. "12.920000 - 24.010000",
//   };
// };

// twelveData
// type ProcessedApiResponseQuotes = {
//   // symbol: "PETS",
//   name: string; // e.g. "PetMed Express Inc",
//   exchange: string; // e.g. "NASDAQ",
//   mic_code: string; // e.g. "XNGS",
//   currency: string; // e.g. "USD",
//   datetime: string; // e.g. "2023-07-20",
//   timestamp: NumberOrNull; // e.g. 1689883199,
//   open: NumberOrNull; // e.g. "14.10000",
//   high: NumberOrNull; // e.g. "14.11000",
//   low: NumberOrNull; // e.g. "13.71000",
//   close: NumberOrNull; // e.g. "13.80000",
//   volume: NumberOrNull; // e.g. "231200",
//   previous_close: NumberOrNull; // e.g. "14.08000",
//   change: NumberOrNull; // e.g. "-0.28000",
//   percent_change: NumberOrNull; // e.g. "-1.98863",
//   average_volume: NumberOrNull; // e.g. "388850",
//   is_market_open: Boolean; // e.g. false,
//   fifty_two_week: {
//     low: NumberOrNull; // e.g. "12.92000",
//     high: NumberOrNull; // e.g. "24.01000",
//     low_change: NumberOrNull; // e.g. "0.88000",
//     high_change: NumberOrNull; // e.g. "-10.21000",
//     low_change_percent: NumberOrNull; // e.g. "6.81115",
//     high_change_percent: NumberOrNull; // e.g. "-42.52395",
//     range: String; // e.g. "12.920000 - 24.010000",
//   };
// };

type ApiResponseLogourls = {
  meta: {
    symbol: string; // e.g. "PETS",
    name: string; // e.g. "PetMed Express Inc",
  };
  url: string; // e.g. "https://api.twelvedata.com/logo/apple.com"
};

type ProcessedApiResponseLogourls = {
  // process meta to check whether is response is good or bad
  meta: {
    symbol: string; // e.g. "PETS",
  };
  logoURL: string; // e.g. "https://api.twelvedata.com/logo/apple.com"
};
