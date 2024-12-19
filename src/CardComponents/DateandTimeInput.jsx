
const DateandTimeInput = ({date, setDate, time, setTime, datePlaceholder, timePlaceholder}) => {

  // console.log('date and time', datePlaceholder, timePlaceholder)
  const handleDate = (e) => {
    setDate(e.target.value);
    // console.log('date', e.target.value)
  }

  const handleTime = (e) => {
    setTime(e.target.value);
    // console.log('time', e.target.value);
  }

  return (
    <div>
    <label for="start">Choose a due date:</label>
    <input onChange={(e) => handleDate(e)} type="date" id="date" name="trip-start" min="2024-01-01" max="2025-12-31" value={date || datePlaceholder }/>
    <label for="appt">Select Time:</label>
    <input onChange={(e) => handleTime(e)} type="time" id="appt" name="appt" min="00:00" max="23:99" placeholder="00:00" value={time || timePlaceholder} />
    </div>
  )

}

export default DateandTimeInput;