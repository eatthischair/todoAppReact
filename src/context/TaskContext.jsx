import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskArr, setTaskArr] = useState([]);
  const [unfilteredTaskArr, setUnfilteredTaskArr] = useState([]);
  const [taskToOpen, setTaskToOpen] = useState({});
  const [taskIndex, setTaskIndex] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        taskArr,
        setTaskArr,
        unfilteredTaskArr,
        setUnfilteredTaskArr,
        taskToOpen,
        setTaskToOpen,
        taskIndex,
        setTaskIndex,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('');
  }
  return context;
}
