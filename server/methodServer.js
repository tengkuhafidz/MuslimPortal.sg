const moment = require('moment-timezone');

Meteor.methods({


    getDayDateMonth() {
      var singaporeFullTZ = moment.tz(new Date, "Asia/Brunei").format(); //date in Asia/Brunei full TZ format
      var fullDateSG = singaporeFullTZ.split('T')

      var today = moment(fullDateSG[0]).day(); //return weekdays e.g. Monday, 1 Tuesday, 2 ...
      var dateSG = fullDateSG[0].split('-')[2]; //return JUST the date e.g. 1, 12, 31 ...

      if (fullDateSG[0].split('-')[1][0] == 0){ //if first integer is 0
        currMonth = fullDateSG[0].split('-')[1][1]; //get ONLY the last integer
      } else {
        currMonth = fullDateSG[0].split('-')[1]; //01
      }
      return {dateSG, today, currMonth}
    },

    getAllPages() {
      eventPages = {
          'NUSMS': 'nusms',
          'IAS': 'nusms.ias',
          'Project ASA': 'nusprojectasa',
          'FOC': 'freshmencamp',
          'BroNUS': 'BrothersOfNUS',
          'VOKS': 'voksnus',
          'Nisaa': 'NisaaofNUS',
          // 'testing': 'noteaminI', //uncomment this when testing
      }

      return eventPages;
    },

    getPermanentAccessToken() {
      tokenOne = 'EAAaYA1tQ4gsBAB0hpTx3fplJVqHCbeWvQs9IbZADFDER9jMaDFSmSTSxD9TBYknjqzNQkfFu08ydhBilbr2q3mczvshtbce309nbZATl6Ru6GqYCxgiZAnk79egqZB0lvjQoiYVo7UncTGdCFgZCJRkRZC44dpZA20ZD';
      tokenTwo = 'EAAaYA1tQ4gsBAHpz3oz1bGYVQ4tk4nWeh5iXreCT09VmU3VKj0Q9851NMkmCSYZB24pZB71WCyTHvOCvSHZBthy5OqEaNfUcBp9vswxZCZCyEkJFlnWgTIcfZAhdlJOfUYK55dmMPvzHya8eLoK01WFRxYI9uav7p5TVnyJ2pMXwZDZD';
      tokenThree = 'EAAaYA1tQ4gsBAPCi7I7dYZCOnZAH4GG5qbfljZCLRHQ2kjPHbOMEpoE7l6Dz5aU79QipPpDZA1aqOBUhyYNydCM22U04A6AiDffWIsdsjyiMpfNx1LaXuKSDJShXpTRPPqXrsxL94FBAwh3HSnVLHNyl8djxvB8axEkTrtSfLwZDZD';
      return [
        tokenOne,
        tokenThree,
        tokenTwo
      ]
    },

    isTokenValid: (access_token) => {
      //dummy call with given access_token
      var url = `https://graph.facebook.com/nusms/events?fields=name,end_time,start_time&access_token=${access_token}`
      //return true/false
      if (HTTP.get(url, {}))
        return true;

      return false;
    }
});
