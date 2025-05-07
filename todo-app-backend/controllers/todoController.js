import * as todoModel from '../models/todoModel.js'

//create
const userId = 1;
export async function  createTodo(req,res){
    const {title, description} = req.body;
    //const userId = req.user.id;
    const  newTodo = await todoModel.createTodo({userId, title, description});
    res.status(201).json(newTodo);
}

//update
export async function updateTodo(req,res) {
    const todoId = req.params.id;
    //const userId = req.user.id;
    const updated = await todoModel.updateTodo(todoId,userId,req.body);
    res.json(updated);
}
//delete
export async function deleteTodo(req,res) {
    const todoId = req.params.id;
    //const userId = req.user.id;
    const deleted = await todoModel.deleteTodo(todoId,userId);
    res.json(deleted);
    
}
//get all by user
export async function getTodos(req,res) {
    //const userId = req.user.id;
    const todos = await todoModel.getAllByUser(userId);
    res.json(todos);
}
//get by id