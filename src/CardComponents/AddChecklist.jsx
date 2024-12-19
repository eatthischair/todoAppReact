import {useCallback} from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AddChecklist = ({checklist, setChecklist, currentItem, setCurrentItem, checklistPlaceholder}) => {

  const handleInputChange = useCallback((e) => {
  const updateItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentItem(e.target.value)
    }
    updateItem(e);
  }, []);

  const updateChecklist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentItem('');
    setChecklist((prevChecklist) => {
        if (checklist) {
          return [...checklist, currentItem]
        } else {
          return [currentItem]
        }
      }
    )
  }

  const deleteItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setChecklist((prevChecklist) => prevChecklist.filter((i) => i !== item))
  }

  return (
    <form>
      <label for="checklist">Add Checklist</label>
      <div class='checklistInput'>
      <input onChange={(e) => handleInputChange(e)} type="text" placeholder="Add Item..."
        value={currentItem}>
      </input>
      <button onClick={(e) => updateChecklist(e)}><AddIcon></AddIcon></button>
      </div>

      <div>{checklist?.map((item) => {
        return (<div>{item}
      <button onClick={(e) => deleteItem(e, item)}><DeleteIcon></DeleteIcon></button></div>)})}</div>
    </form>
  )
}

export default AddChecklist