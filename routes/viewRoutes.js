const path = require("path");
const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"))
})


module.exports = router;