export const formatTime = (hours, minutes) => {
  return `${hours}:${minutes}`.replace(/^\d(?=:)|(?<=:)\d$/g, "0$&");
};
