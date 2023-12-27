const HelpingFunctions = {
  getDate(date, format) {
    try {
      let year, month, day;
      if (date == '') {
        const today = new Date();
        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 4);

        year = fourDaysAgo.getFullYear();
        month = String(fourDaysAgo.getMonth() + 1).padStart(2, '0');
        day = String(fourDaysAgo.getDate()).padStart(2, '0');
      } else {
        year = date.getFullYear();
        month = String(date.getMonth() + 1).padStart(2, '0');
        day = String(date.getDate()).padStart(2, '0');
      }

      if (format == 'slash_format') return `${year}/${month}/${day}`;
      else return `${year}-${month}-${day}`;
    } catch (error) {
      console.log('date must be empty string or Date object --> ' + error);
    }
  },

  getTenDaysRange() {
    const today = new Date();

    // Calculate the date 10 days ago
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    // Format the date as "yyyy-MM-dd"
    const tenDaysAgoFormattedDate = tenDaysAgo.toISOString().split('T')[0];
    const todayDate = today.toISOString().split('T')[0];
    return {startDate: tenDaysAgoFormattedDate, endDate: todayDate};
  },

  formatDateTime(inputDate){
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };

    const date = new Date(inputDate);
    return date.toLocaleDateString('en-GB', options);
  },
};

export default HelpingFunctions;
