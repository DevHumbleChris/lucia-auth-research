const router = require("express").Router();
const controllers = require("../controllers");

router.get("/health-check", controllers.check);

module.exports = router;
