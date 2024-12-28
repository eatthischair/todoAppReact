import { useEffect, useRef } from 'react';
import './App.css';
import AddTaskModal from './Pages/AddTaskModal.jsx';
import HomePage from './Pages/HomePage.jsx';
import TaskDetails from './Pages/TaskDetails.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTaskContext } from './context/TaskContext.jsx';

function App() {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr } = useTaskContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    console.log('TaskArr updated:', taskArr);
    console.log('UnfilteredTaskArr updated:', unfilteredTaskArr);
  }, [taskArr, unfilteredTaskArr]);

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addTask" element={<AddTaskModal />} />
        <Route path="/taskDetails" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
