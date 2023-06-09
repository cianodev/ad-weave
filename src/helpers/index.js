export const totalTime = (myArray) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let sum = '';

  if (myArray.length > 0) {
    for (let i in myArray) {
      hours += parseInt(myArray[i].substring(0, 2));
      minutes += parseInt(myArray[i].substring(3, 5));
      seconds += parseInt(myArray[i].substring(6));
    }
  }

  if (seconds > 59) {
    minutes += parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
  }

  if (minutes > 59) {
    hours += parseInt(minutes / 60);
    minutes = parseInt(minutes % 60);
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  sum = hours + ':' + minutes + ':' + seconds;

  return sum;
};
