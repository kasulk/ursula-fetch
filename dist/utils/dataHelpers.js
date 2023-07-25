export function toNumberOrDashToNull(value) {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : null;
}
// alphaVantage
export function processApiResponseOverview(data) {
    return {
        address: data.Address,
        analystTargetPrice: toNumberOrDashToNull(data.AnalystTargetPrice),
        assetType: data.AssetType,
        beta: toNumberOrDashToNull(data.Beta),
        bookValue: toNumberOrDashToNull(data.BookValue),
        cik: data.CIK,
        currency: data.Currency,
        country: data.Country,
        description: data.Description,
        dilutedEPSTTM: toNumberOrDashToNull(data.DilutedEPSTTM),
        dividendDate: data.DividendDate,
        dividendPerShare: toNumberOrDashToNull(data.DividendPerShare),
        dividendYield: toNumberOrDashToNull(data.DividendYield),
        ebitda: toNumberOrDashToNull(data.EBITDA),
        eps: toNumberOrDashToNull(data.EPS),
        eps15x: toNumberOrDashToNull(data.EPS) === null ? null : Number(data.EPS) * 15,
        evToEBITDA: toNumberOrDashToNull(data.EVToEBITDA),
        evToRevenue: toNumberOrDashToNull(data.EVToRevenue),
        exchange: data.Exchange,
        exDividendDate: data.ExDividendDate,
        fiscalYearEnd: data.FiscalYearEnd,
        forwardPE: toNumberOrDashToNull(data.ForwardPE),
        grossProfitTTM: toNumberOrDashToNull(data.GrossProfitTTM),
        industry: data.Industry,
        latestQuarter: data.LatestQuarter,
        marketCapitalization: toNumberOrDashToNull(data.MarketCapitalization),
        name: data.Name,
        operatingMarginTTM: toNumberOrDashToNull(data.OperatingMarginTTM),
        pegRatio: toNumberOrDashToNull(data.PEGRatio),
        peRatio: toNumberOrDashToNull(data.PERatio),
        priceToBookRatio: toNumberOrDashToNull(data.PriceToBookRatio),
        priceToSalesRatioTTM: toNumberOrDashToNull(data.PriceToSalesRatioTTM),
        profitMargin: toNumberOrDashToNull(data.ProfitMargin),
        quarterlyEarningsGrowthYOY: toNumberOrDashToNull(data.QuarterlyEarningsGrowthYOY),
        quarterlyRevenueGrowthYOY: toNumberOrDashToNull(data.QuarterlyRevenueGrowthYOY),
        returnOnAssetsTTM: toNumberOrDashToNull(data.ReturnOnAssetsTTM),
        returnOnEquityTTM: toNumberOrDashToNull(data.ReturnOnEquityTTM),
        revenuePerShareTTM: toNumberOrDashToNull(data.RevenuePerShareTTM),
        revenueTTM: toNumberOrDashToNull(data.RevenueTTM),
        sector: data.Sector,
        sharesOutstanding: toNumberOrDashToNull(data.SharesOutstanding),
        trailingPE: toNumberOrDashToNull(data.TrailingPE),
        // because of beginning numbers...
        fiftyTwoWeekHigh: toNumberOrDashToNull(data["52WeekHigh"]),
        fiftyTwoWeekLow: toNumberOrDashToNull(data["52WeekLow"]),
        // fiftyTwoWeekRange: data["52WeekHigh"] + "-" + data["52WeekLow"], //! removed; better process during rendering in the frontend...
        // fiftyTwoWeekBruchwert: //! need current price...
        movingAverage50day: toNumberOrDashToNull(data["50DayMovingAverage"]),
        movingAverage200day: toNumberOrDashToNull(data["200DayMovingAverage"]),
    };
}
// alphaVantage
export function processApiResponseQuote(data) {
    return {
        // symbol: data["Global Quote"]["01. symbol"]; // e.g. "PETS"
        // open: toNumberOrDashToNull(data["Global Quote"]["02. open"]),
        // high: toNumberOrDashToNull(data["Global Quote"]["03. high"]),
        // low: toNumberOrDashToNull(data["Global Quote"]["04. low"]),
        price: toNumberOrDashToNull(data["Global Quote"]["05. price"]),
        volume: toNumberOrDashToNull(data["Global Quote"]["06. volume"]),
        latestTradingDay: data["Global Quote"]["07. latest trading day"],
        previousClose: toNumberOrDashToNull(data["Global Quote"]["08. previous close"]),
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
export function processApiResponseLogourls(data) {
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
