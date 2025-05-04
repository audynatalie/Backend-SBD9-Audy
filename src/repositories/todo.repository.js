const pool = require('../database/pgDatabase.js');

exports.findAll = async () => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching todos: ${error.message}`);
  }
};

exports.getTodoById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error fetching todo: ${error.message}`);
  }
};

exports.updateTodoStatus = async (id, completed) => {
  const result = await pool.query(
    'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
    [completed, id]
  );
  return result.rows[0];
};

exports.createTodo = async (title, description, dueDate) => {
  try {
    const result = await pool.query(
      'INSERT INTO todos (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description, dueDate]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating todo: ${error.message}`);
  }
};

exports.updateTodo = async (id, data) => {
  try {
    const { title, completed, dueDate } = data; // Added dueDate
    const result = await pool.query(
      'UPDATE todos SET title = $1, completed = $2, due_date = $3 WHERE id = $4 RETURNING *',
      [title, completed, dueDate, id]  // Passing dueDate to the query
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating todo: ${error.message}`);
  }
};

exports.deleteTodo = async (id) => {
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    return true;
  } catch (error) {
    throw new Error(`Error deleting todo: ${error.message}`);
  }
};
