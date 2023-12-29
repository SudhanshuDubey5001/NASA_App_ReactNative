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

  getPastDate(daysBefore) {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysBefore);
    return pastDate.toISOString().split('T')[0];
  },

  formatDateTime(inputDate) {
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

  convertAllDateTimeToCorrectFormat(inputString) {
    const formattedString = inputString.replace(
      /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z)/g,
      (match, dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${(
          '0' + date.getMinutes()
        ).slice(-2)} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
        return `${formattedDate} ${formattedTime}`;
      },
    );
    return formattedString;
  },

  get_Information_TitleSummaryDateTimeFromMessageBody(inputString) {
    const summaryRegex = /## Summary:([\s\S]*?)(?=\n##|$)/;
    const matchS = inputString.match(summaryRegex);
    const summary = matchS ? matchS[1].trim() : '';

    const titleRegex = /## Message Type:(.*?)(?=\n##|$)/s;
    const matchT = inputString.match(titleRegex);
    const title = matchT ? matchT[1].trim() : '';

    return {title: title, summary: summary};
  },

  get_HTTP_links(inputString) {
    // Regular expression to match HTTP links
    const linkRegex = /https?:\/\/\S+/gi;

    const extractedLinks = [];

    const modifiedString = inputString.replace(linkRegex, match => {
      extractedLinks.push(match); 
      return ''; 
    });
    return {modifiedMessageBody: modifiedString, httpLinks: extractedLinks};
  },
};

export default HelpingFunctions;
