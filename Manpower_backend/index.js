// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan=require("morgan")
const app = express();
app.use(morgan('dev'));
const port = 8000; // Replace with your desired port

// Connect to MongoDB
mongoose.connect('mongodb+srv://pramaths848:MdNy3gukvjpzydQe@twitter.t29mhxx.mongodb.net/event?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event model
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: [{ type: String }], // Array of officer IDs
  start: Date,
  end: Date,
});

const Event = mongoose.model('Event', EventSchema);

// Body parser middleware to handle JSON payloads
app.use(bodyParser.json());

// Enable CORS for client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // In production, replace * with your client's URL
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  console
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
