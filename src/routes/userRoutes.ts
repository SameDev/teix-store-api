import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import UserController from "../controllers/UserController";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       description: Dados do usuário para cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samuel"
 *               email:
 *                 type: string
 *                 example: "samuel@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Erro no cadastro.
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       description: Credenciais do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "samuel@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna token e dados do usuário.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Redefine a senha de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       description: E-mail do usuário e nova senha
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "samuel@example.com"
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Erro na redefinição da senha.
 */
router.post("/reset-password", UserController.resetPassword);

/**
 * @swagger
 * /api/users/google:
 *   get:
 *     summary: Inicia a autenticação com o Google
 *     tags: [Usuários]
 *     responses:
 *       302:
 *         description: Redireciona para a página de login do Google.
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @swagger
 * /api/users/google/callback:
 *   get:
 *     summary: Callback da autenticação com o Google
 *     tags: [Usuários]
 *     responses:
 *       302:
 *         description: Redireciona para o front-end com o token JWT.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Após autenticação com sucesso, gera o token JWT.
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    // Redireciona para o front-end com o token na query string (ajuste conforme necessário)
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);

export default router;
