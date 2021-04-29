
const formatDate = (date) => {
  return (
    date.getDate() + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
  );
};

const calculateDaysBetweenDates = (date1, date2) => {
  // To calculate the time difference of two dates
  const differenceInTime = date2.getTime() - date1.getTime();

  // To calculate the n. of days between two dates
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};

export { formatDate, calculateDaysBetweenDates }