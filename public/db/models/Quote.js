"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const quoteSchema = new Schema({
    ticker: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Daten" },
    quotes: Number,
}, { timestamps: true });
// check whether the model with this name has already been compiled and if yes, take the already compiled model
const Quote = mongoose_1.default.models.Quote || mongoose_1.default.model("Quote", quoteSchema);
exports.default = Quote;
