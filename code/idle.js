var idleData ={
	points: 0.0,
	baseClick:0,
	baseBonus:1.0,
	percentClick:0,
	gen1Power:0,
	gen1Bonus:1.0,
	highestScore:0,
	betterClickAmt:0,
	strongGen1:0,
	lambdaDiscount:0,
	betterClick:1.25,
	betterGen:1.25,
	logPower:false,
	allTimePoints:0,
	synergyBonus:0.01,
	basicDiscount:0.9,
	basicDiscountAmt:0,
	idleKing:0,
	idleKingBonus:0.0,
	idleKingCap:0.5,
	version:2,
	thisAscension:Date.now(),
	fastAscension:0,
	firstTimeAll:Date.now(),
	lastTick:Date.now(),
	lastClick:Date.now()
}
const numType = localStorage.getItem("numType") || "long";

function clickPoints(){
	if(Date.now()-idleData.lastClick >= 100){
	idleData.points += clickBonus() + idleData.percentClick*idleData.synergyBonus*totalPPS();
	idleData.allTimePoints +=clickBonus()+idleData.percentClick*idleData.synergyBonus*totalPPS();	
	idleData.lastClick = Date.now();
	}
	idleData.idleKingBonus = 0;
	visualUpdate();	
}

function totalPPS(){
	var x = gen1PPS()*(1+idleData.idleKingBonus);
	if(idleData.logPower==true)
		x*=Math.log10(idleData.points+1)
	return x;
}

//calculates only the points per second of the 1st generator
function gen1PPS(){
	var x = idleData.gen1Power*idleData.gen1Bonus*idleData.betterGen**idleData.strongGen1;
	return x;
}

function update(){
	if(idleData.points<0) idleData.points=0
	if(totalPPS()>0){
		diff = (Date.now() - idleData.lastTick)/1000;
		idleData.lastTick = Date.now();
		idleData.points+=totalPPS()*diff;
		idleData.allTimePoints+=totalPPS()*diff;
		if(diff>10){
			document.getElementById("offlineIdle").style.display = "block";
			document.getElementById("main").style.display = "none";
			document.getElementById("offlineIdle").innerHTML = "<h1>You have been offline for:<br>"+ + Math.floor(diff/86400) + " days, "+ Math.floor((diff%86400)/3600) + " hours, "+ Math.floor((diff%3600)/60) + " minutes, " + Math.floor(diff%60) + " seconds<br><br>You got "+ format(totalPPS()*diff) +" points while you were away</h1><br><button class=\"large long\" onclick=\"openIdle()\">Thanks!</button>"
		}
		visualUpdate();	
	}
}
function visualUpdate(){
	//points and highscore display
	if(idleData.points>idleData.highestScore){
		idleData.highestScore = idleData.points
	}
	if(idleData.allTimePoints<idleData.highestScore) idleData.allTimePoints = idleData.highestScore;
	document.getElementById("pointCounter").innerHTML = format(idleData.points) + " points accumulated";
	document.getElementById("highscoreDisplay").innerHTML = "Your highest score is " + format(idleData.highestScore) + ". For now!";
	//points per second display
	if(totalPPS()!=0){
	document.getElementById("ppsCounter").innerHTML = "You are getting " + format(totalPPS()) + " points per second";
	}
	//click power display
	document.getElementById("clickPower").innerHTML = "You have " + format(clickBonus() + (idleData.percentClick*idleData.synergyBonus*totalPPS())) + " click power"
	//base click shop
	if(idleData.points>=price(10, 1.5, idleData.baseClick,true)){
		document.getElementById("moreClick").disabled = false;
	} else {document.getElementById("moreClick").disabled = true;}
	document.getElementById("moreClick").innerHTML = "More Clicks - lv. " + idleData.baseClick + "<br>" + format(price(10, 1.5, idleData.baseClick,true)) + " points";
	//1st generator shop
	if(idleData.points>=price(10, 1.2, idleData.gen1Power,true)){
		document.getElementById("pointGen1").disabled=false;
	}else{document.getElementById("pointGen1").disabled=true;}
	document.getElementById("pointGen1").innerHTML = "Point Generator - lv. " + idleData.gen1Power + "<br>" + format(price(10, 1.2, idleData.gen1Power,true)) + " points";
	//better click shop
	if(idleData.points>=priceG(250, 2, idleData.betterClick, idleData.betterClickAmt,true)){
		document.getElementById("betterClick").disabled=false;
	}else{document.getElementById("betterClick").disabled=true;}
	document.getElementById("betterClick").innerHTML = "Better Clicks - lv. " + idleData.betterClickAmt + "<br>" + format(priceG(250, 2, idleData.betterClick, idleData.betterClickAmt,true)) + " points";
	//stronger 1st generator shop
	if(idleData.points>=priceG(250, 2, idleData.betterGen, idleData.strongGen1,true)){
		document.getElementById("strongGen1").disabled=false;
	}else{document.getElementById("strongGen1").disabled=true;}
	document.getElementById("strongGen1").innerHTML = "Stronger Generator - lv. " + idleData.strongGen1 + "<br>" + format(priceG(250, 2, idleData.betterGen, idleData.strongGen1,true)) + " points";
	//synergy shop
	if(idleData.points>=price(100, 10, idleData.percentClick,true)){
		document.getElementById("percentClick").disabled=false;
	}else{document.getElementById("percentClick").disabled=true;}
	document.getElementById("percentClick").innerHTML = "Synergy - lv. " + idleData.percentClick + "<br>" + format(price(100, 10, idleData.percentClick,true)) + " points";
	//discount shop
	if(idleData.points>=price(100, Math.E, idleData.basicDiscountAmt,true)){
		document.getElementById("basicDiscount").disabled=false;
	}else{document.getElementById("basicDiscount").disabled=true;}
	document.getElementById("basicDiscount").innerHTML = "Discount - lv. " + idleData.basicDiscountAmt + "<br>" + format(price(100, Math.E, idleData.basicDiscountAmt,true)) + " points";
	//discount shop
	if(idleData.points>=price(1000, 100, idleData.idleKing,false)){
		document.getElementById("idleKing").disabled=false;
	}else{document.getElementById("idleKing").disabled=true;}
	document.getElementById("idleKing").innerHTML = "The Idle King - lv. " + idleData.idleKing + "<br>" + format(price(1000, 100, idleData.idleKing,false)) + " points";
	//show the ascension button
	if(idleData.points<1000000000){
		document.getElementById("ascensionButton").style.display = "none";
	} else{
		document.getElementById("ascensionButton").style.display = "block";
	}
}

