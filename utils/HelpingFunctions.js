const HelpingFunctions = {
  getDate(date, format) {
    try {
        let year,month,day;
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
};

export default HelpingFunctions;
