import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    favoriteStocks: { type: [String] },
}, { timestamps: true });
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
