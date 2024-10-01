import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);


describe("POST /", () => {
  it("Quick test", () => {
    expect(1).toBe(1);
  });
});

describe("POST /weather", () => {

  it("receive a city name from the request", async () => {
    const res = await request.post("/weather").send({ cityName: "Amsterdam" });

    expect(res.body.cityName).toBeDefined();
    expect(res.body.cityName).toBe("Amsterdam");
    expect(res.statusCode).toBe(200);
  });



  it("should return an error for invalid city names", async () => {
    const res = await request.post("/weather").send({ cityName: "sana/a" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid city name");
    
    const res1 = await request.post("/weather").send({ cityName: "2!@4*" });

       expect(res1.statusCode).toBe(400);
       expect(res1.body.error).toBe("Invalid city name");
 
  });



  it("should return 404 when the city is not found", async () => {
    const res = await request.post("/weather").send({ cityName: "Taiiz" });

    expect(res.statusCode).toBe(404);
    expect(res.body.weatherText).toBe("City is not found!");
  });



  it(" resolve with a an object with city name,low temp and high temp.", async () => {
    const res = await request.post("/weather").send({ cityName: "Eindhoven" });

    expect(res.body).toEqual(
      expect.objectContaining({
        cityName: expect.any(String),
        message: expect.stringContaining(
          "The temperature in Eindhoven is between a low of"
        ),
      })
    );
    expect(res.statusCode).toBe(200);
  });


});
