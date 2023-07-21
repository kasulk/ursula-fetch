const logMessages = {
  dbConnect: {
    success: "MongoDB connected successfully!",
    error: "MongoDB connection error:",
    catchError: "MongoDB connection (catch) error:",
  },
  fetching: function (
    dataProvider: string,
    dataFunction: string,
    ticker: string
  ): string {
    return `\n---> Fetching ${dataProvider} ${dataFunction.toUpperCase()}-Data for:\t ${ticker}`;
  },
  dbUpdate: {
    success: "SUCCESS! Dataset updated for:",
    error: {
      else: "ERROR! No data found in db for:",
      badResponse: function (length: number, ticker: string): string {
        return `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        BAD RESPONSE!! Data for *** ${ticker} *** not updated in DB! Trying again in ${
          length / 1000
        } seconds...\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n`;
      },
    },
  },
  fetchInterval: function (length: number): string {
    return `Waiting ${length / 1000} seconds until next fetch...`;
  },
  dbRequest: {
    catchError: "Error while fetching, updating and saving the requested data!",
  },
};

export default logMessages;
