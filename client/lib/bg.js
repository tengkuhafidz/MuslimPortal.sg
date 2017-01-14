var totalCount = 17;
var num = Math.ceil( Math.random() * totalCount );
// document.body.background = num + ".jpg";
document.body.style.background = "linear-gradient(rgba(15,109,102, 0.8), rgba(15,109,102, 0.8)), url('/bg/" + num + ".jpg')" ;
document.body.style.backgroundSize = "cover";