Future = Npm && Npm.require('fibers/future');

const moment = require('moment-timezone');

Meteor.methods({
  

    getDayDateMonth: function() {
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

    getAllPages: function() {
      eventPages = {
          'NUSMS': 'nusms',
          'PBUH': 'PBUH.TheLightofLife.1438H',
          'IAS': 'nusms.ias',
          'Project Link': 'projectlink2017',
          'Valour': 'valour2017',
          'Rihlah': 'rihlah1438H',
          'Project ASA': 'nusprojectasa',
          'OCIP': 'freshmencamp',
          'BroNUS': 'BrothersOfNUS',
          'VOKS': 'voksnus',
          // 'testing': 'noteaminI', //uncomment this when testing
      }

      return eventPages;
    }
});
