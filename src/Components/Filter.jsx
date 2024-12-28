import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Filter = ({ filterIsOn, setFilterIsOn }) => {
  const { taskArr, setTaskArr, unfilteredTaskArr } = useTaskContext();

  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setTaskArr(() => {
      if (selectedTags.length === 0) {
        return unfilteredTaskArr;
      } else {
        return unfilteredTaskArr.filter((task) =>
          task.tags.some((tag) => selectedTags.includes(tag)),
        );
      }
    });
  }, [selectedTags, unfilteredTaskArr]);

  useEffect(() => {
    const findAllTags = () => {
      let tagsArr = [];
      unfilteredTaskArr.forEach((task) => {
        tagsArr.push(task.tags);
      });
      tagsArr.flat();
      return tagsArr.flat();
    };
    setAllTags(findAllTags());
  }, [taskArr]);

  const addOrRemoveTagFromSelected = (tag) => {
    if (selectedTags.includes(tag)) {
      return selectedTags.filter((item) => item !== tag);
    } else {
      return [...selectedTags, tag];
    }
  };

  const filterTasksByTag = (tag, selectedTags) => {
    const filteredTasks = unfilteredTaskArr.filter((task) =>
      task.tags.some((tag) => selectedTags.includes(tag)),
    );
    return filteredTasks;
  };

  const handleTagOnClick = (tag) => {
    let newSelectedTags = addOrRemoveTagFromSelected(tag);
    filterTasksByTag(tag, newSelectedTags);
    setSelectedTags(newSelectedTags);
  };

  const CustomFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& fieldset': {
        borderRadius: '20px',
      },
    },
  }));

  return (
    <CustomFormControl fullWidth>
      <InputLabel id="demo-simple-select-label2">Filter</InputLabel>
      <Select labelId="demo-simple-select-label2" id="demo-simple-select2" multiple value={allTags}>
        {allTags
          ? allTags.map((tag, index) => {
              return (
                <MenuItem>
                  {tag}
                  <Checkbox
                    onClick={() => handleTagOnClick(tag)}
                    checked={selectedTags.includes(tag)}
                  ></Checkbox>
                  <ListItemText></ListItemText>
                </MenuItem>
              );
            })
          : ''}
      </Select>
    </CustomFormControl>
  );
};

export default Filter;
