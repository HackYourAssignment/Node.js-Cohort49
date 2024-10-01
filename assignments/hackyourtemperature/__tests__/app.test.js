const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("POST /weather", () => {
  it("should return the temperature for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("The temperature in London is");
  });

  it("should return an error if no cityName is provided", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "City name is required." });
  });

  it("should return 'City is not found!' for an invalid cityName", async () => {
    const response = await request.post("/weather").send({
      cityName: "GibberishCity",
    });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });
  it("should return 404 for an invalid method", async () => {
    const response = await request.get("/weather");
    expect(response.status).toBe(404);
  });
});
