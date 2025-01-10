import Search from '../Components/Search.jsx';
import TaskDisplay from '../Components/TaskDisplay.jsx';
import Sort from '../Components/Sort.jsx';
import Filter from '../Components/Filter.jsx';
import PowerMode from '../Components/PowerMode.jsx';
import AddTask from '../Components/AddTask.jsx';

const HomePage = () => {
  return (
    <div>
      <Search />
      <div className="btns">
        <Sort />
        <Filter />
      </div>
      <PowerMode />
      <TaskDisplay />
      <AddTask />
    </div>
  );
};

export default HomePage;
