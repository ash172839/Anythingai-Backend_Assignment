const Task = require('../models/task.model');
const { taskSchema } = require('../utils/validators');

exports.createTask = async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = await Task.create({ ...value, owner: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    // admin can see all; user sees own tasks
    const filter = req.user.role === 'admin' ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter).populate('owner','name email');
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTask = async (req, res, next) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && t.owner.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });
    res.json(t);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && t.owner.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    Object.assign(t, value);
    await t.save();
    res.json(t);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && t.owner.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await t.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
