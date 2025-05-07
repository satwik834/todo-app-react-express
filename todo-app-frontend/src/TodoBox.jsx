import TodoInput from "./TodoInput";
import Task from "./Task";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Assuming API_BASE_URL is exported or available here

function TodoBox() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { API_BASE_URL } = useAuth(); // Access API_BASE_URL from AuthContext

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/todo`, { withCredentials: true });
                setTasks(response.data);
            } catch (err) {
                console.error("Error fetching todos:", err);
                setError("Failed to fetch todos.");
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [API_BASE_URL]); // Depend on API_BASE_URL

    async function addTodo(newTaskTitle, newTaskDescription) {
        try {
            const response = await axios.post(`${API_BASE_URL}/todo`, { title: newTaskTitle, description: newTaskDescription }, { withCredentials: true });
            setTasks(t => [response.data, ...t]); // Add new todo to the beginning of the list
        } catch (err) {
            console.error("Error adding todo:", err);
            setError("Failed to add todo.");
        }
    }

    async function updateTodo(id, updatedFields) {
        try {
            const response = await axios.put(`${API_BASE_URL}/todo/${id}`, updatedFields, { withCredentials: true });
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        } catch (err) {
            console.error("Error updating todo:", err);
            setError("Failed to update todo.");
        }
    }

    async function deleteTodo(id) {
        try {
            await axios.delete(`${API_BASE_URL}/todo/${id}`, { withCredentials: true });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error("Error deleting todo:", err);
            setError("Failed to delete todo.");
        }
    }
    return(
        <div className="todo-box">
            <h1>Todo</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TodoInput addTask={addTodo} ></TodoInput>
            {loading ? <p>Loading Todos...</p> : (
                <ul className="task-list">
                    {tasks.map(task =>
                        <li key={task.id}><Task task={task} deleteTodo={deleteTodo} updateTodo={updateTodo}></Task></li>
                    )}
                </ul>
            )}
            </ul>


        </div>


    );

}

export default TodoBox;