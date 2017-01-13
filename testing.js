/* Darksky Forecast */
const request = require('request');
const moment = require('moment');

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
  'Zulhijjah': 12,
};

var currDate = moment().date();
var currMonth = moment().month();
// console.log(`currDate: ${currDate} currMonth: ${currMonth}`)

request({
  url: `https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json`,
  json: true
}, (error, response, body) => {

  if (!error && response.statusCode === 200){
    //get current month, day, year (hijri)
    var currHijriMonth = body[0][currDate-1].hijriMonth;
    var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth-1];

    var hijriDate = body[0][currDate-1].hijriDate;
    var hijriYear = body[0][currDate-1].hijriYear;

    console.log(`Today is ${hijriDate}, ${hijriMonthName} ${hijriYear}`);

  } else {
    console.log('Error!');
  }
});
