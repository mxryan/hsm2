// TODO: REMOVE SIGNUP*****

const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const db = require("../models");

router.get("/user", (req, res) => {
  res.send("hit user GET");
});

router.post("/register", (req, res) => {
  const user = new db.User({
    username: req.body.username,
    // remove ability to become admin from route
    isAdmin: req.body.isAdmin ? true : false
  });
  db.User.register(user, req.body.password, (saveErr, savedUser) => {
    if (saveErr) return console.log(saveErr);
    res.status(201).json({message: "success"});
  })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({message: "Hit the test route to check if user authenticated"});
});

// router.post("/user", (req, res) => {
//   db.User.findOne({ username: req.body.username }, (findErr, foundUser) => {
//     if (findErr) {
//       res.status(500).send({ error: findErr });
//       return console.log(findErr);
//     }
//     console.log("Found result: ", foundUser);
//     if (foundUser) {
//       res.status(409).send({ message: "Username already exists" });
//       console.log(foundUser);
//     } else {
//       const user = new db.User({ 
//         username: req.body.username,
//         password: req.body.password,
//         isAdmin: req.body.isAdmin
//       });
//       user.save((saveErr, savedUser) => {
//         if (saveErr) {
//           res.status(500).send({ error: saveErr });
//           return console.log(saveErr);
//         }
//         res.status(201).send({ data: savedUser });
//       });
//     }
//   })
// });

router.get("/test", (req,res) => {
  if (req.user) {
    res.send({data: req.user})
  } else {
    res.send({message: "No user is logged in"});
  }
})

router.get("/orders/all", (req, res) => {
  db.Order.find({}, (findErr, orders) => {
    res.json({data: orders});
  })
})

router.post("/orders", (req, res) => {
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