function buyMoreClick(){
	idleData.points-=price(10, 1.5, idleData.baseClick,true);
	idleData.baseClick++;
	if(idleData.baseClick==10||idleData.baseClick==25||idleData.baseClick==75||idleData.baseClick%50==0){
		idleData.baseBonus*=2;
	}
	visualUpdate();
}

function buyGen1(){
	idleData.points-=price(10, 1.2, idleData.gen1Power,true);
	idleData.gen1Power++;
	if(idleData.gen1Power==10||idleData.gen1Power==25||idleData.gen1Power==75||idleData.gen1Power%50==0){
		idleData.gen1Bonus*=2;
	}
	visualUpdate();
}

function buyBetterClick(){
	idleData.points-=priceG(250, 2, idleData.betterClick, idleData.betterClickAmt,true);
	idleData.betterClickAmt++;
	visualUpdate();
}

function buyStrongGen1(){
	idleData.points-=priceG(250, 2, idleData.betterGen, idleData.strongGen1,true);
	idleData.strongGen1++;
	visualUpdate();
}

function buyPercentClick(){
	idleData.points-=price(100, 10, idleData.percentClick,true);
	idleData.percentClick++;
	visualUpdate();
}

function buyBasicDiscount(){
	idleData.points-=price(100, Math.E, idleData.basicDiscountAmt,true);
	idleData.basicDiscountAmt++;
	visualUpdate();
}

function buyIdleKing(){
	idleData.points-=price(1000, 100, idleData.idleKing, false);
	idleData.idleKing++;
	visualUpdate();
}

function price(a, x, n, bdiscount){
	var z = Math.round(a*x**(n*0.95**idleData.lambdaDiscount));
	if(bdiscount)
		z*=idleData.basicDiscount**idleData.basicDiscountAmt;
	z = Math.round(z);
	return z;
}

function priceG(a, x, y, n, bdiscount){
	var z = Math.round(a*(y*(x/y)**0.95**idleData.lambdaDiscount)**n);
	if(bdiscount)
		z*=idleData.basicDiscount**idleData.basicDiscountAmt;
	z = Math.round(z);
	return z;
}

function clickBonus(){
	var x = ((idleData.baseClick+1) * idleData.baseBonus * idleData.betterClick**idleData.betterClickAmt);
	if(idleData.logPower==true)
		x*=Math.log10(idleData.points)
	return x;
}

