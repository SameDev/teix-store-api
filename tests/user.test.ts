// tests/user.test.ts

import request from "supertest";
import app from "../src/server"; // Certifique-se que seu server.ts exporta o app

describe("User Endpoints", () => {
  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "test123",
  };

  // Registra o usuário
  it("deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toEqual(testUser.email);
  });

  // Realiza o login do usuário
  it("deve logar o usuário cadastrado", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toEqual(testUser.email);
  });

  // Testa a rota de autenticação com Google (apenas verificando o redirecionamento)
  it("deve redirecionar para a página de login do Google", async () => {
    const res = await request(app).get("/api/users/google");
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toContain("accounts.google.com");
  });
});
