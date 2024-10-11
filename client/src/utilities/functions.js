export const formatCampaignName = (name) => {
    return encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
  };

export  const formatDateOverlay = (startDate, endDate) => {
    // Get the current date and time
    const now = new Date();
    // Convert the startDate and endDate to Date objects
    const start = new Date(startDate); // Convert to ISO format
    const end = new Date(endDate);
  
    // Check if the current date is before the start date
    if (now < start) {
      // If so, return the start date with the message "Inicia"
      return `Inicia: ${start.toLocaleDateString()}`;
    } 
    // Check if the current date is after the end date
    else if (now > end) {
      // If so, return the end date with the message "Finalizó"
      return `Finalizó: ${end.toLocaleDateString()}`;
    }
    
    // Otherwise, return the end date with the message "Finaliza"
    return `Finaliza: ${end.toLocaleDateString()}`;
  };
  


  // Function to format a date into the YYYY-MM-DDTHH:MM format
export const formatDate = (date) => {
  // Return an empty string if the date is not provided
  if (!date) return "";

  // Create a new Date object from the input date
  const d = new Date(date);
  
  // Get the individual components of the date and time
  const year = d.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and format as two digits
  const day = String(d.getDate()).padStart(2, "0"); // Get the day of the month and format as two digits
  const hours = String(d.getHours()).padStart(2, "0"); // Get the hours (0-23) and format as two digits
  const minutes = String(d.getMinutes()).padStart(2, "0"); // Get the minutes and format as two digits

  // Return the formatted date string in the required format for datetime-local input: YYYY-MM-DDTHH:MM
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
