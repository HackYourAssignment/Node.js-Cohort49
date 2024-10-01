import app from '../server.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  it('should return 400 if cityName is missing', async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('cityName is required');
  });

  it('should return 404 if cityName is invalid', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'invalidcity' });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('city not found');
  });

  it('should return temperature if cityName is valid', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('The temperature in London is');
  });
});
