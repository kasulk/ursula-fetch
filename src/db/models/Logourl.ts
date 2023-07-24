import mongoose from "mongoose";

const { Schema } = mongoose;

const logourlSchema = new Schema(
  {
    // ticker: { type: mongoose.Schema.Types.ObjectId, ref: "Daten", required: true },
    ticker: { type: String, required: true },
    name: String,
    logoURL: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Logourl =
  mongoose.models.Logourl || mongoose.model("Logourl", logourlSchema);

export default Logourl;
