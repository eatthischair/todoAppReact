import Search from '../Components/Search';
import TaskDisplay from '../Components/TaskDisplay.jsx';
import Sort from '../Components/Sort.jsx';
import Filter from '../Components/Filter.jsx';
import PowerMode from '../Components/PowerMode.jsx';
import AddTask from '../Components/AddTask';

const HomePage = () => {
  return (
    <div>
      <Search></Search>
      <div className="btns">
        <Sort></Sort>
        <Filter></Filter>
      </div>
      <PowerMode></PowerMode>
      <TaskDisplay></TaskDisplay>
      <AddTask></AddTask>
    </div>
  );
};

export default HomePage;
