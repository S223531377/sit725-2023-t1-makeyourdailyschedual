const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Priority", "Normal"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
