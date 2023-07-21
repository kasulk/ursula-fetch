import mongoose from "mongoose";
import { NumberOrNull } from "./_customSchemaTypes.js";
const { Schema } = mongoose;
const quoteSchema = new Schema({
    // ticker: { type: mongoose.Schema.Types.ObjectId, ref: "Daten" },
    ticker: { type: String, required: true },
    // symbol: "PETS",
    // quotes: Number,
    name: String,
    exchange: String,
    mic_code: String,
    currency: String,
    datetime: Date,
    timestamp: NumberOrNull,
    open: NumberOrNull,
    high: NumberOrNull,
    low: NumberOrNull,
    close: NumberOrNull,
    volume: NumberOrNull,
    previous_close: NumberOrNull,
    change: NumberOrNull,
    percent_change: NumberOrNull,
    average_volume: NumberOrNull,
    is_market_open: Boolean,
    fifty_two_week: {
        low: NumberOrNull,
        high: NumberOrNull,
        low_change: NumberOrNull,
        high_change: NumberOrNull,
        low_change_percent: NumberOrNull,
        high_change_percent: NumberOrNull,
        range: String, // e.g. "12.920000 - 24.010000",
    },
}, 
// create timestamps for createdAt and updatedAt
{ timestamps: true });
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
export default Quote;
