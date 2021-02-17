const redisClient = require("../redis/config");

const testController = (req, res) => {
  return res.status(200).json({ message: "pass!" });
};

module.exports = testController;
