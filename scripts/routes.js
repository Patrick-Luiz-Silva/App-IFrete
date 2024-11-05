import express from 'express';
import { connectDb } from './dbConnection.js';

const router = express.Router();

router.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha, telefone, endereco, perfil } = req.body;

    if (!nome || !email || !senha || !telefone || !endereco) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
    }

    try {
        const collection = await connectDb();
        const agora = new Date();
        const offset = -3;
        const result = await collection.insertOne({
            nome,
            email,
            senha,
            telefone,
            endereco,
            perfil,
            dataCadastro: new Date(agora.getTime() + offset * 60 * 60 * 1000).toUTCString(),
        });
        res.status(201).json({ id: result.insertedId, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
});

export default router;
