const router = require("express").Router();
const exampleController = require("../controllers/example.controller");
module.exports = router;

router.get("/", exampleController.sampleHandler);
