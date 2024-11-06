import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) return res.status(403).json({ message: "Token não fornecido." });

    const token = authHeader.split(' ')[1]; // Extrair o token após "Bearer"

    if (!token) return res.status(403).json({ message: "Token não fornecido." });

    jwt.verify(token, 'secreta', (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido." });

        req.userId = decoded.id; // Armazena o ID decodificado no objeto de requisição para uso nas rotas
        next();
    });
};
