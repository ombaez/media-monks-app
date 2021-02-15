const supertest = require("supertest");
const app = require("../../index");
const request = supertest(app);
const redis = require("redis-mock");

describe("Test connections", () => {
  test("Check Redis connection - Hello World - Key Value", async (done) => {
    const client = redis.createClient({ host: "redis" });
    client.set("hello", "world");
    function callback(err, data) {
      expect(data).toBe("world");
    }
    client.get("hello", callback);
    done();
  });

  it("Api test endpoint must return confirm message", async (done) => {
    const response = await request.get("/test");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
    done();
  });
});

describe("Tests data with responses", () => {
  test("Should response with 404 when not found results", async (done) => {
    const response = await request.get("/value/noexists");
    expect(response.status).toBe(404);
    done();
  });

  test("Should response value", async (done) => {
    const client = redis.createClient({ host: "redis" });
    client.set("frame", "js");
    const response = await request.get("/value/frame");
    expect(response.status).toBe(200);
    expect(response.body.value).toBe("js");
    done();
  });
});
