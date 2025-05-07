import express from "express";

import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { isAuthenticated } from "../middleware/auth.js";



const router = express.Router();
//create

router.use(isAuthenticated)

router.post('/',createTodo);
//update
router.put('/:id',updateTodo);
//delete
router.delete('/:id',deleteTodo);
//get all
router.get('/',getTodos)

export default router