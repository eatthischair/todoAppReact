import { useEffect, useRef } from 'react';
import { useTaskContext } from './context/TaskContext';

export function useLoadTasks() {
  const { setTaskArr, setUnfilteredTaskArr } = useTaskContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTaskArr(savedTasks);
      setUnfilteredTaskArr(savedTasks);
      hasLoaded.current = true;
    }
  }, [setTaskArr, setUnfilteredTaskArr]);
}

export function useSaveTasks(tasks) {
  useEffect(() => {
    if (tasks && typeof tasks === 'object') localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
}
