export const proceedingPercentage = (count, goalCount) => {
  if (goalCount == 0) {
    return "100%";
  }
  return `${(count / goalCount) * 100}%`;
};
