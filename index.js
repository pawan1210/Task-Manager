const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const Uploader = require("./utils/upload.js");
const Downloader = require("./utils/download.js");
let upld = new Uploader();
let dnld = new Downloader();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.post("/upload", function (req, res) {
  if (upld.checkStatus()) {
    res.status(200);
    res.send({ Message: "Upload in progress" });
  } else {
    upld.startUpload();
    res.status(201);
    res.send({ Message: "Upload Started" });
  }
});

app.post("/upload/pause", function (req, res) {
  if (upld.checkStatus()) {
    upld.pause();
    res.status(200);
    res.send({ Message: "Upload Paused" });
  } else {
    res.status(400);
    res.send({ Message: "Upload process has not started yet" });
  }
});

app.post("/upload/resume", function (req, res) {
  if (upld.checkStatus()) {
    upld.resume();
    res.status(200);
    res.send({ Message: "Upload Resumed" });
  } else {
    res.status(400);
    res.send({ Message: "Upload process has not started yet" });
  }
});

app.post("/upload/terminate", async function (req, res) {
  if (upld.checkStatus()) {
    upld.pause();
    upld.terminate();
    res.send({ Message: "Upload Terminated" });
  } else {
    res.status(400);
    res.send({ Message: "Upload process has not started yet" });
  }
});

app.post("/download", function (req, res) {
  if (dnld.fileExists()) {
    if (dnld.checkStatus()) {
      res.status(200);
      res.send({ Message: "Download in progress" });
    } else {
      dnld.startDownload();
      res.status(201);
      res.send({ Message: "Download process started" });
    }
  } else {
    res.status(400);
    res.send({ Message: "Invalid Request, File doesn't exists" });
  }
});

app.post("/download/pause", function (req, res) {
  if (dnld.checkStatus()) {
    dnld.pause();
    res.status(200);
    res.send({ Message: "Download Paused" });
  } else {
    res.status(400);
    res.send({ Message: "Download process has not started yet" });
  }
});

app.post("/download/resume", function (req, res) {
  if (dnld.checkStatus()) {
    dnld.resume();
    res.status(200);
    res.send({ Message: "Download Resumed" });
  } else {
    res.status(400);
    res.send({ Message: "Download process has not started yet" });
  }
});

app.post("/download/terminate", function (req, res) {
  if (dnld.checkStatus()) {
    dnld.pause();
    dnld.terminate();
    res.send({ Message: "Download Terminated" });
  } else {
    res.status(400);
    res.send({ Message: "Download process has not started yet" });
  }
});

app.listen(port, function () {
  console.log("APP IS RUNNING ON PORT " + port);
});
