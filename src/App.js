import {useState, useEffect, useRef} from 'react';

import './App.css';
import Search from './CardComponents/Search'
import TaskDisplay from './TaskDisplay';
import Sort from './CardComponents/Sort'
import Filter from './CardComponents/Filter';
import AddTaskModal from './AddTaskModal';
import PowerMode from './PowerMode.jsx';


function App() {

  const [taskArr, setTaskArr] = useState([]);
  const [unfilteredTaskArr, setUnfilteredTaskArr] = useState([]);
  //for display
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  //for editing
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false)
  const hasLoaded = useRef(false);
  //for filter
  const [filterIsOn, setFilterIsOn] = useState(false);

  useEffect(() => {
    if (!hasLoaded.current) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskArr(savedTasks);
    setUnfilteredTaskArr(savedTasks);
    hasLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) {
      if (taskArr) localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
  }, [taskArr]);

  useEffect(() => {
    let biggerTaskArr = unfilteredTaskArr.length > taskArr.length ? unfilteredTaskArr : taskArr;
    localStorage.setItem("tasks", JSON.stringify(biggerTaskArr));
  }, [unfilteredTaskArr, taskArr]);


  return (
    <div className="App">
    <Search taskArr={taskArr} setTaskArr={setTaskArr}
    unfilteredTaskArr={unfilteredTaskArr}
    setUnfilteredTaskArr={setUnfilteredTaskArr}></Search>

    <div class='btns'>
    <Sort taskArr={taskArr} setTaskArr={setTaskArr}></Sort>
    <Filter taskArr={taskArr} setTaskArr={setTaskArr}
    unfilteredTaskArr={unfilteredTaskArr} setUnfilteredTaskArr={setUnfilteredTaskArr}>
    </Filter>
    </div>

    <PowerMode taskArr={taskArr} setTaskArr={setTaskArr}
    unfilteredTaskArr={unfilteredTaskArr} setUnfilteredTaskArr={setUnfilteredTaskArr}>
    </PowerMode>

    <TaskDisplay taskArr={taskArr} setTaskArr={setTaskArr}
    taskDetailsOpen={taskDetailsOpen} setTaskDetailsOpen={setTaskDetailsOpen}
    editTaskModalIsOpen={editTaskModalIsOpen}
    setEditTaskModalIsOpen={setEditTaskModalIsOpen}
    unfilteredTaskArr={unfilteredTaskArr}
    setUnfilteredTaskArr={setUnfilteredTaskArr}>
    </TaskDisplay>

    <div class='addTask'>
      <button onClick={() => setEditTaskModalIsOpen(true)}>+ Add Task</button>
      {editTaskModalIsOpen ?
        <AddTaskModal
        editTaskModalIsOpen={editTaskModalIsOpen}
        setEditTaskModalIsOpen={setEditTaskModalIsOpen}
        taskArr={taskArr}
        setTaskArr={setTaskArr}
        taskDetailsOpen={taskDetailsOpen}
        setTaskDetailsOpen={setTaskDetailsOpen}
        unfilteredTaskArr={unfilteredTaskArr}
        setUnfilteredTaskArr={setUnfilteredTaskArr}>
        </AddTaskModal> : ''}
    </div>
    </div>
  );
}

export default App;
