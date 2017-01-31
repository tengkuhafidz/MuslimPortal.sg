Future = Npm && Npm.require('fibers/future');

const moment = require('moment-timezone');

Meteor.methods({
    storeOnUplodcare: function(uuid) {
        check(uuid, String);
        this.unblock();
        var future = new Future();
        HTTP.call(
            'PUT',
            'https://api.uploadcare.com/files/' + uuid + '/storage/', {
                headers: {
                    Accept: 'application/vnd.uploadcare-v0.3+json',
                    Date: new Date().toJSON(),
                    Authorization: 'Uploadcare.Simple ' + Meteor.settings.private.uploadcare.public_key + ':' + Meteor.settings.private.uploadcare.secret_key
                }
            },
            function(err) {
                if (err) {
                    future.return(err, null)
                } else {

                    future.return(null, true)
                }
            }
        );
        return future.wait();
    },

    deleteFromUploadcare: function(uuid) {
        check(uuid, String);
        this.unblock();
        var future = new Future();
        HTTP.call(
            'DELETE',
            'https://api.uploadcare.com/files/' + uuid + '/', {
                headers: {
                    Accept: 'application/vnd.uploadcare-v0.3+json',
                    Date: new Date().toJSON(),
                    Authorization: 'Uploadcare.Simple ' + Meteor.settings.private.uploadcare.public_key + ':' + Meteor.settings.private.uploadcare.secret_key
                }
            },
            function(err) {
                if (err) {
                    future.return(err, null)
                } else {
                    future.return(null, true)
                }
            }
        );
        return future.wait();
    },

    getHijrahDate: function(today, dateSG, day) {
      var tomorrow = today + 1;

      const url = 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json';
      response = HTTP.call('GET', url, {});

      const HIJRI_MONTHS = {
          'Muharram': 1,
          'Safar': 2,
          'Rabiulawal': 3,
          'Rabiulakhir': 4,
          'Jamadilawal': 5,
          'Jamadilakhir': 6,
          'Rejab': 7,
          'Syaaban': 8,
          'Ramadhan': 9,
          'Syawal': 10,
          'Zulkaedah': 11,
          'Zulhijjah': 12
      };

      data = JSON.parse(response.content)

      //get current month, day, year (hijri)
      var currHijriMonth = data[day - 1][dateSG - 1].hijriMonth;
      var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth - 1];

      var hijriDate = data[day - 1][dateSG - 1].hijriDate;
      var hijriYear = data[day - 1][dateSG - 1].hijriYear;


      /* list can be expand */
      const sunnahToFastDate = [13, 14, 15];
      const sunnahToFastDay = [1, 4];

      var tmr = ((sunnahToFastDate.indexOf(hijriDate + 1) !== -1) || (sunnahToFastDay.indexOf(tomorrow) !== -1));
      var today = ((sunnahToFastDate.indexOf(hijriDate) !== -1) || (sunnahToFastDay.indexOf(today) !== -1));

      var fasting = '';

      if (hijriMonthName !== 'Ramadhan') {

        if (tmr)// TOMORROW
          var fasting = 'tomorrow';
        else if (today) //TODAY
          var fasting = 'today';
      }

      var hDate = `${hijriDate} ${hijriMonthName} ${hijriYear}`;

      return {
        hDate,
        fasting
      }

    },

    getPrayerTime: function(currMonth, dateSG) {

      const url = 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json';
      response = HTTP.get(url, {});

      const PRAYER = {
          'Subuh': 0,
          'Syuruk': 1,
          'Zuhur': 2,
          'Asar': 3,
          'Maghrib': 4,
          'Isyak': 5
      }


      data = JSON.parse(response.content)

      var timeArray = data[currMonth - 1][dateSG - 1].times;
      var displayPrayer = [];
      var currTime = moment().tz("Asia/Brunei").format(); //raw time
      var currPrayer;

      for (var i = 0; i < 6; i++) {
        rawTime = moment(timeArray[i]).tz("Asia/Brunei").format();
        formattedTime = moment(timeArray[i]).tz("Asia/Brunei").format('HH:mm');
        if (moment(rawTime).isBefore(currTime))
            currPrayer = i;

        displayPrayer.push(`${Object.keys(PRAYER)[i]}: ${formattedTime}`);
      }

      return {
        displayPrayer,
        currPrayer
      }
    },

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
    }
});
