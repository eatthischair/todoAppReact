import { useState, useEffect } from 'react';
import LevelSelector from '../Components/LevelSelector';
import DateandTimeInput from '../Components/DateandTimeInput';
import AddChecklist from '../Components/AddChecklist';
import AddTags from '../Components/AddTags';
import UndoIcon from '@mui/icons-material/Undo';

import { useTaskContext } from '../context/TaskContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddTaskModal = () => {
  const { taskArr, setTaskArr, setUnfilteredTaskArr, taskToOpen, setTaskToOpen } = useTaskContext();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  const [taskIndex, setTaskIndex] = useState(null);
  const [task, setTask] = useState(taskToOpen);

  useEffect(() => {
    let taskIndexValue = -1;
    for (const [key] of searchParams.entries()) {
      if (key !== 'navFromHome') {
        taskIndexValue = key;
      }
    }
    setTaskIndex(taskIndexValue);
  }, [searchParams]);

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
    let taskObj = {
      taskName: taskInputVal,
      date: date || task?.date,
      time: time || task?.time,
      priorityLevel: priorityLevel + 1,
      complexityLevel: complexityLevel + 1,
      powerLevel: (priorityLevel || 0) + (complexityLevel || 0),
      tags: tags || task?.tags,
      checklist: checklist || task?.checklist,
      done: false || task?.done,
    };
    taskObj.checklistItemsCompletedIndices = taskObj.checklist
      ? taskObj.checklist.slice().fill(false, 0)
      : [];

    let newTaskArr = taskArr?.slice();
    if (taskIndex !== -1) newTaskArr.splice(taskIndex, 1);

    setUnfilteredTaskArr([...newTaskArr, taskObj]);
    setTaskArr([...newTaskArr, taskObj]);
    navigate('/');
  };

  return (
    <div class="taskModal">
      <div class="taskForm">
        <h1>Add New Task</h1>
        <h2>Task Name</h2>
        <input
          onChange={(e) => updateTaskName(e.target.value)}
          type="text"
          placeholder="Name of task..."
          value={taskInputVal}
        ></input>
        <div>Level of Priority</div>

        <div class="levelContainer">
          <LevelSelector
            onClick={updatePriorityLevel}
            priorityLevel={priorityLevel}
            forPriority
          ></LevelSelector>
        </div>

        <div>Level of Complexity</div>
        <div class="levelContainer">
          <LevelSelector
            onClick={updateComplexityLevel}
            complexityLevel={complexityLevel}
            forComplexity
          ></LevelSelector>
        </div>

        <DateandTimeInput
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          datePlaceholder={date}
          timePlaceholder={time}
        ></DateandTimeInput>

        <AddChecklist
          checklist={checklist}
          setChecklist={setChecklist}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          checklistPlaceholder={checklist}
        ></AddChecklist>

        <AddTags tags={tags} setTags={setTags} tagsPlaceholder={tags}></AddTags>

        <div class="buttonRow"></div>
        <button class="buttonRowbtn" onClick={() => saveTask()}>
          Save Task
        </button>
        <button onClick={() => goBack()}>
          <UndoIcon></UndoIcon>
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
