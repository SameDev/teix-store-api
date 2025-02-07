import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";

class UserService {
  async registerUser(name: string, email: string, password: string) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) throw new Error("E-mail já cadastrado!");

    const hashedPassword = await bcrypt.hash(password, 10);
    return UserRepository.createUser({ name, email, password: hashedPassword });
  }

  async loginUser(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user || !user.password) throw new Error("Credenciais inválidas!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciais inválidas!");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    return { token, user };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) throw new Error("Usuário não encontrado!");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return UserRepository.updateUserPassword(user.id, hashedPassword);
  }
}

export default new UserService();
