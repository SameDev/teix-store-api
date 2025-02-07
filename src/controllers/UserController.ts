import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json({ message: "Usuário cadastrado!", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await UserService.loginUser(email, password);
      res.json({ token, user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      await UserService.resetPassword(email, newPassword);
      res.json({ message: "Senha redefinida com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
