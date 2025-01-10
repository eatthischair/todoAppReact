export const findChecklistPercentageCompleted = (task) => {
  const { checklistItemsCompletedIndices } = task;
  if (!checklistItemsCompletedIndices.length) return 0;

  const completed = checklistItemsCompletedIndices.reduce((acc, isCompleted) => {
    return acc + (isCompleted ? 1 : 0);
  }, 0);
  return (completed / checklistItemsCompletedIndices.length) * 100;
};
