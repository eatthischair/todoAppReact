import { useTaskContext } from '../context/TaskContext';

const Search = () => {
  const { setTaskArr, unfilteredTaskArr } = useTaskContext();

  const handleSearch = (input) => {
    setTaskArr((prevTaskArr) => {
      if (input.length !== 0) {
        let newTaskArr = unfilteredTaskArr.slice().filter((task) => {
          return task.taskName.includes(input);
        });
        return newTaskArr;
      } else {
        return unfilteredTaskArr; // This part is correct
      }
    });
  };

  return (
    <div class="searchbar">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        id="fname"
        name="fname"
        placeholder="Search..."
      ></input>
    </div>
  );
};

export default Search;
