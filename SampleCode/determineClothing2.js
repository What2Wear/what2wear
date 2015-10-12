//inventory male [short sleeves, full sleeved, shirt, pants, jeans, sweatpants, shorts, winter coat, light jacket, sweater, hoodie]
//inventory female = male + [blouse, dress, skirt]

//recieved from mongoDB
var t = 103;//temperature
var r = true;//rain yes-no
var s = false;//snow yes-no
var sun = true;//sunny yes-no
var gender = true; //true = female; false = male; not used no reason too but leaving just in case
var dayOfTheWeek = "tuesday"; //should give day of the week;
var top = ["long-sleeved t-shirt", "dress", "short-sleeved t-shirt", "blouse"];
var thick = ["winter coat", "light jacket", "hoodie", "sweater"];
var bottom = ["pants", "shorts", "skirt", "jeans"];
var dayOfTheWeekRules = [[],["hoodie"],["sweater"],[],["jeans", "light jacket"],[],[]];

//core of program
var numberOfWeek;
var temp;
var upper = "";
var lower = "";
var fat = "";
var extras;
var rulesOfDay;

{//gives number to weekday
	var a = dayOfTheWeek;
	if(a == "sunday") numberOfWeek = 0;
	else if(a == "monday") numberOfWeek = 1;
	else if(a == "tuesday") numberOfWeek = 2;
	else if(a == "wednesday") numberOfWeek = 3;
	else if(a == "thursday") numberOfWeek = 4;
	else if(a == "friday") numberOfWeek = 5;
	else if(a == "saturday") numberOfWeek = 6;
}
{//determines type of clothing the rules are
	for(var i = 0; i < dayOfTheWeekRules[numberOfWeek].length; i++){	
		for(var j = 0; j < bottom.length; j++){
			if(dayOfTheWeekRules[numberOfWeek][i] == bottom[j])
				dayOfTheWeekRules[numberOfWeek][i] += ": bottom";
		}
		for(var j = 0; j < top.length; j++){
			if(dayOfTheWeekRules[numberOfWeek][i] == top[j])
				dayOfTheWeekRules[numberOfWeek][i] += ": top";
		}
		for(var j = 0; j < thick.length; j++){
			if(dayOfTheWeekRules[numberOfWeek][i] == thick[j])
				dayOfTheWeekRules[numberOfWeek][i] += ": thick";
		}
	}
}
{//determines the temperature for which to wear the clothing
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
			bottom[i] += ": hot";
	}
}
{//assigns word representing temperature to var temp
	if(t < 45)
    	temp = "cold";
  	else if(t < 65)
    	temp = "chilly";
  	else if(t < 70)
    	temp = "comf";
  	else if(t < 80)
    	temp = "warm";
  	else temp = "hot";
}
{//decides was assessories to bring
  	var extras = "";
  	if(r) extras += "Bring: umbrella"+"\n";
  	if(s) extras += "Bring: snow boots"+"\n";
  	if(sun) extras += "Bring: sunglasses"+"\n";
}
rulesOfDay = dayOfTheWeekRules[numberOfWeek];
{//core thinking of what to wear
	var u = false;
	var l = false;
	var f = false;
	var rare = "";
	var tempArr = [];
	for(var i = 0; i < rulesOfDay.length; i++) {
		if(rulesOfDay[i].substring(rulesOfDay[i].length-5,rulesOfDay[i].length) == ": top"){
			rare = rulesOfDay[i].substring(0, rulesOfDay[i].length-5);
			upper = rare;
			if(rare == "dress") {
				l = true;
				lower = "";
			}
			u = true;
		}
		else if(rulesOfDay[i].substring(rulesOfDay[i].length-7,rulesOfDay[i].length) == ": thick"){
			fat = rulesOfDay[i].substring(0, rulesOfDay[i].length-7);
			f = true;
		}
		else if(rulesOfDay[i].substring(rulesOfDay[i].length-8, rulesOfDay[i].length) == ": bottom"){
			lower = rulesOfDay[i].substring(0, rulesOfDay[i].length-8);
			l = true;
		}
	}
	if(!u){
		for(var i = 0; i < top.length; i++) {
			if(top[i].indexOf(temp) > -1) tempArr.push(top[i]);
		}
		rare = tempArr[Math.floor(Math.random()*tempArr.length)];
		rare = rare.substring(0, rare.indexOf(":"));
		upper = rare;
		if(upper == "dress") {
			l = true;
			lower = "";
		}
		tempArr = [];
	}
	if(!l){
		for(var i = 0; i < bottom.length; i++) {
			if(bottom[i].indexOf(temp) > -1) tempArr.push(bottom[i]);
		}
		lower = tempArr[Math.floor(Math.random()*tempArr.length)];
		lower = lower.substring(0, lower.indexOf(":"));
		tempArr = [];
	}
	if(!f){
		for(var i = 0; i < thick.length; i++) {
			if(thick[i].indexOf(temp) > -1) tempArr.push(thick[i]);
		}
		fat = tempArr[Math.floor(Math.random()*tempArr.length)];
		fat = fat.substring(0, fat.indexOf(":"));
		tempArr = [];
	}
}
if (lower != "")
	console.log("Wear: "+upper+", "+lower+", "+fat);
else
    console.log("Wear: "+upper+" and "+fat);
console.log(extras);

//male
  /*if(temp == "cold")
    total = "Wear: Jeans, Long Sleeved T-Shirt, and a Winter Coat";
  else if(temp == "chilly")
    total = "Wear: Jeans/Pants, Long Sleeved T-Shirt, and a Light Jacket/Hoodie";
  else if(temp == "comf")
    total = "Wear: Jeans/Pants, Short/Long Sleeved T-Shirt, and a Hoodie/Sweater";
  else if(temp == "warm")
    total = "Wear: Pants/Shorts and Short Sleeved T-Shirt";
  else if(temp == "hot")
    total = "Wear: Shorts and a Short Sleeved T-Shirt";
*/
//female
/*if(temp == "cold")
    total = "Wear: Jeans/Sweatpants, Long Sleeved T-Shirt, and a Winter Coat";
  else if(temp == "chilly")
    total = "Wear: Jeans/Pants/Sweatpants, Long Sleeved T-Shirt, and a Light Jacket/Hoodie";
  else if(temp == "comf")
    total = "Wear: Jeans/Pants, Short/Long Sleeved T-Shirt, and a Hoodie/Sweater";
  else if(temp == "warm")
    total = "Wear: Skirt/Shorts and Short Sleeved T-Shirt/Blouse";
  else if(temp == "hot")
    total = "Wear: (Shorts and a Short Sleeved T-Shirt/Blouse)/Dress";
*/