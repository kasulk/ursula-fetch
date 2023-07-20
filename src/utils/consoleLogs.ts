const logMessages = {
  dbConnect: {
    success: "MongoDB connected successfully!",
    error: "MongoDB connection error:",
    catchError: "MongoDB connection (catch) error:",
  },
  //   fetch: "--> Fetching",
  fetching: function (
    dataProvider: string,
    dataFunction: string,
    ticker: string
  ): string {
    return `---> Fetching ${dataProvider} ${dataFunction}-Data for: ${ticker}`;
  },
  dbUpdate: {
    success: "SUCCESS! Dataset updated for:",
    elseError: "ERROR! No data found in db for:",
  },
  fetchInterval: function (length: number): string {
    return `Waiting ${length / 1000} seconds until next fetch...`;
  },
  dbRequest: {
    catchError: "Error while fetching, updating and saving the requested data!",
  },
};

export default logMessages;
