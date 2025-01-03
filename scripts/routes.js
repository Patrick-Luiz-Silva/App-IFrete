import express from 'express';
import { connectDb, cadastrarCliente } from './dbConnection.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from './authMiddleware.js';

const app = express();
const router = express.Router();
app.use(router);
app.use(express.json());

async function startServer() {
    const dbConnect = await connectDb();

    // Rota para login
    router.post('/api/login', async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const collection = dbConnect.collection("usuarios");
            const usuario = await collection.findOne({ email });

            if (!usuario) {
                return res.status(401).json({ message: "Email não encontrado." });
            }

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            const token = jwt.sign(
                { id: usuario._id, email: usuario.email, perfil: usuario.perfil },
                'secreta',
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: "Login bem-sucedido!", token });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ message: "Erro ao processar o login." });
        }
    });

    // Rota para postar frete
    router.post('/api/postar', verifyToken, async (req, res) => {
        const { dataFrete, horario, enderecoColeta, enderecoDestino, tipoCarga, tipoVeiculo } = req.body;

        const token = req.headers['authorization'].split(' ')[1]; // Pega o token JWT do cabeçalho
        const decoded = jwt.verify(token, 'secreta'); // Decodifica o token
        const email = decoded.email; // Obtém o email do payload

        if (!dataFrete || !horario || !enderecoColeta || !enderecoDestino || !tipoCarga || !tipoVeiculo) {
            return res.status(400).json({ message: "Preencha todos os campos." });
        }

        try {
            const collection = dbConnect.collection("postagens");
            const postagem = await collection.insertOne({
                email,
                dataFrete,
                horario,
                enderecoColeta,
                enderecoDestino,
                tipoCarga,
                tipoVeiculo,
            });
            res.status(200).json({ id: postagem.insertedId, message: "Frete postado com sucesso!" });
        } catch (error) {
            console.error("Erro ao postar frete:", error);
            res.status(500).json({ message: "Erro ao postar frete." });
        }
    });

    // Rota de cadastro de usuário
    router.post('/api/cadastro', async (req, res) => {
        const { nome, email, senha, telefone, endereco, perfil } = req.body;

        if (!nome || !email || !senha || !telefone || !endereco) {
            console.error("Campos obrigatórios não preenchidos.");
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
        }

        const collection = dbConnect.collection("usuarios");
        const usuarioExistente = await collection.findOne({ email });
        if (usuarioExistente) {
            console.error("O email já está em uso!");
            return res.status(400).json({ message: "O email já está em uso." });
        }

        try {
            // Criptografar a senha
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hash(senha, salt);

            // Preparar o objeto cliente para inserir
            const agora = new Date();
            const offset = -3;
            const cliente = {
                nome,
                email,
                senha: senhaCriptografada,
                telefone,
                endereco,
                perfil,
                dataCadastro: new Date(agora.getTime() + offset * 60 * 60 * 1000).toUTCString(),
            };

            // Inserir o cliente na coleção usando a função cadastrarCliente
            const clienteId = await cadastrarCliente(cliente);
            // algum redirect com o 'clienteId'
            res.status(201).json({ id: clienteId, message: "Usuário cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({ message: "Erro ao cadastrar usuário." });
        }
    });

    // Rota de cadastro de veiculo
    router.post('/api/cadastro-veiculo', verifyToken, async (req, res) => {
        const { placa, marcaModelo, tipoCarroceria, capacidade } = req.body;

        const token = req.headers['authorization'].split(' ')[1]; // Pega o token JWT do cabeçalho
        const decoded = jwt.verify(token, 'secreta'); // Decodifica o token
        const email = decoded.email; // Obtém o email do payload

        if (!placa || !marcaModelo || !tipoCarroceria || !capacidade) {
            console.error("Campos obrigatórios não preenchidos.");
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
        }

        try {
            // Preparar o objeto cliente para inserir
            const collection = dbConnect.collection("veiculos");
            const veiculo = await collection.insertOne({
                placa,
                marcaModelo,
                tipoCarroceria,
                capacidade,
                email,
            });
            res.status(200).json({ id: veiculo.insertedId, message: "Veículo postado com sucesso!" });
        } catch (error) {
            console.error("Erro ao postar frete:", error);
            res.status(500).json({ message: "Erro ao cadastrar veículo." });
        }
    });

    // Rota para buscar todos os veículos do usuário autenticado
    router.get('/api/veiculos', verifyToken, async (req, res) => {
        try {
            const collection = dbConnect.collection("veiculos");
            
            // Busca todos os veículos pelo email do usuário autenticado
            const veiculos = await collection.find({ email: req.email }).toArray();

            if (veiculos.length === 0) {
                return res.status(404).json({ message: "Nenhum veículo cadastrado." });
            }

            return res.json(veiculos);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
            res.status(500).json({ message: "Erro ao buscar veículos." });
        }
    });

    // Rota para buscar todas as postagens
    router.get('/api/postagens', async (req, res) => {
        try {
            const collection = dbConnect.collection("postagens");
            
            // Busca todas as postagens
            const postagens = await collection.find().toArray();

            if (postagens.length === 0) {
                return res.status(404).json({ message: "Nenhuma postagem registrada." });
            }

            return res.json(postagens);
        } catch (error) {
            console.error("Erro ao buscar postagens:", error);
            res.status(500).json({ message: "Erro ao buscar postagens." });
        }
    });

    // Rota para atualizar o veículo do usuário autenticado
    router.put('/api/veiculo', verifyToken, async (req, res) => {
        const { placa, marcaModelo, tipoCarroceria, capacidade } = req.body;

        try {
            const collection = dbConnect.collection("veiculos");
            
            // Atualiza o veículo pelo email do usuário autenticado
            const result = await collection.updateOne(
                { email: req.email },
                { $set: { placa, marcaModelo, tipoCarroceria, capacidade } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Veículo não encontrado." });
            }

            res.json({ message: "Veículo atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar veículo:", error);
            res.status(500).json({ message: "Erro ao atualizar veículo." });
        }
    });

    // Rota para obter o perfil do usuário autenticado
    router.get('/api/perfil', verifyToken, async (req, res) => {
        try {
            const collection = dbConnect.collection("usuarios")
            const usuario = await collection.findOne({ _id: new ObjectId(req.userId) });

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const { nome, email, telefone, endereco } = usuario;
            res.json({ nome, email, telefone, endereco });
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            res.status(500).json({ message: "Erro ao buscar perfil." });
        }
    });

    // Rota para atualizar o perfil do usuário autenticado
    router.put('/api/perfil', verifyToken, async (req, res) => {
        const { nome, email, telefone, endereco } = req.body;

        try {
            const collection = dbConnect.collection("usuarios");
            const result = await collection.updateOne(
                { _id: new ObjectId(req.userId) },
                { $set: { nome, email, telefone, endereco } }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            res.json({ message: "Perfil atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            res.status(500).json({ message: "Erro ao atualizar perfil." });
        }
});
}

startServer();

export default router;
