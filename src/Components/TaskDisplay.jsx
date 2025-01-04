import DoneIcon from '@mui/icons-material/Done';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CircularProgress from '@mui/material/CircularProgress';
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

  const makeTagBubbles = (tags) => {
    if (tags) {
      return tags.map((item) => {
        return <div class="tag">{item}</div>;
      });
    }
  };

  const howLongUntilDue = (dateString, timeString) => {
    const today = new Date();
    const taskDate = new Date(dateString);
    const differenceInDays = (taskDate - today) / (24 * 60 * 60 * 1000);
    if (differenceInDays <= 1) {
      return 'red';
    } else if (differenceInDays <= 3) {
      return 'orange';
    } else {
      return 'inherit';
    }
  };

  const findChecklistPercentageCompleted = (task) => {
    if (!task.checklistItemsCompletedIndices.length) return 0;
    let completed = 0;
    for (let i = 0; i < task.checklistItemsCompletedIndices.length; i++) {
      if (task.checklistItemsCompletedIndices[i]) {
        completed += 1;
      }
    }
    return (completed / task.checklistItemsCompletedIndices.length) * 100;
  };

  const mapTasks = () => {
    return [...taskArr].slice().map((task, index) => (
      <div
        key={index}
        onClick={(e) => {
          handleTaskDetails(task, index);
        }}
        class="task"
        style={{
          backgroundColor: task.done ? 'green' : 'rgb(255, 255, 255)',
        }}
      >
        <h4>{task.taskName}</h4>

        <button
          onClick={(e) => {
            handleTaskComplete(task, index);
            e.stopPropagation();
          }}
          class="icon iconLeft"
        >
          <DoneIcon></DoneIcon>
        </button>
        <div class="icon iconRight">
          <CircularProgress
            variant="determinate"
            value={findChecklistPercentageCompleted(task)}
            // size={40}
          >
            <div class="textBox">penis</div>
          </CircularProgress>
        </div>

        <div
          style={{
            color: howLongUntilDue(task.date),
          }}
          class="item1"
        >
          <CalendarMonthIcon></CalendarMonthIcon>Due Date: {task.date} {task.time}
        </div>
        <div class="item2">
          <ArrowUpwardIcon></ArrowUpwardIcon>Priority: {task.priorityLevel}
        </div>
        <div class="item3">
          <OpenWithIcon></OpenWithIcon>Complexity: {task.complexityLevel}
        </div>
        <div class="tags"> {makeTagBubbles(task.tags)}</div>
      </div>
    ));
  };

  return (
    <div class="taskList">
      <div>{mapTasks()}</div>
    </div>
  );
};

export default TaskDisplay;
