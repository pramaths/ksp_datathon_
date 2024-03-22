const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: [{ type: String }], // Changed this to an array of Strings assuming IDs or some identifiers are strings
  dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);
