const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  test("POST /api/auth/login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});