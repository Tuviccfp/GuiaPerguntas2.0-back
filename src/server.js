"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
require('./config/database');
const askSchema = require('./models/pergunta');
const responseModel = require('./models/resposta');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes server, rotas pertencente a sessão de perguntas.
route.get('/get-ask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchAsk = yield askSchema.find({}, null, { sort: { createdAt: -1 } });
        res.status(200).json(searchAsk);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
route.post('/save-ask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { titulo, descricao } = req.body;
    const ask = new askSchema({ titulo, descricao });
    try {
        yield ask.save();
        res.status(201).json(ask);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
route.get('/ask/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const askId = yield askSchema.findById(id);
        if (askId) {
            const response = yield responseModel.find({ perguntaId: askId.id });
            res.status(200).json({ askId, response });
        }
        else {
            res.status(404).json({ message: 'Error' });
        }
        // const responses = await responseModel.find({askId: id}).populate('askId')
        // const askAndResponse = {...askId.toJSON(), responses}
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
// Routes, server, rotas pertencente a sessão de respostas
route.get('/get-response', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchResponse = yield responseModel.find({});
        res.status(200).json(searchResponse);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
route.post('/save-response', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, perguntaId } = req.body;
    const response = new responseModel({ body, perguntaId });
    try {
        yield response.save();
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.use(route);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is open in port ${PORT}`);
});
