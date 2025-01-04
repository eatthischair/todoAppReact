import { useEffect, useRef } from 'react';
import './App.css';
import AddTaskModal from './Pages/AddTaskModal.jsx';
import HomePage from './Pages/HomePage.jsx';
import TaskDetails from './Pages/TaskDetails.jsx';
import { Routes, Route } from 'react-router-dom';
import { useTaskContext } from './context/TaskContext.jsx';
import { useSaveTasks, useLoadTasks } from './hooks/hooks.jsx';

function App() {
  const { unfilteredTaskArr } = useTaskContext();

  useLoadTasks();
  useSaveTasks(unfilteredTaskArr);

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
