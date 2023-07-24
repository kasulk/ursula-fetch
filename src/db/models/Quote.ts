import mongoose from "mongoose";

const { Schema } = mongoose;

const quoteSchema = new Schema({
  name: String,
  //name: { type: String, required: true },
  type: String,
});

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

export default Quote;
