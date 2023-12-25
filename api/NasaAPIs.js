import React, {useState} from 'react';
import Constants from '../utils/Constants';
import HelpingFunctions from '../utils/HelpingFunctions';

// const [startDate, setStartDate] = useState('yyyy-MM-dd');
// const [endDate, setEndDate] = useState('yyyy-MM-dd');
const startDate = 'yyyy-MM-dd';
const endDate = 'yyyy-MM-dd';

const base_URL = 'https://api.nasa.gov/';
const dateString = 'startDate=' + startDate + '&endDate=' + endDate;
const apiKey1 = '&api_key=' + Constants.API_KEY; //with &
const apiKey2 = '?api_key=' + Constants.API_KEY; //with ?

// Space Weather Database Of Notifications, Knowledge, Information (DONKI) -
// CME - Coronal Mass Injection
// GST - Geomagnetic Storm
// FLR - Solar Flare
const DONKI_notification =
  base_URL + 'DONKI/notifications?' + dateString + '&type=all' + apiKey1;
const DONKI_CME = base_URL + 'DONKI/CME?' + dateString + '&api_key=' + apiKey1;
const DONKI_GST = base_URL + 'DONKI/GST?' + dateString + '&api_key=' + apiKey1;
const DONKI_FLR = base_URL + 'DONKI/FLR?' + dateString + '&api_key=' + apiKey1;

const APIs = {
  async getTodayImage(){
    const todaysImage = base_URL + 'planetary/apod?' + apiKey1;
    return fetch(todaysImage)
      .then(response => response.json())
      .then(json => {
        console.log('title: '+json.title);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  },

  async getEarthImage(date) {
    // Daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument
    if (date == '') date = HelpingFunctions.getDate('');
    const EPIC_imageName = base_URL + 'EPIC/api/natural/date/' + date + apiKey2;
    return fetch(EPIC_imageName)
      .then(response => response.json())
      .then(json => {
        let imageName = json[0].image;
        let dateSlashFormat = HelpingFunctions.getDate('', 'slash_format');
        return (
          base_URL +
          'EPIC/archive/natural/' +
          dateSlashFormat +
          '/jpg/' +
          imageName +
          '.jpg' +
          apiKey2
        );
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getMarsRoverPhotos(rover_name) {
    //Mars Rover photos by Curiosity and Opportunity.
    const MARS_ROVER_PICS_API =
      base_URL +
      'mars-photos/api/v1/rovers/' +
      rover_name +
      '/photos?sol=1000' +
      apiKey1;
    return fetch(MARS_ROVER_PICS_API)
      .then(response => response.json())
      .then(json => {
        return json;
        // json.photos.forEach(element => {
        //   console.log('Image -> ' + element.img_src);
        // });
      })
      .catch(error => {
        console.log('Error : ' + error);
      });
  },

  async getNASALibraryImages(query, media_type) {
    const NASA_LIBRARY_SEARCH_API =
      'https://images-api.nasa.gov/search?q=' +
      query +
      '&media_type=' +
      media_type;
    return fetch(NASA_LIBRARY_SEARCH_API)
      .then(response => response.json())
      .then(json => {
        return json.collection.items;
      }).catch(error => {
        console.log(error);
      });
  },

  async getQueryResultImages(api_url){
    return fetch(api_url)
    .then(response => response.json())
    .then(imagesArray => {
      return imagesArray;
    }).catch(error => {
      console.log('Error: '+error);
    })
  }
};

export default APIs;
