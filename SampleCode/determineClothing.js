var t = 103;
var r = true;
var s = false;
var sun = true;
function temperature(temp){
	this.temp = temp;
	if(temp < 45)
		return "cold";
	else if(temp < 65)
		return "chilly";
	else if(temp < 70)
		return "comf";
	else if(temp < 80)
		return "warm";
	else return "hot";
}
var comfortState = temperature(t);
function w2w(temp, rain, snow, sunny) {
    this.temp = temp;
    this.rain = rain;
    this.snow = snow;
    this.sunny = sunny;
	var total;
	if(temp == "cold")
		total = "Wear: Jeans, Long Sleeved T-Shirt, and a Winter Coat";
	else if(temp == "chilly")
		total = "Wear: Jeans, Long Sleeved T-Shirt, and a Light/Fall Jacket";
	else if(temp == "comf")
		total = "Wear: Pants, Short Sleeved T-Shirt, and a Hoodie";
	else if(temp == "warm")
		total = "Wear: Pants and Short Sleeved T-Shirt";
	else if(temp == "hot")
		total = "Wear: Shorts and a Short Sleeved T-Shirt";
	if(rain) total += "\n"+"Bring: Umbrella";
	if(snow) total += "\n"+"Bring: Snow Boots";
	if(sunny) total += "\n"+"Bring: Sunglasses";
	return total;
}
write(w2w(comfortState, r, s, sun));