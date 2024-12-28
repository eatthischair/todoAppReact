import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTaskContext } from '../context/TaskContext';

const Sort = () => {
  const { taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr } = useTaskContext();

  const CustomFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& fieldset': {
        borderRadius: '20px',
      },
    },
  }));

  const sortByAscendingDate = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });
      return sorted;
    });
  };

  const sortByDescendingDate = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
      });
      return sorted;
    });
  };

  const sortByAscendingPriority = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        return a.priorityLevel - b.priorityLevel;
      });
      return sorted;
    });
  };

  const sortByDescendingPriority = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        return b.priorityLevel - a.priorityLevel;
      });
      return sorted;
    });
  };

  const sortByAscendingComplexity = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        return a.complexityLevel - b.complexityLevel;
      });
      return sorted;
    });
  };

  const sortByDescendingComplexity = () => {
    setTaskArr((prevTaskArr) => {
      const sorted = [...prevTaskArr].sort((a, b) => {
        return b.complexityLevel - a.complexityLevel;
      });
      return sorted;
    });
  };

  return (
    <div class="sort">
      <CustomFormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select">
          <MenuItem>Default</MenuItem>
          <MenuItem onClick={() => sortByAscendingDate()}>Ascending Date</MenuItem>
          <MenuItem onClick={() => sortByDescendingDate()}>Descending Date</MenuItem>
          <MenuItem onClick={() => sortByAscendingComplexity()}>Ascending Complexity</MenuItem>
          <MenuItem onClick={() => sortByDescendingComplexity()}>Descending Complexity</MenuItem>
          <MenuItem onClick={() => sortByAscendingPriority()}>Ascending Priority</MenuItem>
          <MenuItem onClick={() => sortByDescendingPriority()}>Descending Priority</MenuItem>
        </Select>
      </CustomFormControl>
    </div>
  );
};

export default Sort;
