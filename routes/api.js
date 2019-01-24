const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/user", (req, res) => {
  res.send("hit user GET");
});


router.post("/user", (req, res) => {
  db.User.findOne({ username: req.body.username }, (findErr, foundUser) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log(findErr);
    }
    console.log("Found result: ", foundUser);
    if (foundUser) {
      res.status(409).send({ message: "Username already exists" });
      console.log(foundUser);
    } else {
      const user = new db.User({ 
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      });
      user.save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(500).send({ error: saveErr });
          return console.log(saveErr);
        }
        res.status(201).send({ data: savedUser });
      });
    }
  })
});

router.post("/order", (req, res) => {
  let order = new db.Order({
    ...req.body
  });
  order.save((saveErr, savedOrder) => {
    if (saveErr) {
      res.status(500).send({ error: saveErr });
      return console.log(saveErr);
    }
    res.status(201).send({ data: savedOrder });
  })
})


module.exports = router;