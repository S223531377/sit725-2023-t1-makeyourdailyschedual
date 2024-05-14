require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
// index.js or relevant file
const Task = require('./models/task'); // Adjust the path based on your directory structure


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const methodOverride = require('method-override');
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Continue with other middleware and routes

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/tasks", taskRoutes);

// Set view engine
app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
    Task.find({}) // Removed callback
        .then(tasks => {
            res.render('index', { tasks: tasks });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred while fetching tasks');
        });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
