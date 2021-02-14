const { Router } = require("express");
const router = new Router();
const redisClient = require("../redis/config");

router.get("/test", (req, res) => {
  return res.status(200).json({ message: "pass!" });
});

router.get("/value/:key", async (req, res) => {
  const { key } = req.params;

  const value = await redisClient.get(key).catch((err) => {
    if (err) console.error(err);
  });

  if (!value) {
    return res.status(404).json({ value: null });
  }

  return res.status(200).send({
    value,
  });
});

module.exports = router;
