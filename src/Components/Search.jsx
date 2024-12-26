import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useTaskContext } from "../context/TaskContext";

const Search = () => {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr } =
    useTaskContext();

  const handleSearch = (input) => {
    let newTaskArr = taskArr.slice().filter((task) => {
      return task.taskName.includes(input);
    });
    console.log("imput", input, newTaskArr, "AAA", unfilteredTaskArr);

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
      {/* <button><ArrowRightAltIcon></ArrowRightAltIcon></button> */}
    </div>
  );
};

export default Search;
