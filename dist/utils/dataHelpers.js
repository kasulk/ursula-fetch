export function toNumberOrDashToNull(value) {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : null;
}
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
        trailingPE: toNumberOrDashToNull(data.TrailingPE), // e.g. "1372"
    };
}
export function processApiResponseQuotes(data) {
    return {
        // address: data.Address,
        // analystTargetPrice: toNumberOrDashToNull(data.AnalystTargetPrice),
        // symbol: "PETS",
        name: data.name,
        exchange: data.exchange,
        mic_code: data.mic_code,
        currency: data.currency,
        datetime: data.datetime,
        timestamp: data.timestamp,
        open: toNumberOrDashToNull(data.open),
        high: toNumberOrDashToNull(data.high),
        low: toNumberOrDashToNull(data.low),
        close: toNumberOrDashToNull(data.close),
        volume: toNumberOrDashToNull(data.volume),
        previous_close: toNumberOrDashToNull(data.previous_close),
        change: toNumberOrDashToNull(data.change),
        percent_change: toNumberOrDashToNull(data.percent_change),
        average_volume: toNumberOrDashToNull(data.average_volume),
        is_market_open: data.is_market_open,
        fifty_two_week: {
            low: toNumberOrDashToNull(data.fifty_two_week.low),
            high: toNumberOrDashToNull(data.fifty_two_week.high),
            low_change: toNumberOrDashToNull(data.fifty_two_week.low_change),
            high_change: toNumberOrDashToNull(data.fifty_two_week.high_change),
            low_change_percent: toNumberOrDashToNull(data.fifty_two_week.low_change_percent),
            high_change_percent: toNumberOrDashToNull(data.fifty_two_week.high_change_percent),
            range: data.fifty_two_week.range, // "12.920000 - 24.010000",
        },
    };
}
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
