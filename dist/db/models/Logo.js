import mongoose from "mongoose";
const { Schema } = mongoose;
const logoSchema = new Schema({
    ticker: { type: mongoose.Schema.Types.ObjectId, ref: "Daten" },
    url: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, { timestamps: true });
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Logo = mongoose.models.Logo || mongoose.model("Logo", logoSchema);
export default Logo;
