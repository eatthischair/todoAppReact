import './App.css';
import AddTaskModal from './pages/AddTaskModal.jsx';
import HomePage from './pages/HomePage.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
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
