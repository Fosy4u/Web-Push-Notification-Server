const express = require("express");
const http = require("http");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { json } = require("body-parser");
// setting up dotenv
require("dotenv").config();
//setting up express,http server, bodyparser and cors
const app = express();
const server = http.createServer(app);

app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//getting the public and private vapid key
const publicVapidKey = process.env.publicVapidKey;

const privateVapidKey = process.env.privateVapidKey;
webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  publicVapidKey,
  privateVapidKey
);

//subscribe Route

app.post("/", (req, res) => {
  console.log("post");
  //Get push subscription object from the device
  const subscription = req.body[0];

  console.log(req.body);

  //send 201 code - showing sucessful
  res.status(201).json({});

  //Create Payload
  const payload = JSON.stringify({ title: req.body[1] });

  //pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});
app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
  console.log("get");
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
