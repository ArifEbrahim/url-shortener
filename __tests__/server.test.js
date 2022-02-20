const request = require("supertest");
const app = require("../server");

describe("POST /api/shorturl", () => {
  it("returns a JSON object when provided a url", async () => {
    const response = await request(app)
      .post("/api/shorturl")
      .send({ url_input: "http://www.apple.com/uk" });
    expect(response.body).toHaveProperty("original_url");
    expect(response.body.original_url).toEqual("http://www.apple.com/uk");
    expect(response.body).toHaveProperty("short_url");
    expect(response.body.short_url).toEqual(1);
  });
});

describe("GET /api/shorturl/:urlNumber", () => {
  it("redirects to the original page when the short url is visited", async () => {
    const response = await request(app).get("/api/shorturl/1");
    expect(response.statusCode).toEqual(302);
  });
});
