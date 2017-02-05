// /* Darksky Forecast */
// const request = require('request');
const moment = require('moment-timezone');
//
// const HIJRI_MONTHS = {
//   'Muharram': 1,
//   'Safar': 2,
//   'Rabiulawal': 3,
//   'Rabiulakhir': 4,
//   'Jamadilawal': 5,
//   'Jamadilakhir': 6,
//   'Rejab': 7,
//   'Syaaban': 8,
//   'Ramadhan': 9,
//   'Syawal': 10,
//   'Zulkaedah': 11,
//   'Zulhijjah': 12,
// };
//
// var currDate = moment().date();
// var currMonth = moment().month();
// console.log(`currDate: ${currDate} currMonth: ${currMonth}`)
//
// request({
//   url: `https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json`,
//   json: true
// }, (error, response, body) => {
//
//   if (!error && response.statusCode === 200){
//     //get current month, day, year (hijri)
//     var currHijriMonth = body[0][currDate-1].hijriMonth;
//     var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth-1];
//
//     var hijriDate = body[0][currDate-1].hijriDate;
//     var hijriYear = body[0][currDate-1].hijriYear;
//
//     console.log(`Today is ${hijriDate}, ${hijriMonthName} ${hijriYear}`);
//
//   } else {
//     console.log('Error!');
//   }
// });
//
// get prayertimes-database
// const PRAYER = {
//   'Subuh': 0,
//   'Syuruk': 1,
//   'Zuhur': 2,
//   'Asar': 3,
//   'Maghrib': 4,
//   'Isyak': 5
// }
// request({
//   url: `https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json`,
//   json: true
// }, (error, response, body) => {
//
//   if (!error && response.statusCode === 200){
//     var timeArray = body[currMonth][currDate-1].times;
//
//     for (var i=0; i < 6; i++){
//       var time = moment(timeArray[i]).format('HH:mm');
//       console.log(`${Object.keys(PRAYER)[i]}: ${time}`)
//     }
//
//   } else {
//     console.log('Error!');
//   }
// });
//
// var now = moment().format()
// console.log(now);
// var next = moment().tz("Asia/Brunei").format();
// console.log(next)
//
// moment(timestamp).tz("America/Los_Angeles").format();
//
// var currDate = moment().date();
// console.log('before: ', currDate)
// var currMonth = moment().month();
// console.log('currMonth: ', currMonth) //0
//
// currDate = moment.tz(new Date, "Asia/Brunei").format();
// date = currDate.split('T')
// console.log(date)
// month = date[1][1]
// dateSG = date[2].split('T')[0];
// console.log(month) //1
// console.log(dateSG)
//
// console.log(currDate);
//
// var date = moment(date[0]);
// var dow = date.day();
// console.log(dow);
//
// var singaporeFullTZ = moment.tz(new Date, "Asia/Brunei").format(); //date in Asia/Brunei full TZ format
// var fullDateSG = singaporeFullTZ.split('T')
// console.log(fullDateSG)
// var today = moment(fullDateSG[0]).day(); //return weekdays e.g. Monday, 1 Tuesday, 2 ...
// var dateSG = fullDateSG[0].split('-')[2]; //return JUST the date e.g. 1, 12, 31 ...
// console.log('weekday:', today)
// console.log('date: ', dateSG)
// if (fullDateSG[0].split('-')[1][0] == 0){ //if first integer is 0
//   currMonth = fullDateSG[0].split('-')[1][1]; //get the last integer
// } else {
//   currMonth = fullDateSG[0].split('-')[1]; //01
// }
//
// console.log('currMonth: ', currMonth)

// var dateStart = '2017-02-06'
//
// if (dateStart) {
//
//   fullDateStart = moment(dateStart).format() // 2017-01-31T00:00:00+08:00
//   dayOfWeek = moment(fullDateStart).day() //1 = Monday, 2 =Tuesday etc
//
//   if (dayOfWeek == 1){
//     //dateEnd
//     dateEnd = moment(dateStart).add(6, 'days').endOf('day').format();
//     console.log('dateEnd: ', dateEnd)
//
//   }
//
// }

// nowDate = new Date().toISOString();
// nowDate =  moment().format();
// console.log(nowDate)

// var singaporeFullTZ = moment.tz(new Date, "Asia/Brunei"); //date in Asia/Brunei full TZ format
// console.log(singaporeFullTZ)

// console.log(singaporeFullTZ.add(-1, 'days').startOf('day').unix())
// eventPages = {
//     'NUSMS': 'nusms',
//     'PBUH': 'PBUH.TheLightofLife.1438H',
//     'Islamic Awareness': 'nusms.ias',
//     'Project Link 2017': 'projectlink2017',
//     'Valour 2017': 'valour2017',
//     'Rihlah 1438h': 'rihlah1438H',
//     'NUS Project': 'nusprojectasa',
//     'Freshmen Camp': 'freshmencamp',
//     'Brothers of NUS': 'BrothersOfNUS',
//     'VOK NUS': 'voksnus',
//     // 'noteaminI', //uncomment this when testing
// }
//
// for (var key in eventPages)
//   console.log(key)

// nowDate = new Date().toISOString();
// console.log(moment().format())

