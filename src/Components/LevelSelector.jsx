const LevelSelector = ({
  type,
  onClick,
  priorityLevel,
  complexityLevel,
  taskPriority,
  taskComplexity,
}) => {
  // console.log('level selector', taskPriority, taskComplexity)

  return Array.from({ length: 10 }, (element, index) => {
    if (
      (index === priorityLevel && !complexityLevel) ||
      (index === complexityLevel && !priorityLevel)
    ) {
      return (
        <button
          class="selectorButton selected"
          key={index}
          onClick={() => onClick(index)}
        >
          {index + 1}
        </button>
      );
    } else {
      return (
        <button
          class="selectorButton"
          key={index}
          onClick={() => onClick(index)}
        >
          {index + 1}
        </button>
      );
    }
  });
};

export default LevelSelector;
