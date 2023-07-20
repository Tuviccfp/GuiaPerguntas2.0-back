"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const responseModel = new mongoose_1.Schema({
    body: {
        type: String,
        required: true,
    },
    perguntaId: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'pergunta',
            required: true
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = (0, mongoose_1.model)('resposta', responseModel);
