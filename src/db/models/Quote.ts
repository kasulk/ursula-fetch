import mongoose from "mongoose";
import { NumberOrNull } from "./_customSchemaTypes.js";

const { Schema } = mongoose;

const quoteSchema = new Schema(
  {
    ticker: { type: String, required: true },
    // ohlc: { type: Map, of: NumberOrNull },
    price: NumberOrNull,
    volume: NumberOrNull,
    latestTradingDay: String,
    previousClose: NumberOrNull,
    change: String,
    changePercent: String,
    // name: String,
    //name: { type: String, required: true },
    // type: String,
  },
  // create timestamps for createdAt and updatedAt
  { timestamps: true } // https://mongoosejs.com/docs/timestamps.html
);

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
