import app from '../src/app.js';
import supertest from 'supertest';
import dotenv from 'dotenv';
import nock from 'nock';

describe('Hack Your Temperature API', () => {
  const request = supertest(app);
  dotenv.config();

  // Group for the home endpoint
  describe('GET /', () => {
    it('should return an introductory text about the API usage', async () => {
      const route = '/';

      const response = await request.get(route);

      const actual = response.text;
      const expected =
        'To get the weather make a post request to "/weather" with the body request {cityName: <city>}';
      expect(actual).toBe(expected);
    });
  });

  // Group for the weather endpoint
  describe('POST /weather', () => {
    it('should return the weather information for a known city: Amsterdam', async () => {
      const route = '/weather';
      const cityName = 'Amsterdam';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toMatch(/The temperature in/);
      expect(response.status).toEqual(200);
    });

    it('should return the weather information for a known city: London (case insensitive)', async () => {
      const route = '/weather';
      const cityName = 'lOnDoN';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toMatch(/The temperature in/);
      expect(response.status).toEqual(200);
    });

    it('should return 404 if the specified city is not found', async () => {
      const route = '/weather';
      const cityName = 'slks';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toMatch(
        new RegExp(`City: ${cityName}, is not found`),
      );
      expect(response.status).toEqual(404);
    });

    it('should return 400 if the request body is missing', async () => {
      const route = '/weather';

      const response = await request.post(route);

      expect(response.body.error).toEqual('Required information is missing');
      expect(response.status).toEqual(400);
    });

    it('should return 400 if cityName is not provided in the request body', async () => {
      const route = '/weather';

      const response = await request.post(route).send({});

      expect(response.body.error).toEqual('Required information is missing');
      expect(response.status).toEqual(400);
    });

    it('should return 400 if cityName is null', async () => {
      const route = '/weather';
      const cityName = null;

      const response = await request.post(route).send({ cityName });

      expect(response.body.error).toEqual('Required information is missing');
      expect(response.status).toEqual(400);
    });
  });

  // Group for wrong endpoints
  describe('Handling Invalid Endpoints', () => {
    it('should return 404 for a POST request to the root endpoint', async () => {
      const route = '/';
      const cityName = 'Amsterdam';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toBe(undefined);
      expect(response.status).toEqual(404);
    });

    it('should return 404 for a GET request to /weather', async () => {
      const route = '/weather';
      const cityName = 'Amsterdam';

      const response = await request.get(route).send({ cityName });

      expect(response.body.weatherText).toBe(undefined);
      expect(response.status).toEqual(404);
    });

    it('should return 404 for a POST request to /weather/cityName', async () => {
      const route = '/weather/Amsterdam';
      const cityName = 'Amsterdam';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toBe(undefined);
      expect(response.status).toEqual(404);
    });

    it('should return 404 for a random POST request to /random', async () => {
      const route = '/random';
      const cityName = 'Amsterdam';

      const response = await request.post(route).send({ cityName });

      expect(response.body.weatherText).toBe(undefined);
      expect(response.status).toEqual(404);
    });

    it('should return 404 for a random GET request to /random', async () => {
      const route = '/random';

      const response = await request.get(route);

      expect(response.body.weatherText).toBe(undefined);
      expect(response.status).toEqual(404);
    });
  });

  //Group for cases that requires mocking
  describe('simulate responses from Open Weather', () => {
    const cityName = 'Amsterdam';
    const baseUrl = 'https://api.openweathermap.org';
    const weatherEndpoint = '/data/2.5/weather';
    const query = {
      q: cityName,
      units: 'metric',
      appid: process.env.OPEN_WEATHER_API_KEY,
    };

    //to make a POST requests to /weather endpoint which fetch openWeather
    const makeWeatherRequest = async () => {
      return await request.post('/weather').send({ cityName });
    };

    afterEach(() => {
      nock.cleanAll();
    });

    it('should return 404 due to OpenWeather response missing required information', async () => {
      nock(baseUrl)
        .get(weatherEndpoint)
        .query(query)
        .reply(200, {
          main: {}, // Missing 'temp'
          weather: [{ description: 'clear sky' }],
          name: cityName,
        });

      const response = await makeWeatherRequest();

      expect(response.body.weatherText).toMatch(
        /City: Amsterdam, is not found!/,
      );
      expect(response.status).toEqual(404);
    });

    it('should return 404 due to empty response from OpenWeather', async () => {
      nock(baseUrl).get(weatherEndpoint).query(query).reply(200, null); // Null response body

      const response = await makeWeatherRequest();

      expect(response.body.weatherText).toMatch(
        /City: Amsterdam, is not found!/,
      );
      expect(response.status).toEqual(404);
    });
  });
});
