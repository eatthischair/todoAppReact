import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const AddTask = () => {
  const navigate = useNavigate();
  const { setTaskToOpen } = useTaskContext();

  const resetFormThenNav = () => {
    //val not null if editing task, null if creating new task
    setTaskToOpen(null);
    navigate('/addTask?navFromHome');
  };

  return (
    <div className="addTask">
      <button onClick={() => resetFormThenNav()}>+ Add Task</button>
    </div>
  );
};

export default AddTask;
