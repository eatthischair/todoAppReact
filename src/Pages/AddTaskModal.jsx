import { useState, useEffect } from "react";
import LevelSelector from "../Components/LevelSelector";
import DateandTimeInput from "../Components/DateandTimeInput";
import AddChecklist from "../Components/AddChecklist";
import AddTags from "../Components/AddTags";
import UndoIcon from "@mui/icons-material/Undo";

const AddTaskModal = ({
  taskDetailsOpen,
  setTaskDetailsOpen,
  taskArr,
  setTaskArr,
  task,
  editTaskModalIsOpen,
  setEditTaskModalIsOpen,
  setDeepCopyTask,
  editTaskModalFromDetails,
  unfilteredTaskArr,
  setUnfilteredTaskArr,
}) => {
  const [taskObj, setTaskObj] = useState({});
  const [taskInputVal, setTaskInputVal] = useState(task?.taskName);

  const [priorityLevel, setPriorityLevel] = useState(0);
  const [complexityLevel, setComplexityLevel] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [tags, setTags] = useState([]);

  const [taskIndex, setTaskIndex] = useState(null);

  useEffect(() => {
    setTaskIndex(findTaskIndex());
  }, [task]);

  useEffect(() => {
    setPriorityLevel(task?.priorityLevel);
    setComplexityLevel(task?.complexityLevel);
    setChecklist(task?.checklist);
  }, [task]);

  useEffect(() => {
    setTaskInputVal(task?.taskName);
  }, [task]);

  const findTaskIndex = () => {
    return taskArr.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(task),
    );
  };
  const updateTaskName = (task) => {
    setTaskInputVal(task);
  };

  const updatePriorityLevel = (num) => {
    setPriorityLevel(num);
  };
  const updateComplexityLevel = (num) => {
    setComplexityLevel(num);
  };

  const saveTask = () => {
    let taskObj = {
      taskName: taskInputVal,
      date: date || task?.date,
      time: time || task?.time,
      priorityLevel: priorityLevel,
      complexityLevel: complexityLevel,
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
    setTaskDetailsOpen(false);
    setTaskObj(taskObj);
    setEditTaskModalIsOpen(false);
  };

  const goBack = () => {
    setEditTaskModalIsOpen(false);
  };

  if ((editTaskModalFromDetails && task) || (!taskDetailsOpen && !task)) {
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
              taskPriority={task?.priorityLevel}
            ></LevelSelector>
          </div>

          <div>Level of Complexity</div>
          <div class="levelContainer">
            <LevelSelector
              onClick={updateComplexityLevel}
              complexityLevel={complexityLevel}
              taskComplexity={task?.complexityLevel}
            ></LevelSelector>
          </div>

          <DateandTimeInput
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            datePlaceholder={task?.date}
            timePlaceholder={task?.time}
          ></DateandTimeInput>

          <AddChecklist
            checklist={checklist}
            setChecklist={setChecklist}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            checklistPlaceholder={task?.checklist || checklist}
          ></AddChecklist>

          <AddTags
            tags={tags}
            setTags={setTags}
            tagsPlaceholder={task?.tags}
          ></AddTags>

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
  }
};

export default AddTaskModal;
