import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  async createUser(data: any) {
    return prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserByGoogleId(googleId: string) {
    return prisma.user.findUnique({ where: { googleId } });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUserPassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  }
}

export default new UserRepository();
