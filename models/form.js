const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  file_name: String,
  records: [],
  paused: Boolean,
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
