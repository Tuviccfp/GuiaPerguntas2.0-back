import mongoose from "mongoose";
const askSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    resposta: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resposta'   
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('pergunta', askSchema);