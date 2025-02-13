import { useState, useEffect } from 'react';
import {
  UndoIcon,
  RepeatIcon,
  DeleteIcon,
  ModeEditIcon,
  CalendarMonthIcon,
  ArrowUpwardIcon,
  OpenWithIcon,
  CheckIcon,
  LinearProgress,
} from '../mui/index.js';

import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr, taskToOpen, taskIndex } =
    useTaskContext();
  const navigate = useNavigate();

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
