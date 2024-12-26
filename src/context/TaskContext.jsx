import React, { createContext, useState, useContext } from "react";

// 1. Create the context
const TaskContext = createContext();

// 2. Create the provider component
export function TaskProvider({ children }) {
  const [taskArr, setTaskArr] = useState([]);
  const [unfilteredTaskArr, setUnfilteredTaskArr] = useState([]);

  return (
    <TaskContext.Provider
      value={{ taskArr, setTaskArr, unfilteredTaskArr, setUnfilteredTaskArr }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// 3. Custom hook to consume the context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
