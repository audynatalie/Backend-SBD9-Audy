const TodoRepository = require("../repositories/todo.repository");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await TodoRepository.findAll(); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params; 
    const todo = await TodoRepository.getTodoById(id); 
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(200).json(todo); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

exports.updateTodoStatus = async (id, completed) => {
  const result = await pool.query(
    'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
    [completed, id]
  );
  return result.rows[0];
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await todoRepository.updateTodoStatus(id, completed);
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo status:", error);
    res.status(500).json({ error: "Failed to update todo status" });
  }
};

// Create 
exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate} = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = await TodoRepository.createTodo(title, description, dueDate);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, completed, dueDate } = req.body; 
    
    if (!title) { 
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await TodoRepository.findById(id); 
    
    if (!todo) { 
      return res.status(404).json({ error: 'Todo not found' });
    }
    const updatedTodo = await TodoRepository.updateTodo(id, { title, completed, dueDate });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const todo = await TodoRepository.getTodoById(id); 
    
    if (!todo) { 
      return res.status(404).json({ error: 'Todo not found' });
    }
    await TodoRepository.deleteTodo(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};