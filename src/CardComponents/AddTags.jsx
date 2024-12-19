import {useEffect, useState} from 'react';

const AddTags = ({tags, setTags, tagsPlaceholder}) => {

  const [inputValue, setInputValue] = useState(''); // Holds the current value of the input

  useEffect(() => {
    if (tagsPlaceholder) {
      setInputValue(tagsPlaceholder);
    }
  }, []);


  const makeTags = (e) => {
    setInputValue(e)
    let tagsArr = e.split(',');
    let trimmedArray = tagsArr.map(str => str.trim()).filter(str => str)
    setTags(trimmedArray)
  }

  return (
  <div>
    <label for="checklist">Add Tags</label>
    <input onChange={(e) => makeTags(e.target.value)} type="text" placeholder="Tag1, Tag2, Tag3,..." value={inputValue}></input>
  </div>
)

}

export default AddTags