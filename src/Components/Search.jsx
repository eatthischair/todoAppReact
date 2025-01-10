import { useTaskContext } from '../context/TaskContext';

const Search = () => {
  const { setTaskArr, unfilteredTaskArr } = useTaskContext();

  const handleSearch = (input) => {
    setTaskArr((prevTaskArr) => {
      if (input.length !== 0) {
        const newTaskArr = unfilteredTaskArr.slice().filter((task) => {
          return task.taskName.includes(input);
        });
        return newTaskArr;
      } else {
        return unfilteredTaskArr;
      }
    });
  };

  return (
    <div className="searchbar">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        id="fname"
        name="fname"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
