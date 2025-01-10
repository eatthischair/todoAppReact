import { useEffect, useState } from 'react';

const AddTags = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (tags) {
      //placeholder passed in if editing task
      setInputValue(tags);
    }
  }, [tags]);

  const makeTags = (e) => {
    setInputValue(e);
    const tagsArr = e.split(',');
    const trimmedArray = tagsArr.map((str) => str.trim()).filter((str) => str);
    setTags(trimmedArray);
  };

  return (
    <div>
      <label for="checklist">Add Tags</label>
      <input
        onChange={(e) => makeTags(e.target.value)}
        type="text"
        placeholder="Tag1, Tag2, Tag3,..."
        value={inputValue}
      />
    </div>
  );
};

export default AddTags;
