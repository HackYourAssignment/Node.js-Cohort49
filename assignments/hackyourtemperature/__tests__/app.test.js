import app from "../app.js";
import supertest from "supertest";
import { API_KEY } from "../sources/keys.js";
import nock from "nock";
const request = supertest(app);

describe("POST /", (done) => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("App returns 200 status on the main page.", async () => {
    await request
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.text).toBe("hello from backend to frontend!");
      });
  });

  it("App returns 200 status when the city name is correct.", async () => {
    const mockCity = "Amsterdam";
    const mockTemp = 15;

    nock("https://api.openweathermap.org")
      .get("/data/2.5/weather")
      .query({ q: mockCity, APPID: API_KEY, units: "metric" })
      .reply(200, { name: "Amsterdam", main: { temp: 15 } });

    const res = await request
      .post("/weather")
      .send({ cityName: "Amsterdam" })
      .expect(200);

    expect(res.body).toEqual({
      Amsterdam: 15,
    });
  });

  it("App returns 400 status when the city name is missing.", async () => {
    await request
      .post("/weather")
      .send()
      .set("Content-type", "application/json")
      .set("Accept", "application/json")
      .expect(400, {
        weatherText: "City name is required!",
      });
  });

  it("App returns 404 status when the city name is gibberish.", async () => {
    nock("https://api.openweathermap.org")
      .get("/data/2.5/weather")
      .query({ q: "abcdefg", APPID: API_KEY, units: "metric" })
      .reply(404, { message: "city not found" });

    await request
      .post("/weather")
      .send({ cityName: "abcdefg" })
      .set("Content-type", "application/json")
      .set("Accept", "application/json")
      .expect(404, {
        weatherText: "City is not found!",
      });
  });
});
