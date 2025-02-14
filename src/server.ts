import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./config/googleAuth";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa o Passport
app.use(passport.initialize());

// Configura o Swagger
setupSwagger(app);

// Rotas de Usuário
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app; // Útil para testes automatizados
