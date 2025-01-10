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
  const {
    taskArr,
    setTaskArr,
    unfilteredTaskArr,
    setUnfilteredTaskArr,
    taskToOpen,
    taskIndex,
    setTaskIndex,
  } = useTaskContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // const [taskIndex, setTaskIndex] = useState(null);

  useEffect(() => {
    // setTaskIndex(() => {
    //   //index of task in taskArr passed via search params
    //   for (const [key] of searchParams.entries()) {
    //     return key;
    //   }
    // });
    console.log('task index in useEffect', taskIndex);
  }, [setTaskIndex, searchParams]);

  //to avoid renaming everything and causing bugs lmao
  const [task, setTask] = useState(taskToOpen);

  const deleteTask = () => {
    const filteredArr = [...taskArr].filter((item) => item !== task);
    setTaskArr(filteredArr);
    setUnfilteredTaskArr([...unfilteredTaskArr].filter((item) => item !== task));
    navigate('/');
  };

  const [checklistClicked, setChecklistClicked] = useState(task?.checklistItemsCompletedIndices);
  const [checklistClickedPercentage, setChecklistClickedPercentage] = useState();

  useEffect(() => {
    setChecklistClickedPercentage(() => {
      const percentage = checklistClicked?.reduce((acc, current) => {
        return acc + (current === true ? Math.ceil(100 / checklistClicked.length) : 0);
      }, 0);
      return percentage;
    });
  }, [checklistClickedPercentage, checklistClicked]);

  function updateNestedData(newArr) {
    //taskIndex = location of task in taskArr
    //find task, replace old boolean array w/ new array from handleChecklistClicked
    //to not mutate state
    setTaskArr((prevState) =>
      prevState.map((item, index) =>
        index === taskIndex * 1 ? { ...item, checklistItemsCompletedIndices: newArr } : item,
      ),
    );
    setUnfilteredTaskArr((prevState) =>
      prevState.map((item, index) =>
        index === taskIndex * 1 ? { ...item, checklistItemsCompletedIndices: newArr } : item,
      ),
    );
  }

  const handleChecklistClicked = (index) => {
    //slice to not mutate state
    const sliced = checklistClicked.slice();
    sliced[index] = !sliced[index];
    updateNestedData(sliced);
    setChecklistClicked(sliced);
  };

  return (
    <div className="taskDetails">
      <h4>Task Details</h4>
      <div className="taskTwo">
        <h4>{task?.taskName}</h4>
        <div>
          <CalendarMonthIcon />
          Due Date: {task.date} {task.time}
        </div>
        <div>
          <ArrowUpwardIcon />
          Priority: {task.priorityLevel}
        </div>
        <div>
          <OpenWithIcon />
          Complexity: {task.complexityLevel}
        </div>
        <div>Task Complete</div>
        <LinearProgress value={checklistClickedPercentage} variant="determinate" />
        <div className="checklistBox">
          Checklist for Subtasks
          {task?.checklist?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleChecklistClicked(index)}
              className="checklistTask"
              //looks ugly but dynamically changing classNames was not working
              style={{
                backgroundColor: checklistClicked[index] ? '#d3ffd3' : 'white',
                padding: '8px',
                border: '1px solid #ddd',
                marginBottom: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {item}
              <CheckIcon />
            </div>
          ))}
        </div>
      </div>

      <div class="taskDetailsBtns">
        <button onClick={() => navigate(`/`)}>
          <UndoIcon />
        </button>
        <button>
          <RepeatIcon />
        </button>
        <button onClick={() => deleteTask()}>
          <DeleteIcon />
        </button>
        <button onClick={() => navigate(`/addTask?${taskIndex}`)}>
          <ModeEditIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
