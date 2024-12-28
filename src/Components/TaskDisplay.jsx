import { useState } from 'react';
import TaskDetails from '../Pages/TaskDetails';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CircularProgress from '@mui/material/CircularProgress';
import { useTaskContext } from '../context/TaskContext';

import { useNavigate } from 'react-router-dom';

const TaskDisplay = () => {
  const {
    taskArr,
    setTaskArr,
    unfilteredTaskArr,
    setUnfilteredTaskArr,
    taskToOpen,
    setTaskToOpen,
    taskIndex,
    setTaskIndex,
  } = useTaskContext();

  const navigate = useNavigate();

  const handleTaskDetails = (task, index) => {
    setTaskIndex(index);
    setTaskToOpen(task);
    navigate('/taskDetails');
  };

  const handleTaskComplete = (task, index) => {
    const updatedTasks = taskArr.map((item, secondIndex) => {
      if (index === secondIndex) {
        item.done = !item.done;
      }
      return item;
    });
    setTaskArr(updatedTasks);
  };

  const makeTagBubbles = (tags) => {
    return tags.map((item) => {
      return <div class="tag">{item}</div>;
    });
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
        <div class="icons">
          <button
            onClick={(e) => {
              handleTaskComplete(task, index);
              e.stopPropagation();
            }}
            class="icon"
          >
            <DoneIcon></DoneIcon>
          </button>
          <CircularProgress
            variant="determinate"
            value={findChecklistPercentageCompleted(task)}
          ></CircularProgress>
        </div>
        <div
          style={{
            color: howLongUntilDue(task.date),
          }}
        >
          <CalendarMonthIcon></CalendarMonthIcon>Due Date: {task.date} {task.time}
        </div>
        <div>
          <ArrowUpwardIcon></ArrowUpwardIcon>Priority: {task.priorityLevel}
        </div>
        <div>
          <OpenWithIcon></OpenWithIcon>Complexity: {task.complexityLevel}
        </div>
        <div class="tags"> {makeTagBubbles(task.tags)}</div>
      </div>
    ));
  };

  return (
    <div class="taskList">
      <div>{mapTasks()}</div>
      {/* {taskDetailsOpen ? <TaskDetails task={taskToOpen} taskIndex={taskIndex}></TaskDetails> : ''} */}
    </div>
  );
};

export default TaskDisplay;
