import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return temperature for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Amsterdam");
  });

  it("should return error message for an invalid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return error for missing city name", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("City name is required.");
  });
});
