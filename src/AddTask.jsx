import AddTaskModal from './AddTaskModal';
const AddTask = ({taskArr, setTaskArr, editTaskModalIsOpen, setEditTaskModalIsOpen, taskModalOpen, setTaskModalOpen}) => {

  return (
    <div class='addTask'>
    <button onClick={() => setEditTaskModalIsOpen(true)}>+ Add Task</button>
    {editTaskModalIsOpen ? <AddTaskModal
    editTaskModalIsOpen={editTaskModalIsOpen}
    setEditTaskModalIsOpen={setEditTaskModalIsOpen}
    taskArr={taskArr}
    setTaskArr={setTaskArr}
    taskModalOpen={taskModalOpen}
    setTaskModalOpen={setTaskModalOpen}
    editTaskModalFromDetails={false}></AddTaskModal> : ''}
    </div>
  )
}

export default AddTask;

