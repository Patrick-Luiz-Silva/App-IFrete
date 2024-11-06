import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://wordshinigam:ospkdGbRGygD16no@clustertests.cneui.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTests";
const clientDb = new MongoClient(uri);

export async function connectDb() {
    try {
        await clientDb.connect();
        console.log("Conectado ao MongoDB");
        const db = clientDb.db("ifrete");
        return db.collection("usuarios");
    } catch (e) {
        console.error(e);
        throw e;
    } 
}

export async function cadastrarCliente(cliente) {
    const collection = await connectDb();
    try {
        const result = await collection.insertOne(cliente);
        return result.insertedId;
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        throw error;
    }
}

