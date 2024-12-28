import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const AddTask = () => {
  const navigate = useNavigate();
  const { setTaskToOpen } = useTaskContext();

  const resetFormThenNav = () => {
    setTaskToOpen(null);
    navigate('/addTask?navFromHome');
  };

  return (
    <div class="addTask">
      <button onClick={() => resetFormThenNav()}>+ Add Task</button>
    </div>
  );
};

export default AddTask;
