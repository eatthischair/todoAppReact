import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskArr, setTaskArr] = useState([]);
  const [unfilteredTaskArr, setUnfilteredTaskArr] = useState([]);
  const [taskToOpen, setTaskToOpen] = useState({});
  const [taskIndex, setTaskIndex] = useState(false);

  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTaskArr(savedTasks);
      setUnfilteredTaskArr(savedTasks);
      hasLoaded.current = true;
    }
  }, [setTaskArr, setUnfilteredTaskArr]);

  useEffect(() => {
    if (unfilteredTaskArr) localStorage.setItem('tasks', JSON.stringify(unfilteredTaskArr));
  }, [unfilteredTaskArr]);

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
