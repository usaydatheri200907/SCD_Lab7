const express = require('express');
const taskController = require('../controllers/taskController');
const authUtils = require('../utils/authUtils');
const router = express.Router();

router.use(authUtils.authenticateToken); 
router.post('/create', taskController.createTask);
router.get('/all', taskController.getAllTasks);
router.put('/:taskId/complete', taskController.updateTaskStatus);

module.exports = router;
