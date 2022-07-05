import React from 'react';
import Task from './Task';
import { useState } from 'react';


// Task property for TASK
type TaskListProps = {
  title: string;
  tasks: any;
  id: number;
  onDelete: (id: number) => void; //ondelete function declaration
  // onQuantityChange: (id: string, data: number) => void;
  
}
const TaskList = (props:TaskListProps) => {
  

  const [tasks, itemState] = useState('');
  
  // This will return indiviual item from TASK array 
  return (
    <div className='task'>
      <span className='task-name'>
        <button
            className='remove-task'
            onClick={() => props.onDelete(props.id)} // onClick handler to handle task by id
          >
          X
        </button>

        {props.title}
        {/* Passing task Items into Task to print list of task items */}
        <Task task={props.tasks}/>
      </span>
    </div>
  );
};

export default TaskList;
