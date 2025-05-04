const express = require('express');
const TodoController = require('../controllers/todo.controller.js');
const router = express.Router();

router.get('/All', TodoController.getAllTodos);

router.get('/:id', TodoController.getTodoById);

router.post('/', TodoController.createTodo);

router.put('/:id', TodoController.updateTodo);

router.delete('/:id', TodoController.deleteTodo);

module.exports = router;