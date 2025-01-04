import { useState, useEffect } from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RepeatIcon from '@mui/icons-material/Repeat';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CheckIcon from '@mui/icons-material/Check';
import LinearProgress from '@mui/material/LinearProgress';

import { useTaskContext } from '../context/TaskContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TaskDetails = () => {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr, taskToOpen } =
    useTaskContext();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const [taskIndex, setTaskIndex] = useState(null);

  useEffect(() => {
    setTaskIndex(() => {
      for (const [key] of searchParams.entries()) {
        return key;
      }
    });
  }, [setTaskIndex, searchParams]);

  //to avoid renaming everything and causing bugs lmao
  const [task, setTask] = useState(taskToOpen);

  const deleteTask = () => {
    let filteredArr = [...taskArr].filter((item) => item !== task);
    setTaskArr(filteredArr);
    setUnfilteredTaskArr([...unfilteredTaskArr].filter((item) => item !== task));
    navigate('/');
  };

  const [checklistClicked, setChecklistClicked] = useState(task?.checklistItemsCompletedIndices);
  const [checklistClickedPercentage, setChecklistClickedPercentage] = useState();

  useEffect(() => {
    setChecklistClickedPercentage(() => {
      let sliced = checklistClicked.slice();
      let val = 0;
      for (let i = 0; i < sliced.length; i++) {
        if (sliced[i] === true) {
          val += Math.ceil(100 / sliced.length);
        }
      }
      return val;
    });
  }, [checklistClickedPercentage, checklistClicked]);

  function updateNestedData(newArr) {
    setTaskArr((prevState) => {
      const newState = prevState.map((item, index) => {
        if (index === taskIndex * 1) {
          return { ...item, checklistItemsCompletedIndices: newArr };
        } else {
          return item;
        }
      });
      return newState;
    });

    setUnfilteredTaskArr((prevState) =>
      prevState.map((item, index) =>
        index === taskIndex * 1 ? { ...item, checklistItemsCompletedIndices: newArr } : item,
      ),
    );
  }

  const handleChecklistClicked = (index) => {
    let sliced = checklistClicked.slice();
    sliced[index] = !sliced[index];
    let val = 0;
    for (let i = 0; i < sliced.length; i++) {
      if (sliced[i] === true) {
        val += Math.ceil(100 / sliced.length);
      }
    }
    updateNestedData(sliced);
    setChecklistClicked(sliced);
    setChecklistClickedPercentage(val);
  };

  return (
    <div class="taskDetails">
      <h4>Task Details</h4>
      <div class="taskTwo">
        <h4>{task?.taskName}</h4>
        <div>
          <CalendarMonthIcon></CalendarMonthIcon>Due Date: {task.date} {task.time}
        </div>
        <div>
          <ArrowUpwardIcon></ArrowUpwardIcon>Priority: {task.priorityLevel}
        </div>
        <div>
          <OpenWithIcon></OpenWithIcon>Complexity: {task.complexityLevel}
        </div>
        <div>Task Complete</div>
        <LinearProgress value={checklistClickedPercentage} variant="determinate"></LinearProgress>
        <div class="checklistBox">
          Checklist for Subtasks
          {task?.checklist?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleChecklistClicked(index)}
              class="checklistTask"
              style={{
                backgroundColor: checklistClicked[index] ? '#d3ffd3' : 'white',
                cursor: 'pointer',
                padding: '8px',
                border: '1px solid #ddd',
                marginBottom: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {item}
              <CheckIcon></CheckIcon>
            </div>
          ))}
        </div>
      </div>

      <div class="taskDetailsBtns">
        <button onClick={() => navigate(`/`)}>
          <UndoIcon></UndoIcon>
        </button>
        <button>
          <RepeatIcon></RepeatIcon>
        </button>
        <button onClick={() => deleteTask()}>
          <DeleteIcon></DeleteIcon>
        </button>
        <button onClick={() => navigate(`/addTask?${taskIndex}`)}>
          <ModeEditIcon></ModeEditIcon>
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
