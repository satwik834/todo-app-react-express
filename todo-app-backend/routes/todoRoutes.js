import express from "express";

import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { validateRequest } from '../middleware/validateRequest.js';
import Joi from 'joi';



const createTodoSchema = Joi.object({
 title: Joi.string().min(3).required(),
 description: Joi.string().optional().allow('')
});

const router = express.Router();
//create

router.use(isAuthenticated)

router.post('/', validateRequest(createTodoSchema), createTodo);
//update
const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().optional().allow(''),
  completed: Joi.boolean().optional()
});router.put('/:id', validateRequest(updateTodoSchema), updateTodo);
//delete
router.delete('/:id',deleteTodo);
//get all
router.get('/',getTodos)

export default router