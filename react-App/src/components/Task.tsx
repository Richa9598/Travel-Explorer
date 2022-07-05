import React from 'react';
import './Component.css';
// Task property for TASK ITEM
type TaskProps = {
  task: string[]
}
// this constant will return list of task items based on TaskProps
const Task = (props:TaskProps) => {
  console.log("TASK : "+props);
  return (
    <div className='task'>
      <ul className='task-item'>{props.task.map((t)=> (<li>{t}</li>))}</ul>
    </div>
    
  );
};

export default Task;
