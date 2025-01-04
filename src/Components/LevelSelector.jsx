const LevelSelector = ({
  type,
  onClick,
  priorityLevel,
  complexityLevel,
  forPriority,
  forComplexity,
}) => {
  return Array.from({ length: 10 }, (element, index) => {
    if (
      (index === priorityLevel - 1 && forPriority) ||
      (index === complexityLevel - 1 && forComplexity)
    ) {
      return (
        <button class="selectorButton selected" key={index} onClick={() => onClick(index)}>
          {index + 1}
        </button>
      );
    } else {
      return (
        <button class="selectorButton" key={index} onClick={() => onClick(index)}>
          {index + 1}
        </button>
      );
    }
  });
};

export default LevelSelector;