var refresh = window.setInterval(function(){update()},100)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("idleSave", JSON.stringify(idleData))
}, 1000)

var savegame = JSON.parse(localStorage.getItem("idleSave"))
if (idleData.version==savegame.version){
	if (savegame !== null) {
		idleData = savegame		
		}
}else{
		if (typeof savegame.points !== "undefined") idleData.points = savegame.points;
		if (typeof savegame.baseClick !== "undefined") idleData.baseClick = savegame.baseClick;
		if (typeof savegame.baseBonus !== "undefined") idleData.baseBonus = savegame.baseBonus;
		if (typeof savegame.percentClick !== "undefined") idleData.percentClick = savegame.percentClick;
		if (typeof savegame.gen1Power !== "undefined") idleData.gen1Power = savegame.gen1Power;
		if (typeof savegame.gen1Bonus !== "undefined") idleData.gen1Bonus = savegame.gen1Bonus;
		if (typeof savegame.highestScore !== "undefined") idleData.highestScore = savegame.highestScore;
		if (typeof savegame.betterClickAmt !== "undefined") idleData.betterClickAmt = savegame.betterClickAmt;
		if (typeof savegame.strongGen1 !== "undefined") idleData.strongGen1 = savegame.strongGen1;
		if (typeof savegame.lambdaDiscount !== "undefined") idleData.lambdaDiscount = savegame.lambdaDiscount;
		if (typeof savegame.logPower !== "undefined") idleData.logPower = savegame.logPower;
		if (typeof savegame.allTimePoints !== "undefined") idleData.allTimePoints = savegame.allTimePoints;
		if (typeof savegame.firstTimeAll !== "undefined") idleData.firstTimeAll = savegame.firstTimeAll;
		if (typeof savegame.thisAscension !== "undefined") idleData.thisAscension = savegame.thisAscension;
		if (typeof savegame.fastAscension !== "undefined") idleData.fastAscension = savegame.fastAscension;
		if (typeof savegame.basicDiscountAmt !== "undefined") idleData.basicDiscountAmt = savegame.basicDiscountAmt;
		if (typeof savegame.idleKing !== "undefined") idleData.idleKing = savegame.idleKing;
		//if (typeof savegame.x !== "undefined") idleData.x = savegame.x;
	}
function openIdleTab(event, section){
	var i, tabcontent;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
	}
	document.getElementById(section).style.display = "block";
}

function getStats(){
	//updating idle king bonus here because yes
	if(idleData.idleKingBonus<idleData.idleKingCap*idleData.idleKing)
	idleData.idleKingBonus += (5*idleData.idleKing)/600;
	else
	idleData.idleKingBonus=idleData.idleKingCap*idleData.idleKing;
	//veery big spaghetti
	var diff = (Date.now()-idleData.firstTimeAll)/1000;
	document.getElementById("idleStats").innerHTML = "<p style=\"padding: 5px\">All time points = "+format(idleData.allTimePoints) + "<br>Base click = "+idleData.baseClick+"<br>Base click bonus = "+ idleData.baseBonus +"x<br>First generator production = " + idleData.gen1Power + "<br>Generator 1 bonus = " + idleData.gen1Bonus + "x<br>Total synergy = " + idleData.percentClick*idleData.synergyBonus*100+"% of the points per second<br>Total basic discount = " + (100-idleData.basicDiscount**idleData.basicDiscountAmt*100) + "% off<br>Better click bonus = " + format(idleData.betterClick**idleData.betterClickAmt*100) + "%<br>Stronger generator bonus = " + format(idleData.betterGen**idleData.strongGen1*100) + "%<br>Idle king cap: "+ idleData.idleKingCap*idleData.idleKing*100 +"%<br> Idle king bonus: "+ format(idleData.idleKingBonus*100) +"%<br>Playing for: " + Math.floor(diff/86400) + " days, "+ Math.floor((diff%86400)/3600) + " hours, "+ Math.floor((diff%3600)/60) + " minutes, " + Math.floor(diff%60) + " seconds</p>";
}
	//update the stats tab
var statsUpdate = window.setInterval(function(){getStats()},1000)

function openIdle(){
	document.getElementById("main").style.display = "block";
	document.getElementById("offlineIdle").style.display = "none";
}
function format(number) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number/10**exponent
	if (exponent < 3) return Math.round(number)
	if (numType == "long") return Math.round(number).toLocaleString('en-US')
	if (numType == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (numType == "engineering") return (10**(exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}