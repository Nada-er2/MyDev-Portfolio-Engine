const request = require("supertest");
const app = require("../app");

describe("Projects API", () => {
  let token;

  beforeAll(async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "123456",
      });

    token = login.body.token;
  });

  test("POST /api/projects should create project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test Project")
      .field("description", "Test Description")
      .field(
        "technologies",
        JSON.stringify(["React", "Node"])
      )
      .field(
        "githubUrl",
        "https://github.com/test"
      );

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(
      "Test Project"
    );
  });
});