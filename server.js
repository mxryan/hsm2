const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");
const apiRoutes = require("./routes/api");
const app = express();

var PORT = process.env.PORT || 8080;

// to do:
// auth set up
// route set up

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

app.use("/api",apiRoutes)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
})


app.listen(PORT, ()=> console.log("server on " + PORT));