import TodoInput from "./TodoInput";
import Task from "./Task";
import { useState } from "react";
function TodoBox(){
    const [tasks,setTasks] = useState([])

    function addTask(newTask,priority){
        if (!tasks.some(task => task === newTask)){
            setTasks(t => [...t,newTask]);
        }
        //handle database updation

    }

    function deleteTask(text){
        setTasks(tasks.filter(task => task !== text));
    }
    return(
        <div className="todo-box">
            <h1>Todo</h1>
            <TodoInput addTask={addTask} ></TodoInput>
            <ul className="task-list">
                {tasks.map((task,index) => 
                    <li  key={index}><Task deleteTask={deleteTask} text = {tasks[index]}></Task></li>
                    
                )}
            </ul>


        </div>


    );

}

export default TodoBox;