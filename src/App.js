import { useState, useEffect, useRef } from 'react';

import './App.css';
import Search from './Components/Search.jsx';
import TaskDisplay from './Components/TaskDisplay.jsx';
import Sort from './Components/Sort.jsx';
import Filter from './Components/Filter.jsx';
import AddTaskModal from './Pages/AddTaskModal.jsx';
import PowerMode from './Components/PowerMode.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useTaskContext } from './context/TaskContext.jsx';

function App() {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr } = useTaskContext();

  //for display
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);
  //for editing
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTaskArr(savedTasks);
      setUnfilteredTaskArr(savedTasks);
      hasLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) {
      if (taskArr) localStorage.setItem('tasks', JSON.stringify(taskArr));
    }
  }, [taskArr]);

  useEffect(() => {
    let biggerTaskArr = unfilteredTaskArr.length > taskArr.length ? unfilteredTaskArr : taskArr;
    localStorage.setItem('tasks', JSON.stringify(biggerTaskArr));
  }, [unfilteredTaskArr, taskArr]);

  return (
    <div className="App">
      <Search
        // taskArr={taskArr}
        // setTaskArr={setTaskArr}
        unfilteredTaskArr={unfilteredTaskArr}
        setUnfilteredTaskArr={setUnfilteredTaskArr}
      ></Search>

      <div class="btns">
        <Sort taskArr={taskArr} setTaskArr={setTaskArr}></Sort>
        <Filter
          taskArr={taskArr}
          setTaskArr={setTaskArr}
          unfilteredTaskArr={unfilteredTaskArr}
          setUnfilteredTaskArr={setUnfilteredTaskArr}
        ></Filter>
      </div>

      <PowerMode
        taskArr={taskArr}
        setTaskArr={setTaskArr}
        unfilteredTaskArr={unfilteredTaskArr}
        setUnfilteredTaskArr={setUnfilteredTaskArr}
      ></PowerMode>

      <TaskDisplay
        taskArr={taskArr}
        setTaskArr={setTaskArr}
        taskDetailsOpen={taskDetailsOpen}
        setTaskDetailsOpen={setTaskDetailsOpen}
        editTaskModalIsOpen={editTaskModalIsOpen}
        setEditTaskModalIsOpen={setEditTaskModalIsOpen}
        unfilteredTaskArr={unfilteredTaskArr}
        setUnfilteredTaskArr={setUnfilteredTaskArr}
      ></TaskDisplay>

      <div class="addTask">
        <button onClick={() => setEditTaskModalIsOpen(true)}>+ Add Task</button>
        {editTaskModalIsOpen ? (
          <AddTaskModal
            editTaskModalIsOpen={editTaskModalIsOpen}
            setEditTaskModalIsOpen={setEditTaskModalIsOpen}
            taskDetailsOpen={taskDetailsOpen}
            setTaskDetailsOpen={setTaskDetailsOpen}
            // taskArr={taskArr}
            // setTaskArr={setTaskArr}
            // unfilteredTaskArr={unfilteredTaskArr}
            // setUnfilteredTaskArr={setUnfilteredTaskArr}
          ></AddTaskModal>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default App;
