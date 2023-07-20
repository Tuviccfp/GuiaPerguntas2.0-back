"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const askSchema = new mongoose_1.default.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    resposta: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'resposta'
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose_1.default.model('pergunta', askSchema);
