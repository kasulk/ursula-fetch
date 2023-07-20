// import Daten from "../db/models/Daten";
// export function toNumberOrDashToNull(value: string): number | null {
export function toNumberOrDashToNull(value) {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) ? parsedValue : null;
}
export function processApiResponse(data) {
    // export function processData(data: ApiResponse): ApiResponse
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
