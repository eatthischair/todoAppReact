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
      (index + 1 === priorityLevel && forPriority) ||
      (index + 1 === complexityLevel && forComplexity)
    ) {
      return (
        <button className="selectorButton selected" key={index} onClick={() => onClick(index + 1)}>
          {index + 1}
        </button>
      );
    } else {
      return (
        <button className="selectorButton" key={index} onClick={() => onClick(index + 1)}>
          {index + 1}
        </button>
      );
    }
  });
};

export default LevelSelector;
