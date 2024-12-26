import Search from "./Components/Search.jsx";
import TaskDisplay from "./Components/TaskDisplay.jsx";
import Sort from "./Components/Sort.jsx";
import Filter from "./Components/Filter.jsx";
import AddTaskModal from "./Pages/AddTaskModal.jsx";
import PowerMode from "./Components/PowerMode.jsx";

import { useTaskContext } from "./context/TaskContext.jsx";

const HomePage = () => {
  const { taskArr, setTaskArr } = useTaskContext();

  return (
    <div>
      <Search></Search>
      <Sort></Sort>
      <Filter></Filter>
      <PowerMode></PowerMode>
      <TaskDisplay></TaskDisplay>
      <AddTaskModal></AddTaskModal>
    </div>
  );
};

export default HomePage;
