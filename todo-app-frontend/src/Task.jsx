import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


function Task({ deleteTask,text }) {
    const [checked, setChecked] = useState(false);
    const [hover, setHover] = useState(false);
    const [wasChecked, setWasChecked] = useState(false);

    function handleChecked() {
        setWasChecked(checked);
        setChecked(c => !c);
    }

    function Hovering() {
        setHover(true);
    }

    function notHovering() {
        setHover(false);
        setWasChecked(false);
    }

    const showCheck = checked || (hover && !wasChecked);

    return (
        <div className="todo">
            <Button onMouseLeave={notHovering} onMouseEnter={Hovering} onClick={handleChecked} variant="dark" className="btn done-btn">
            <FontAwesomeIcon icon={faCheck} className={`check-icon ${showCheck ? 'visible' : ''}`} />
            </Button>
            <p>{text}</p>
            <Button variant="dark" 
                className="btn delete-btn"
                onClick={() => deleteTask(text)}>
                <FontAwesomeIcon className = "cross-icon" icon={faTimes} />
            </Button>
        </div>
    );
}

export default Task;