export function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp));
  
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
  
    return formattedDate;
  }