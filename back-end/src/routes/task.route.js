const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/task.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate); // protect all
router.get('/', ctrl.getTasks);
router.post('/', ctrl.createTask);
router.get('/:id', ctrl.getTask);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
