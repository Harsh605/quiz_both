export function FormatDateTime(){
    const milliseconds = 1642958701000; // Example timestamp in milliseconds
    const formattedDateTime = convertMillisecondsToDateTime(milliseconds);
    console.log(formattedDateTime);
return formattedDateTime
}

export const convertMillisecondsToDateTime = (milliseconds) => {
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  } 
  export const calculateRemainingTime = (schedule) => {
    const remainingTime = schedule - Date.now();
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };