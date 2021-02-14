const supertest = require("supertest");
const app = require("../../index");
const request = supertest(app);
const { get } = require("../redis/config");

test("It should response the GET method", async (done) => {
  const response = await request.get("/value/noexists");
  expect(response.status).toBe(404);
  done();
});

it("gets the test endpoint", async (done) => {
  const response = await request.get("/test");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("pass!");
  done();
});
