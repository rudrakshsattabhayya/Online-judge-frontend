function convertDateFormat(inputDate) {
    const dateObj = new Date(inputDate);
    
    const day = dateObj.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear().toString().substr(-2);
  
    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = "th";
    } else {
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          daySuffix = "st";
          break;
        case 2:
          daySuffix = "nd";
          break;
        case 3:
          daySuffix = "rd";
          break;
        default:
          daySuffix = "th";
      }
    }
  
    const formattedDate = `${day}${daySuffix} ${month} ${year}`;
    return formattedDate;
  }

export default convertDateFormat;
  