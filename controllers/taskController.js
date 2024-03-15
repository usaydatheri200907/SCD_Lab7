const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, priority } = req.body;
    const task = await Task.create({ title, description, dueDate, category, priority, user: req.userId });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');
    task.completed = true;
    await task.save();
    res.status(200).json({ message: 'Task marked as completed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
