import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


function Task({ task, deleteTask, updateTodo }) {
    const [checked, setChecked] = useState(task.completed);
    const [hover, setHover] = useState(false);
    const [wasChecked, setWasChecked] = useState(false);

    function handleChecked() {
        setWasChecked(checked);
        setChecked(c => !c);
        updateTodo(task.id, { completed: !checked });
    }



    function Hovering() {
        setHover(true);
    }

    function notHovering() {
        setHover(false);
        setWasChecked(false);
    }

    const showCheck = checked || hover ;

    return (
        <div className="todo">
            <Button onMouseLeave={notHovering} onMouseEnter={Hovering} onClick={handleChecked} variant="dark" className="btn done-btn">
            <FontAwesomeIcon icon={faCheck} className={`check-icon ${showCheck ? 'visible' : ''}`} />
            </Button>
            <div className="task-details">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>
            <Button variant="dark" 
                className="btn delete-btn"
                onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon className = "cross-icon" icon={faTimes} />
            </Button>
        </div>
    );
}

export default Task;