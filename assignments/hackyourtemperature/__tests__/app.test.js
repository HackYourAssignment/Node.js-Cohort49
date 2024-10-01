import app from "../app.js"; 
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return the weather for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Leiden" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Leiden"); 
    
    
    expect(response.body.weatherText).toMatch(/is \d+(\.\d+)?°C/); 
  });

  it("should return an error if city is not found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return an error if cityName is missing", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required");
  });
});
