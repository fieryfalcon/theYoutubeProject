const express = require("express");
const { handleUser } = require("../controllers/userController");
const router = express.Router();

router.post("/upsert", handleUser);

module.exports = router;
