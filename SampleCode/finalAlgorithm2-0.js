//inventory male [short sleeves, long sleeved, shirt, pants, jeans, sweatpants, shorts, winter coat, light jacket, sweater, hoodie]
//inventory female = male + [blouse, dress, skirt]
//ASSUMING #1 @yasha: coldTemperature = user.tempRules.cold;
//tempRules is an array containing 4 integers
//I am assuming the DB is structured such that this will give me the cold teperature which is an int.
//Look at function getTemp to better understand
//Each user upon creating account must provide, where * is optional: name, zip, gender, *phone number, and tempRules
//Organized kinda like this:
/*
user{
  name,
  gender,
  phone,
  tempRules{
    cold,
    chilly,
    comf,
    warm
  }
};
*/

//using gender to determine what clothes are in inventory
genderBasedClothing = function(sex, top, bottom){
  if(sex){
    top.push("dress");
    top.push("blouse");
    bottom.push("skirt");
  }
}
//assigns temp condition in string to temp
var getTemp = function(a, b){
  if(a < b[0])
      return "cold";
    else if(a < b[1])
      return "chilly";
    else if(a < b[2])
      return "comf";
    else if(a < b[3])
      return "warm";
    else return "hot";
}
//determines the temperatures for which to wear each article of clothing
var tempForClothing = function(top, thick, bottom) {
  for(var i = 0; i < top.length; i++) {
      if(top[i] == "long-sleeved t-shirt")
        top[i] += ": cold chilly comf";
      else if(top[i] == "short-sleeved t-shirt")
        top[i] += ": comf warm hot";
      else if(top[i] == "blouse")
        top[i] += ": warm hot";
      else if(top[i] == "dress")
        top[i] += ": hot";
    }
    for(var i = 0; i < thick.length; i++){
      if(thick[i] == "winter coat")
        thick[i] += ": cold";
      else if(thick[i] == "light jacket")
        thick[i] += ": chilly";
      else if(thick[i] == "hoodie")
        thick[i] += ": chilly comf";
      else if(thick[i] == "sweater")
        thick[i] += ": comf";
    }
    for(var i = 0; i < bottom.length; i++){
      if(bottom[i] == "jeans")
        bottom[i] += ": cold chilly comf";
      else if(bottom[i] == "sweatpants")
        bottom[i] += ": cold chilly";
      else if(bottom[i] == "pants")
        bottom[i] += ": chilly comf";
      else if(bottom[i] == "skirt")
        bottom[i] += ": warm";
      else if(bottom[i] == "shorts")
        bottom[i] += ": warm hot";
    }
}
//decides what assessories to bring
var getExtras = function(r, s, sun){
    var extraString = "";
    if(r) extraString += "Bring: umbrella"+"\n";
    if(s) extraString += "Bring: snow boots"+"\n";
    if(sun) extraString += "Bring: sunglasses"+"\n";
    return extraString;
}
//gets next highest temp in case of nothing appropriate at current temperature
var tempNext = function(degree){
  if(degree == "cold")
    return "error";
  if(degree == "chilly")
    return "cold";
  if(degree == "comf")
    return "chilly";
  if(degree == "warm")
    return "hot";
  return "warm";
}
//gets previous temp in order to just wear something
var tempPrior = function(degree){
  if(degree == "cold")
    return "chilly";
  if(degree == "chilly")
    return "comf";
  if(degree == "comf")
    return "warm";
  if(degree == "warm")
    return "hot";
  return "error"; 
}
//find temp that can be used if optimal is not a possibility for upperwear
var notU = function(t, top, tempArr){
  var a = false;
  var b = false;
  for(var i = 0; i < top.length; i++)
    if(top[i].indexOf(t) > -1) tempArr.push(top[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
      notU(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempPrior(t);
      notU(t);
    }
  }
}
//find temp that can be used if optimal is not a possibility for lowerwear
var notL = function(t, bottom, tempArr){
  var a = false;
  var b = false;
  for(var i = 0; i < bottom.length; i++)
    if(bottom[i].indexOf(t) > -1) tempArr.push(bottom[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
      notL(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempPrior(t);
      notL(t);
    }
  }
}
//find temp that can be used if optimal is not a possibility for outerwear
var notF = function(t, thick, tempArr){
  var a = false;
  var b = false;
  for(var i = 0; i < thick.length; i++)
    if(thick[i].indexOf(t) > -1) tempArr.push(thick[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
      notF(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      a = true;
    else{
      t = tempPrior(t);
      notF(t);
    }
  }
}
//actual string at the end
var stri = function(temporary, upper, lower, fat, extras){
  if (lower != "" && fat != "")
    temporary = ("Wear: "+upper+", "+lower+", and "+fat)+"\n";
  else if(lower == "" && fat == "")
    temporary = ("Wear: "+upper)+"\n";
  else if(lower == "")
    temporary = ("Wear: "+upper+" and "+fat)+"\n";
  else temporary = "Wear: "+upper+" and "+lower+"\n";
  temporary += extras;
  return temporary;
}

//core thinking of program
//t is temperature in farenheit
//gender is true for female and false for male
//rain, snow, and sunny are all booleans true for if the condition is true and false otherwise
w2w = function(t, gender, rain, snow, sunny, cold, chilly, comf, warm){
  //assigning of variables
  var d = new Date();
  var numberOfWeek = d.getDay(); //should give day of the week;
  var top = ["short-sleeved t-shirt", "shirt", "long-sleeved t-shirt"];
  var thick = ["winter coat", "light jacket", "hoodie", "sweater"];
  var bottom = ["pants", "shorts", "jeans"];
  var extras;
  var temp;
  var tempRule = [cold, chilly, comf, warm];
  var upper = "";
  var lower = "";
  var fat = "";
  var finalString;
  var u = false;
  var l = false;
  var f = false;
  //method calls
  temp = getTemp(t, tempRule);
  genderBasedClothing(gender, top, bottom);
  tempForClothing(top, thick, bottom);
  extras = getExtras(rain, snow, sunny);
  var rare = "";
  var tempArr = [];
  //no extra layers when hot
  if(temp == "warm" || temp == "hot") f = true;
  notU(temp, top, tempArr);
  rare = tempArr[Math.floor(Math.random()*tempArr.length)];
  rare = rare.substring(0, rare.indexOf(":"));
  upper = rare;
  if(upper == "dress") {
    l = true;
    lower = "";
  }
  tempArr = [];
  if(!l){
    notL(temp, bottom, tempArr);
    lower = tempArr[Math.floor(Math.random()*tempArr.length)];
    lower = lower.substring(0, lower.indexOf(":"));
    tempArr = [];
  }
  if(!f){
    notF(temp, thick, tempArr);
    fat = tempArr[Math.floor(Math.random()*tempArr.length)];
    fat = fat.substring(0, fat.indexOf(":"));
    tempArr = [];
  }
  var temporary = "";
  finalString = stri(temporary, upper, lower, fat, extras);
  console.log(finalString);
}
w2w(10, true, true, false, true, 20, 40, 70, 85);