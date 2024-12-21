import { useEffect, useState } from "react";

export function useLocalStorage(tasks) {
  useEffect(() => {
    if (tasks && typeof tasks === "object")
      localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("im inside local storage boss", tasks);
  }, [tasks]);
}

export function useRetrieveLocalStorage() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks || [];
  } catch {
    return [];
  }
}
