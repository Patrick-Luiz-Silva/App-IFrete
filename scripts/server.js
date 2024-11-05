import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(router);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
