export const makeTagBubbles = (tags) => {
  if (tags) {
    return tags.map((item) => {
      return <div className="tag">{item}</div>;
    });
  }
};
