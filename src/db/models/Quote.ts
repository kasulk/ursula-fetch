import mongoose from "mongoose";

const { Schema } = mongoose;

const quoteSchema = new Schema(
  {
    ticker: { type: mongoose.Schema.Types.ObjectId, ref: "Daten" },
    quotes: Number,
  },
  { timestamps: true }
);

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
