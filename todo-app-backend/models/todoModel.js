import db from "../database.js";

// Create
async function createTodo(todo) {
  const { userId, title, description } = todo;
  try {
    const res = await db.query(
      `INSERT INTO todos(user_id, title, description) 
       VALUES($1, $2, $3) RETURNING *`,
      [userId, title, description]
    );
    return res.rows[0];
  } catch (err) {
    console.log("Error while creating todo:", err.message);
  }
}

// Update
async function updateTodo(todoId, userId, todo) {
  try {
    const res = await db.query(
      `UPDATE todos 
       SET title = $1, description = $2, completed = $3 
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [todo.title, todo.description, todo.completed, todoId, userId]
    );
    return res.rows[0];
  } catch (err) {
    console.log("Error while updating todo:", err.message);
  }
}

// Delete
async function deleteTodo(todoId, userId) {
  try {
    const res = await db.query(
      `DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *`,
      [todoId, userId]
    );
    return res.rows[0];
  } catch (err) {
    console.log("Error while deleting todo:", err.message);
  }
}

// Get all by user
async function getAllByUser(userId) {
  try {
    const res = await db.query(
      `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.log("Error while retrieving todos by userId:", err.message);
  }
}

// Get by id
async function getById(todoId, userId) {
  try {
    const res = await db.query(
      `SELECT * FROM todos WHERE id = $1 AND user_id = $2`,
      [todoId, userId]
    );
    return res.rows[0];
  } catch (err) {
    console.log("Error while retrieving todo by todoId:", err.message);
  }
}

export {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllByUser,
  getById
};
