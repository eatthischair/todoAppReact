import { AddIcon, DeleteIcon } from '../mui/index.js';

const AddChecklist = ({
  checklist,
  setChecklist,
  currentItem,
  setCurrentItem,
  checklistPlaceholder,
}) => {
  //e.preventDefault() & e.stopPropagation() necessary or + button closes the form

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentItem(e.target.value);
  };

  const updateChecklist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentItem('');
    setChecklist((prevChecklist) => {
      if (checklist) {
        return [...checklist, currentItem];
      } else {
        return [currentItem];
      }
    });
  };

  const deleteItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setChecklist((prevChecklist) => prevChecklist.filter((i) => i !== item));
  };

  return (
    <form>
      <label for="checklist">Add Checklist</label>
      <div className="checklistInput">
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Add Item..."
          value={currentItem}
        />
        <button onClick={(e) => updateChecklist(e)}>
          <AddIcon />
        </button>
      </div>

      <div>
        {checklist?.map((item, index) => {
          return (
            <div key={index}>
              {item}
              <button onClick={(e) => deleteItem(e, item)}>
                <DeleteIcon />
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default AddChecklist;
