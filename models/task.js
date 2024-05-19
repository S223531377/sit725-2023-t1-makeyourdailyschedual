const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  taskdescription: {
    type: String,
    required: true,
  },
  duedatetime: {
    type: Date,
    required: true,
  },
  tasktype: {
    type: String,
    required: true,
    enum: ["Priority", "Normal"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
