const client = require("redis").createClient({ host: "redis", port: 6379 });
const { promisify } = require("util");

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (error) => {
  console.error(error);
});

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

const redisClient = {
  get,
  set,
};

module.exports = redisClient;
