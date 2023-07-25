export function toNumberOrDashToNull(value: string): NumberOrNull {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : null;
}

// alphaVantage
export function processApiResponseOverview(
  data: ApiResponseOverview
): ProcessedApiResponseOverview {
  return {
    address: data.Address,
    analystTargetPrice: toNumberOrDashToNull(data.AnalystTargetPrice),
    assetType: data.AssetType, // e.g. "Common Stock"
    beta: toNumberOrDashToNull(data.Beta),
    bookValue: toNumberOrDashToNull(data.BookValue),
    cik: data.CIK, // central index key; unique identifier assigned by the SEC
    currency: data.Currency, // e.g. "USD"
    country: data.Country, // e.g. "USA"
    description: data.Description,
    dilutedEPSTTM: toNumberOrDashToNull(data.DilutedEPSTTM),
    dividendDate: data.DividendDate, // e.g. "2023-06-12"
    dividendPerShare: toNumberOrDashToNull(data.DividendPerShare), // e.g. "1.2"
    dividendYield: toNumberOrDashToNull(data.DividendYield), // e.g. "0.0852"
    ebitda: toNumberOrDashToNull(data.EBITDA),
    eps: toNumberOrDashToNull(data.EPS),
    eps15x:
      toNumberOrDashToNull(data.EPS) === null ? null : Number(data.EPS) * 15,
    evToEBITDA: toNumberOrDashToNull(data.EVToEBITDA), // Enterprise Value to EBITDA (EV/EBITDA)
    evToRevenue: toNumberOrDashToNull(data.EVToRevenue), // Enterprise Value to Revenue (EV/R)
    exchange: data.Exchange, // e.g. "NASDAQ"
    exDividendDate: data.ExDividendDate, // e.g. "2023-06-05"
    fiscalYearEnd: data.FiscalYearEnd, // e.g. "March"
    forwardPE: toNumberOrDashToNull(data.ForwardPE),
    grossProfitTTM: toNumberOrDashToNull(data.GrossProfitTTM),
    industry: data.Industry, // e.g. "RETAIL-DRUG STORES AND PROPRIETARY STORES"
    latestQuarter: data.LatestQuarter, // e.g. "2023-03-31"
    marketCapitalization: toNumberOrDashToNull(data.MarketCapitalization), // e.g. "290498000"
    name: data.Name, // e.g. "PetMed Express Inc"
    operatingMarginTTM: toNumberOrDashToNull(data.OperatingMarginTTM),
    pegRatio: toNumberOrDashToNull(data.PEGRatio), // e.g. "2.58"
    peRatio: toNumberOrDashToNull(data.PERatio), // e.g. "1372"
    priceToBookRatio: toNumberOrDashToNull(data.PriceToBookRatio),
    priceToSalesRatioTTM: toNumberOrDashToNull(data.PriceToSalesRatioTTM),
    profitMargin: toNumberOrDashToNull(data.ProfitMargin), // e.g. "0.0009"
    quarterlyEarningsGrowthYOY: toNumberOrDashToNull(
      data.QuarterlyEarningsGrowthYOY
    ), // e.g. "-0.589"
    quarterlyRevenueGrowthYOY: toNumberOrDashToNull(
      data.QuarterlyRevenueGrowthYOY
    ), // e.g. "-0.054"
    returnOnAssetsTTM: toNumberOrDashToNull(data.ReturnOnAssetsTTM), // e.g. "0.0031"
    returnOnEquityTTM: toNumberOrDashToNull(data.ReturnOnEquityTTM), // e.g. "0.0017"
    revenuePerShareTTM: toNumberOrDashToNull(data.RevenuePerShareTTM),
    revenueTTM: toNumberOrDashToNull(data.RevenueTTM), // e.g. "256858000"
    sector: data.Sector, // e.g. "TRADE & SERVICES"
    sharesOutstanding: toNumberOrDashToNull(data.SharesOutstanding), // e.g. "21173300"
    trailingPE: toNumberOrDashToNull(data.TrailingPE), // e.g. "1372"
    // because of beginning numbers...
    fiftyTwoWeekHigh: toNumberOrDashToNull(data["52WeekHigh"]),
    fiftyTwoWeekLow: toNumberOrDashToNull(data["52WeekLow"]),
    movingAverage50day: toNumberOrDashToNull(data["50DayMovingAverage"]),
    movingAverage200day: toNumberOrDashToNull(data["200DayMovingAverage"]),
  };
}

