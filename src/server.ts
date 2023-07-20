import express from "express";
import cors from 'cors';
import { Router, Request, Response } from 'express'
const app = express();
const route = Router();
require('./config/database');
const askSchema = require('./models/pergunta');
const responseModel = require('./models/resposta');
app.use(express.json());
app.use(cors());

// Routes server, rotas pertencente a sessão de perguntas.
route.get('/get-ask', async (req: Request, res: Response) => {
    try {
        let searchAsk = await askSchema.find({}, null, { sort: {createdAt: -1}});
        res.status(200).json(searchAsk);
    } catch (error) {
        res.status(500).json(error)
    }
})
route.post('/save-ask', async (req: Request, res: Response) => {
    let { titulo, descricao } = req.body;
    const ask = new askSchema({titulo, descricao})
    try {
        await ask.save();
        res.status(201).json(ask);
    } catch (error) {
        res.status(500).json(error);
    }
})
route.get('/ask/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const askId = await askSchema.findById(id)
        if(askId) {
            const response = await responseModel.find({perguntaId: askId.id}, null, { sort: {createdAt: -1}})
            res.status(200).json({ askId, response })
        } else {
            res.status(404).json({message: 'Error'})
        }
        // const responses = await responseModel.find({askId: id}).populate('askId')
        // const askAndResponse = {...askId.toJSON(), responses}
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

// Routes, server, rotas pertencente a sessão de respostas
route.post('/save-response',async (req: Request, res: Response) => {
    const { body, perguntaId } = req.body;
    const response = new responseModel({ body, perguntaId })
    try {
        await response.save();
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.use(route);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is open in port ${PORT}`)
})