const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("./config/passport");
// const db = require("./models");
const viewRoutes = require("./routes/viewRoutes");
const apiRoutes = require("./routes/api");
const app = express();

const PORT = process.env.PORT || 8080;


if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/hsm", {
    useNewUrlParser: true
  });
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// put the secret into .env file
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api",apiRoutes)
app.use(viewRoutes);


app.listen(PORT, ()=> console.log("server on " + PORT));