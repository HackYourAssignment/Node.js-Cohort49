import app from '../app.js'; 
import supertest from 'supertest';

const request = supertest(app);

describe("POST /weather", () => {
  it("should return temperature for a valid city", async () => {
    const response = await request.post('/weather').send({ cityName: 'Amsterdam' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toMatch(/The temperature in Amsterdam is/);
  });

  it("should return an error for missing cityName", async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('cityName is required');
  });

  it("should return an error for an invalid city", async () => {
    const response = await request.post('/weather').send({ cityName: 'InvalidCityName' });
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
