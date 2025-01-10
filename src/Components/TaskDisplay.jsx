import {
  DoneIcon,
  CalendarMonthIcon,
  ArrowUpwardIcon,
  OpenWithIcon,
  CircularProgress,
} from '../mui/index.js';
import {
  findChecklistPercentageCompleted,
  makeTagBubbles,
  howLongUntilDue,
} from '../utils/index.js';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TaskDisplay = () => {
  const { taskArr, setTaskArr, setUnfilteredTaskArr, setTaskToOpen, setTaskIndex } =
    useTaskContext();

  const navigate = useNavigate();

  const handleTaskDetails = (task, index) => {
    setTaskIndex(index);
    setTaskToOpen(task);
    navigate(`/taskDetails?${index}`);
    // navigate(`/taskDetails`);
  };

  const handleTaskComplete = (task, index) => {
    const updatedTasks = taskArr.map((item, secondIndex) => {
      if (index === secondIndex) {
        item.done = !item.done;
      }
      return item;
    });
    setTaskArr(updatedTasks);
    setUnfilteredTaskArr(updatedTasks);
  };

  const mapTasks = () => {
    return [...taskArr].map((task, index) => (
      <div
        key={index}
        onClick={(e) => {
          handleTaskDetails(task, index);
        }}
        className="task"
        style={{
          backgroundColor: task.done ? '#c9e8f0' : 'rgb(255, 255, 255)',
        }}
      >
        <h4>{task.taskName}</h4>

        <button
          onClick={(e) => {
            handleTaskComplete(task, index);
            /* stopPropagation necessary to prevent nav to TaskDetails*/
            e.stopPropagation();
          }}
          className="icon iconLeft"
        >
          <DoneIcon />
        </button>
        <div className="icon iconRight">
          <CircularProgress variant="determinate" value={findChecklistPercentageCompleted(task)} />
        </div>

        <div
          style={{
            color: howLongUntilDue(task.date),
          }}
          className="item1"
        >
          <CalendarMonthIcon />
          Due Date: {task.date} {task.time}
        </div>
        <div className="item2">
          <ArrowUpwardIcon />
          Priority: {task.priorityLevel}
        </div>
        <div className="item3">
          <OpenWithIcon />
          Complexity: {task.complexityLevel}
        </div>
        <div className="tags"> {makeTagBubbles(task.tags)}</div>
      </div>
    ));
  };

  return (
    <div className="taskList">
      <div>{mapTasks()}</div>
    </div>
  );
};

export default TaskDisplay;