// alphaVantage
export function processApiResponseQuote(
  data: ApiResponseQuote
): ProcessedApiResponseQuote {
  return {
    // symbol: data["Global Quote"]["01. symbol"]; // e.g. "PETS"
    // open: toNumberOrDashToNull(data["Global Quote"]["02. open"]),
    // high: toNumberOrDashToNull(data["Global Quote"]["03. high"]),
    // low: toNumberOrDashToNull(data["Global Quote"]["04. low"]),
    price: toNumberOrDashToNull(data["Global Quote"]["05. price"]), // = close
    volume: toNumberOrDashToNull(data["Global Quote"]["06. volume"]),
    latestTradingDay: data["Global Quote"]["07. latest trading day"],
    previousClose: toNumberOrDashToNull(
      data["Global Quote"]["08. previous close"]
    ),
    change: data["Global Quote"]["09. change"],
    changePercent: data["Global Quote"]["10. change percent"],
  };
}

// twelveData
// export function processApiResponseQuotes(
//   data: ApiResponseQuotes
// ): ProcessedApiResponseQuotes {
//   return {
//     // address: data.Address,
//     // analystTargetPrice: toNumberOrDashToNull(data.AnalystTargetPrice),
//     // symbol: "PETS",
//     name: data.name, // "PetMed Express Inc",
//     exchange: data.exchange, // "NASDAQ",
//     mic_code: data.mic_code, // "XNGS",
//     currency: data.currency, // "USD",
//     datetime: data.datetime, // "2023-07-20",
//     timestamp: data.timestamp, // 1689883199,
//     open: toNumberOrDashToNull(data.open), // "14.10000",
//     high: toNumberOrDashToNull(data.high), // "14.11000",
//     low: toNumberOrDashToNull(data.low), // "13.71000",
//     close: toNumberOrDashToNull(data.close), // "13.80000",
//     volume: toNumberOrDashToNull(data.volume), // "231200",
//     previous_close: toNumberOrDashToNull(data.previous_close), // "14.08000",
//     change: toNumberOrDashToNull(data.change), // "-0.28000",
//     percent_change: toNumberOrDashToNull(data.percent_change), // "-1.98863",
//     average_volume: toNumberOrDashToNull(data.average_volume), // "388850",
//     is_market_open: data.is_market_open, // false,
//     fifty_two_week: {
//       low: toNumberOrDashToNull(data.fifty_two_week.low), // "12.92000",
//       high: toNumberOrDashToNull(data.fifty_two_week.high), // "24.01000",
//       low_change: toNumberOrDashToNull(data.fifty_two_week.low_change), // "0.88000",
//       high_change: toNumberOrDashToNull(data.fifty_two_week.high_change), //"-10.21000",
//       low_change_percent: toNumberOrDashToNull(
//         data.fifty_two_week.low_change_percent
//       ), // "6.81115",
//       high_change_percent: toNumberOrDashToNull(
//         data.fifty_two_week.high_change_percent
//       ), // "-42.52395",
//       range: data.fifty_two_week.range, // "12.920000 - 24.010000",
//     },
//   };
// }

// twelveData
export function processApiResponseLogourls(
  data: ApiResponseLogourls
): ProcessedApiResponseLogourls {
  return {
    meta: {
      symbol: data.meta.symbol,
    },
    logoURL:
      // if no logourl is provided by api, insert default logourl
      data.url ||
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  };
}
