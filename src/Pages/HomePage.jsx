import Search from '../Components/Search';
import TaskDisplay from '../Components/TaskDisplay.jsx';
import Sort from '../Components/Sort.jsx';
import Filter from '../Components/Filter.jsx';
import AddTaskModal from './AddTaskModal.jsx';
import PowerMode from '../Components/PowerMode.jsx';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Search></Search>
      <div className="btns">
        <Sort></Sort>
        <Filter></Filter>
      </div>
      <PowerMode></PowerMode>
      <TaskDisplay></TaskDisplay>

      <div class="addTask">
        <button onClick={() => navigate('/addTask')}>+ Add Task</button>
      </div>
    </div>
  );
};

export default HomePage;
