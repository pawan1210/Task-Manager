const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/task_manager", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected");
  });

mongoose.Promise = Promise;

module.exports.Form = require("./form");
