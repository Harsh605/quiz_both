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
