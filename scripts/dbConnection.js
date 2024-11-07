import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://wordshinigam:ospkdGbRGygD16no@clustertests.cneui.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTests";
const clientDb = new MongoClient(uri);
const dbConnect = await connectDb();

export async function connectDb() {
    try {
        await clientDb.connect();
        const db = clientDb.db("ifrete");
        console.log("Conectado ao MongoDB");
        return db;
    } catch (e) {
        console.error(e);
        throw e;
    } 
}

export async function cadastrarCliente(cliente) {
    try {
        const collection = dbConnect.collection("usuarios");
        const result = await collection.insertOne(cliente);
        return result.insertedId;
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        throw error;
    }
}

