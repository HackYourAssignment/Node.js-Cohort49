import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe("POST /weather", () => {
  it("should return the temperature for a valid city", async () => {
    const response = await request.post('/weather').send({ cityName: 'Haarlem' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toMatch(/The current temperature in Haarlem is/);
  });

  it("should return an error message for an invalid city", async () => {
    const response = await request.post('/weather').send({ cityName: 'InvalidCity' });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return an error if no city name is provided", async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required!");
  });
});
