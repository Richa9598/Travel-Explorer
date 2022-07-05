import { useState } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import TaskList from './components/TaskList';
import Search from './components/Search';
import AddTaskForm from './components/AddTaskForm';


const { v4: uuidv4 } = require('uuid');

// The App which contains the login and data for the app
const TaskApp = () => {

    // Some vaiables and state handlers
    const [search, setSearch] = useState('');
    const [item, setItemState] = useState('');
    const [taskList, setTaskList] = useState([
      {
        title: 'Humber',
        tasks: ['Task 1', 'Task 2', 'Task 3'],
        id: 1,
      },
      {
        title: 'MERN',
        tasks: ['Lab', 'Project', 'Quiz'],
        id: 2,
      },
      {
        title: 'Java',
        tasks: ['Group Discussion', 'Exam', 'Assignment'],
        id: 3,
      },
    ]);
  
  
  
    // Method to handle delete by id
    const handleDelete = (id: number) => {
      setTaskList((prev) => prev.filter((t) => t.id !== id));
    };
    // Method to filtere by id
    const filterTask = (name: string) => {
      //if name is not null
      if (name) {
        setSearch(name);
      } else {
        setSearch('');
      }
    };
  
    const saveInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setItemState(e.target.value);
    };
  
  
  
    const handleAddTask = (name: string, tasksList: string) => {
      setTaskList((myList) => [
        { title: name, tasks: [tasksList], id: uuidv4() }, ...myList,
      ]);
    };
  
    //method to add new task and new task group if both are new or add the task to existing task group
    const handleAddTaskItem = (taskName: string, taskItem: string) => {
      //creating a local copy of taskList
      let updateTaskList = [...taskList];
  
      // setting default name for task title if it's empty
      if (taskName.length == 0)
        taskName = "DEFAULT TASK GROUP"
      var found: boolean = false;
  
      //running loop over copy list and searching for title
      updateTaskList.map((tasklist) => {
  
        // if title found push task to task array
        if (tasklist.title.toLowerCase() === taskName.toLowerCase()) {
          found = true;
          tasklist.tasks.push(taskItem);
        }
        return tasklist;
      })
  
      // setting the updated task list or creating a new task in the taskList
      if (found == false) {
        setTaskList((myList) => [
          { title: taskName, tasks: [taskItem], id: uuidv4() }, ...myList,
        ]);
      } else { 
        setTaskList(updateTaskList);
      }
  
    };
  
  
  
    //this is what will re rendered in the index.tsx
    return (
      <div>
  
        {/* This will get a header at top wth title and item count */}
        <Header title='N01452387 - Saransh - Task List' item={
          taskList.reduce((sum, t) => { return sum + t.tasks.length }, 0)
        } />
        {/* This is where UI for filter will appear */}
        <Search filterTasks={filterTask} />
        {/* This is where UI for adding task title and task item will appear */}
        <AddTaskForm onAddTask={handleAddTaskItem} />
        {/* Here the taskList item is looped to access indiviual task and it's items */}
        {taskList
          .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))  // This is for filtering the task
          .map((t) => (
            <TaskList
              onDelete={handleDelete} // This is for handleing delete for main task group
              title={t.title}
              tasks={t.tasks}
              id={t.id}
            />
          ))}
      </div>
    );
  }
  
  export default TaskApp;