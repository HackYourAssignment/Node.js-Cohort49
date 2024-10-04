import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return city not found message for an invalid city", async () => {
    const response = await request.post("/weather").send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return temperature for a valid city", async () => {
    const response = await request.post("/weather").send({ cityName: "Amsterdam" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("The temperature in Amsterdam");
  });
});
