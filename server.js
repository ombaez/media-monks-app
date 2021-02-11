const express = require("express");
const redis = require("redis");
const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const app = express();

app.get("/", (req, res) => {
  toRedis();
  return res.send("Hello world");
});

app.get("/get", (req, res,next) => {
    getCachedInRedis(req,res,next);
    return res.send("Hello world");
  });

function toRedis() {
  client.setex("lala", 3600, "repos");
  console.log("OK en redis");
}

function getCachedInRedis(req,res,next) {
  client.get("lala", (err, data) => {
    if (err) throw err
    if (data !== null) {
      console.log(data,"Finished");
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
