import { useState, useEffect } from 'react';
import LevelSelector from '../Components/LevelSelector';
import DateandTimeInput from '../Components/DateandTimeInput';
import AddChecklist from '../Components/AddChecklist';
import AddTags from '../Components/AddTags';
import UndoIcon from '@mui/icons-material/Undo';

import { useTaskContext } from '../context/TaskContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddTaskModal = () => {
  const { taskArr, setTaskArr, setUnfilteredTaskArr, taskToOpen } = useTaskContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [taskIndex, setTaskIndex] = useState(null);

  useEffect(() => {
    //index to splice in edited task.
    let taskIndexValue = -1;
    for (const [key] of searchParams.entries()) {
      if (key !== 'navFromHome') {
        taskIndexValue = key;
      }
    }
    setTaskIndex(taskIndexValue);
  }, [searchParams]);

  const [task, setTask] = useState(taskToOpen);
  const [taskInputVal, setTaskInputVal] = useState(task?.taskName);
  const [priorityLevel, setPriorityLevel] = useState(task?.priorityLevel);
  const [complexityLevel, setComplexityLevel] = useState(task?.complexityLevel);
  const [date, setDate] = useState(task?.date);
  const [time, setTime] = useState(task?.time);
  const [checklist, setChecklist] = useState(task?.checklist);
  const [currentItem, setCurrentItem] = useState('');
  const [tags, setTags] = useState(task?.tags);

  const updateTaskName = (task) => {
    setTaskInputVal(task);
  };
  const updatePriorityLevel = (num) => {
    setPriorityLevel(num);
  };
  const updateComplexityLevel = (num) => {
    setComplexityLevel(num);
  };
  const goBack = () => {
    navigate('/');
  };

  const saveTask = () => {
    const taskObj = {
      taskName: taskInputVal,
      date: date,
      time: time,
      priorityLevel: priorityLevel,
      complexityLevel: complexityLevel,
      powerLevel: (priorityLevel || 0) + (complexityLevel || 0),
      tags: tags || [],
      checklist: checklist || task?.checklist,
      done: false,
    };
    //array of booleans to track completion of subtasks
    taskObj.checklistItemsCompletedIndices = taskObj.checklist
      ? taskObj.checklist.slice().fill(false, 0)
      : [];

    //if editing task, replace old v. with new version
    const newTaskArr = taskArr?.slice();
    if (taskIndex !== -1) newTaskArr.splice(taskIndex, 1);

    setUnfilteredTaskArr([...newTaskArr, taskObj]);
    setTaskArr([...newTaskArr, taskObj]);
    navigate('/');
  };

  return (
    <div className="taskModal">
      <div className="taskForm">
        <h1>Add New Task</h1>
        <h2>Task Name</h2>
        <input
          onChange={(e) => updateTaskName(e.target.value)}
          type="text"
          placeholder="Name of task..."
          value={taskInputVal}
        />
        <div>Level of Priority</div>

        <div className="levelContainer">
          <LevelSelector onClick={updatePriorityLevel} priorityLevel={priorityLevel} forPriority />
        </div>

        <div>Level of Complexity</div>
        <div className="levelContainer">
          <LevelSelector
            onClick={updateComplexityLevel}
            complexityLevel={complexityLevel}
            forComplexity
          />
        </div>

        <DateandTimeInput
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          datePlaceholder={date}
          timePlaceholder={time}
        />

        <AddChecklist
          checklist={checklist}
          setChecklist={setChecklist}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          checklistPlaceholder={checklist}
        />

        <AddTags tags={tags} setTags={setTags} />

        <div className="buttonRow" />
        <button className="buttonRowbtn" onClick={() => saveTask()}>
          Save Task
        </button>
        <button onClick={() => goBack()}>
          <UndoIcon />
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
