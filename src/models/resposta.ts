import {Schema, model, Document} from "mongoose";

interface Response extends Document {
    perguntaId: string,
    body: string,
    createdAt: Date;
}

const responseModel = new Schema<Response>({
    body: {
        type: String,
        required: true,
    },
    perguntaId: [{
        type: Schema.Types.ObjectId,
        ref: 'pergunta',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model<Response>('resposta', responseModel)