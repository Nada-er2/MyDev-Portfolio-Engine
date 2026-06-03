const request = require("supertest");
const app = require("../app");

describe("Projects API", () => {
  test("GET /api/projects should return 200", async () => {
    const res = await request(app)
      .get("/api/projects");

    expect(res.statusCode).toBe(200);
  });
});