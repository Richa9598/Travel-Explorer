import React from 'react';
import './Component.css';
import { useState } from 'react';
type AddProps = {
  onAddTask: (name: string, tasksList: string) => void;
};
const AddTaskForm = (props: AddProps) => {
  const [taskName, setTaskName] = useState('');
  const [tasksListItem, setTaskListItem] = useState('');

  //you automatically get event object just like event listeners in js
  // Handler for taskItem
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setTaskName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //by default it will submit the form, so prevent
    e.preventDefault();
    // Setting the taskName and item
    props.onAddTask(taskName, tasksListItem);
    setTaskName('');
    setTaskListItem('');
  };


  // Handler for taskItem
  const handleTaskItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setTaskListItem(e.target.value);
  };

  

  return (
    <form onSubmit={handleSubmit} className='add-form'>
      <fieldset>
        <legend>Add Task</legend>
        {/* <two way data binding with value attribute /> */}
        {/* input for task title */}
        <input
          type='text'
          value={taskName}
          onChange={handleChange}
          placeholder='Enter Task'
        />
        {/* input for task item */}
        <input
          type='text'
          value={tasksListItem}
          onChange={handleTaskItemChange}
          placeholder='Enter Sub Task'
        />
        {/* Button for submit */}
        <input type='submit' value='Add Task' />
      </fieldset>
    </form>
  );
};

export default AddTaskForm;