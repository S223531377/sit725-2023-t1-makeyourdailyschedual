const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Routes for adding and fetching tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ type: -1, datetime: 1 }); // Prioritize first, then by datetime
    res.render("index", { tasks: tasks });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch tasks" });
  }
});

router.post("/", async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    datetime: req.body.datetime,
    type: req.body.type,
  });
  try {
    await task.save();
    res.redirect("/tasks");
  } catch {
    res.status(400).send({ error: "Failed to add task" });
  }
});

// DELETE task route
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send('Task not found');
        }
        res.redirect('/tasks');  // Redirect or handle the response as needed
    } catch (error) {
        console.error("Failed to delete task:", error);
        res.status(500).send("Error deleting task.");
    }
});


// Route to get a specific task for editing
router.get('/edit/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('edit_task', { task: task }); // Assumes you have an 'edit_task.ejs' view file for the edit form
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to find the task.");
    }
});

// Route to submit the updated task
router.post('/update/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            datetime: req.body.datetime,
            type: req.scanfigs
        });
        res.redirect('/tasks');
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed to update the task.");
    }
});

module.exports = router;
