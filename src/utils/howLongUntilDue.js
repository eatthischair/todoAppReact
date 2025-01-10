export const howLongUntilDue = (dateString, timeString) => {
  const today = new Date();
  const taskDate = new Date(dateString);
  const differenceInDays = (taskDate - today) / (24 * 60 * 60 * 1000);
  if (differenceInDays <= 1) {
    return 'red';
  } else if (differenceInDays <= 3) {
    return 'orange';
  } else {
    return 'inherit';
  }
};
