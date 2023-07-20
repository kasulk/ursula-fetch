export function toNumberOrDashToNull(value: string): NumberOrNull {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : null;
}

export function processApiResponse(data: ApiResponse): ProcessedApiResponse {
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
  };
}
