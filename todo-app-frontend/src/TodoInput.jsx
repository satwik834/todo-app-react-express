import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

function TodoInput({ addTask }){
    const [todo,setTodo] = useState();
    const [priority,setPriority] = useState();

    function handleTextChange(e){
        setTodo(e.target.value);
    }
    function handlePriorityChange(e){
        setPriority(e.target.value);
    }
    function handleAddTodo(){
        if(todo){
            addTask(todo,priority);
            setTodo('');
            setPriority('');
        }
    }
    function handleKeyPress(e){
        if(e.key === 'Enter'){
            handleAddTodo();
        }
    }
    return (
        <>
            <InputGroup className='todo-input'>
                <Form.Control 
                    className='text-input'
                    placeholder='Add Task'
                    onChange={handleTextChange}
                    value={todo}
                    onKeyPress={handleKeyPress}
                />
                <Form.Select  className='priority-select' onChange={handlePriorityChange}>
                    <option disabled>Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </Form.Select>
                <Button className='btn' variant='dark' onClick={handleAddTodo}>
                    Add
                </Button>
            
            </InputGroup>
        
        
        </>
    )

}

export default TodoInput;