import supertest from "supertest";
import { app } from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return weather data for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("The weather in Amsterdam is");
  });

  it("should return an error if the city is not found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "BlaBlaBla" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return an error if no cityName is provided", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required!");
  });
});
