messages = [
  //   {"message":"You Snooze, you lose!", "hashtag":"fajr"},
  //   {"message":"Always know that Allah is by your side", "hashtag":"keepgoing"},
  //   {"message":"Allah's help is just a prayer away","hashtag":"dua"}
  {"message": "When you’re out of ideas, that’s when faith comes in. Let Allah show you the way.", "hashtag":"Wael Abdelgawad"},
  {"message": "Allah has a beautiful plan for every woman and man. Trust Allah and pray and He will light the way.", "hashtag":"Wael Abdelgawad"},
  {"message": "If anyone travels on a road in search of knowledge, God will cause him to travel on one of the roads of Paradise.", "hashtag":"Hadith, Abu Dawood"},
  {"message": "There is reward for kindness to every living thing.", "hashtag":"Hadith, Bukhari & Muslim"},
  {"message": "Be kind, for whenever kindness becomes part of something, it beautifies it. Whenever it is taken from something, it leaves it tarnished.", "hashtag":"Hadith, Bukhari"},
  {"message": "The strong person is not the good wrestler. Rather,the strong person is the one who controls himself when he is angry", "hashtag":"Hadith, Bukhari"},
  {"message": "Be good to others, that will protect you against evil.", "hashtag":"Abu Bakar"},
  {"message": "Do not let your difficulties fill you with anxiety, after all it is only in the darkest nights that stars shine more brightly.", "hashtag":"Hazrat Ali Ibn Abu-Talib A.S"},
  {"message": "The only lasting beauty is the beauty of the heart", "hashtag":"Jalaluddin al-Rumi"},
  {"message": "The best deed of a great man is to forgive and forget.", "hashtag":"Hazrat Ali Ibn Abu-Talib A.S"},
  {"message": "When the world pushes you to your knees, you're in the perfect position to pray", "hashtag":"Hazrat Ali ibn abu-talib a.s"},
  {"message": "The real patience is at the first stroke of a calamity", "hashtag":"Hadith, Bukhari"}

]

var totalCount = 5;
var num = Math.ceil( Math.random() * totalCount );
// document.body.background = num + ".jpg";
document.body.style.background = "linear-gradient(rgba(15,109,102, 0.8), rgba(15,109,102, 0.8)), url('/" + num + ".jpg')" ;
document.body.style.backgroundSize = "cover";
