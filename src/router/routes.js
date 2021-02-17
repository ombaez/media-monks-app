const { Router } = require("express");
const router = new Router();

const testController = require("../controllers/test.controller");
const getValueController = require("../controllers/getValue.controller");

router.get("/test", testController);

router.get("/value/:key", getValueController);

module.exports = router;
