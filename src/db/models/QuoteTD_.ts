// import mongoose from "mongoose";
// import { NumberOrNull } from "./_customSchemaTypes.js";

// const { Schema } = mongoose;

// const quoteSchema = new Schema(
//   {
//     // ticker: { type: mongoose.Schema.Types.ObjectId, ref: "Daten" },
//     ticker: { type: String, required: true },
//     // symbol: "PETS",
//     // quotes: Number,
//     name: String, // e.g. "PetMed Express Inc",
//     exchange: String, // e.g. "NASDAQ",
//     mic_code: String, // e.g. "XNGS",
//     currency: String, // e.g. "USD",
//     datetime: Date, // e.g. "2023-07-20",
//     timestamp: NumberOrNull, // e.g. 1689883199,
//     open: NumberOrNull, // e.g. "14.10000",
//     high: NumberOrNull, // e.g. "14.11000",
//     low: NumberOrNull, // e.g. "13.71000",
//     close: NumberOrNull, // e.g. "13.80000",
//     volume: NumberOrNull, // e.g. "231200",
//     previous_close: NumberOrNull, // e.g. "14.08000",
//     change: NumberOrNull, // e.g. "-0.28000",
//     percent_change: NumberOrNull, // e.g. "-1.98863",
//     average_volume: NumberOrNull, // e.g. "388850",
//     is_market_open: Boolean, // e.g. false,
//     fifty_two_week: {
//       low: NumberOrNull, // e.g. "12.92000",
//       high: NumberOrNull, // e.g. "24.01000",
//       low_change: NumberOrNull, // e.g. "0.88000",
//       high_change: NumberOrNull, // e.g. "-10.21000",
//       low_change_percent: NumberOrNull, // e.g. "6.81115",
//       high_change_percent: NumberOrNull, // e.g. "-42.52395",
//       range: String, // e.g. "12.920000 - 24.010000",
//     },
//   },
//   // create timestamps for createdAt and updatedAt
//   { timestamps: true }
// );

// // check whether the model with this name has already been compiled and if yes, take the already compiled model
// const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

// export default Quote;
