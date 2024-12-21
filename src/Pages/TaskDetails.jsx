import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import UndoIcon from "@mui/icons-material/Undo";
import RepeatIcon from "@mui/icons-material/Repeat";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import CheckIcon from "@mui/icons-material/Check";
import LinearProgress from "@mui/material/LinearProgress";

const TaskDetails = ({
  task,
  taskDetailsOpen,
  setTaskDetailsOpen,
  taskArr,
  setTaskArr,
  editTaskModalIsOpen,
  setEditTaskModalIsOpen,
  unfilteredTaskArr,
  setUnfilteredTaskArr,
  taskIndex,
}) => {
  console.log("TASK INDEX", taskIndex, task);
  //bypassing state mgmt issue bc this component is a modal, passing Task to another modal
  const [deepCopyTask, setDeepCopyTask] = useState(
    JSON.parse(JSON.stringify(task)),
  );

  const deleteTask = () => {
    setTaskArr(taskArr.filter((item) => item !== task));
    setTaskDetailsOpen(false);
  };

  const [checklistClicked, setChecklistClicked] = useState(
    task.checklistItemsCompletedIndices,
  );
  const [checklistClickedPercentage, setChecklistClickedPercentage] =
    useState(0);

  function updateNestedData(newArr) {
    console.log("UPDATENESTED DATA", newArr);
    setTaskArr((prevState) =>
      prevState.map((item, index) =>
        index === taskIndex
          ? { ...item, checklistItemsCompletedIndices: newArr }
          : item,
      ),
    );
  }

  const handleChecklistClicked = (index) => {
    console.log("CHECKLIST CLICKED", index, "TASK", task);

    let sliced = checklistClicked.slice();
    sliced[index] = !sliced[index];
    updateNestedData(sliced);
    setChecklistClicked(sliced);

    let val = 0;
    for (let i = 0; i < sliced.length; i++) {
      if (sliced[i] === true) {
        val += Math.ceil(100 / sliced.length);
      }
    }
    setChecklistClickedPercentage(val);
  };

  return (
    <div class="taskDetails">
      <h4>Task Details</h4>
      <div class="task">
        <h4>{task?.taskName}</h4>
        <div>
          <CalendarMonthIcon></CalendarMonthIcon>Due Date: {task.date}{" "}
          {task.time}
        </div>
        <div>
          <ArrowUpwardIcon></ArrowUpwardIcon>Priority: {task.priorityLevel}
        </div>
        <div>
          <OpenWithIcon></OpenWithIcon>Complexity: {task.complexityLevel}
        </div>
        <div>Task Complete</div>
        <LinearProgress
          value={checklistClickedPercentage}
          variant="determinate"
        ></LinearProgress>
        <div class="checklistBox">
          Checklist for Subtasks
          {task?.checklist?.map((item, index) => (
            <div
              onClick={() => handleChecklistClicked(index)}
              class="checklistTask"
              style={{
                backgroundColor: checklistClicked[index] ? "#d3ffd3" : "white",
                cursor: "pointer",
                padding: "8px",
                border: "1px solid #ddd",
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {item}
              <CheckIcon></CheckIcon>
            </div>
          ))}
        </div>
      </div>

      <div class="taskDetailsBtns">
        <button onClick={() => setTaskDetailsOpen(false)}>
          <UndoIcon></UndoIcon>
        </button>
        <button>
          <RepeatIcon></RepeatIcon>
        </button>
        <button onClick={() => deleteTask()}>
          <DeleteIcon></DeleteIcon>
        </button>
        <button onClick={() => setEditTaskModalIsOpen(true)}>
          <ModeEditIcon></ModeEditIcon>
        </button>
      </div>

      <div>
        {editTaskModalIsOpen ? (
          <AddTaskModal
            taskDetailsOpen={taskDetailsOpen}
            setTaskDetailsOpen={setTaskDetailsOpen}
            taskArr={taskArr}
            setTaskArr={setTaskArr}
            task={deepCopyTask}
            setDeepCopyTask={setDeepCopyTask}
            setEditTaskModalIsOpen={setEditTaskModalIsOpen}
            editTaskModalFromDetails={true}
            unfilteredTaskArr={unfilteredTaskArr}
            setUnfilteredTaskArr={setUnfilteredTaskArr}
          ></AddTaskModal>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
