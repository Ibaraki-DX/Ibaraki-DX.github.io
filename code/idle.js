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
	strongBonus:1.25,
	logPower:false,
	allTimePoints:0,
	synergyBonus:0.0075,
	version:1,
	thisAscension:Date.now(),
	fastAscension:0,
	firstTimeAll:Date.now(),
	lastTick:Date.now()
}

function clickPoints(){
	idleData.points += clickBonus() + idleData.percentClick*idleData.synergyBonus*totalPPS();
	idleData.allTimePoints +=clickBonus()+idleData.percentClick*idleData.synergyBonus*totalPPS();
	visualUpdate();	
}

function totalPPS(){
	var x = gen1PPS();
	if(idleData.logPower==true)
		x*=Math.log10(idleData.points)
	return x;
}

//calculates only the points per second of the 1st generator
function gen1PPS(){
	var x = idleData.gen1Power*idleData.gen1Bonus*Math.pow(idleData.strongBonus,idleData.strongGen1);
	return x;
}

function update(){
	if(totalPPS()>0){
		diff = Date.now() - idleData.lastTick;
		idleData.lastTick = Date.now();
		idleData.points+=totalPPS()*(diff/1000);
		idleData.allTimePoints+=totalPPS()*(diff/1000);
		visualUpdate();	
	}
}
function visualUpdate(){
	//points and highscore display
	if(idleData.allTimePoints<idleData.highestScore) idleData.allTimePoints = idleData.highestScore;
	if(Math.round(idleData.points)>idleData.highestScore){
		idleData.highestScore = Math.round(idleData.points)
	}
	document.getElementById("pointCounter").innerHTML = Math.round(idleData.points) + " points accumulated";
	document.getElementById("highscoreDisplay").innerHTML = "Your highest score is " + idleData.highestScore + ", for now!";
	//points per second display
	if(totalPPS()!=0){
	document.getElementById("ppsCounter").innerHTML = "You are getting " + Math.round(totalPPS()) + " points per second";
	}
	//click power display
	document.getElementById("clickPower").innerHTML = "You have " + Math.round(clickBonus() + (idleData.percentClick*0.0075*totalPPS())) + " click power"
	//base click shop
	if(idleData.points>=price(10, 1.5, idleData.baseClick)){
		document.getElementById("moreClick").disabled = false;
	} else {document.getElementById("moreClick").disabled = true;}
	document.getElementById("moreClick").innerHTML = "More Clicks - lv. " + idleData.baseClick + "<br>" + price(10, 1.5, idleData.baseClick) + " points";
	//1st generator shop
	if(idleData.points>=price(10, 1.2, idleData.gen1Power)){
		document.getElementById("pointGen1").disabled=false;
	}else{document.getElementById("pointGen1").disabled=true;}
	document.getElementById("pointGen1").innerHTML = "Point Generator - lv. " + idleData.gen1Power + "<br>" + price(10, 1.2, idleData.gen1Power) + " points";
	//better click shop
	if(idleData.points>=priceG(250, 2, idleData.strongBonus, idleData.betterClickAmt)){
		document.getElementById("betterClick").disabled=false;
	}else{document.getElementById("betterClick").disabled=true;}
	document.getElementById("betterClick").innerHTML = "Better Clicks - lv. " + idleData.betterClickAmt + "<br>" + price(250, 2, idleData.betterClickAmt) + " points";
	//stronger 1st generator shop
	if(idleData.points>=priceG(250, 2, idleData.strongBonus, idleData.strongGen1)){
		document.getElementById("strongGen1").disabled=false;
	}else{document.getElementById("strongGen1").disabled=true;}
	document.getElementById("strongGen1").innerHTML = "Stronger Generator - lv. " + idleData.strongGen1 + "<br>" + price(250, 2, idleData.strongGen1) + " points";
	//stronger 1st generator shop
	if(idleData.points>=price(100, 10, idleData.percentClick)){
		document.getElementById("percentClick").disabled=false;
	}else{document.getElementById("percentClick").disabled=true;}
	document.getElementById("percentClick").innerHTML = "Synergy - lv. " + idleData.percentClick + "<br>" + price(100, 10, idleData.percentClick) + " points";
	//show the ascension button
	if(idleData.points<1000000000){
		document.getElementById("ascensionButton").style.display = "none";
	} else{
		document.getElementById("ascensionButton").style.display = "block";
	}
}

function buyMoreClick(){
	idleData.points-=price(10, 1.5, idleData.baseClick);
	idleData.baseClick++;
	if(idleData.baseClick==10||idleData.baseClick==25||idleData.baseClick==75||idleData.baseClick%50==0){
		idleData.baseBonus*=2;
	}
	visualUpdate();
}

function buyGen1(){
	idleData.points-=price(10, 1.2, idleData.gen1Power);
	idleData.gen1Power++;
	if(idleData.gen1Power==10||idleData.gen1Power==25||idleData.gen1Power==75||idleData.gen1Power%50==0){
		idleData.gen1Bonus*=2;
	}
	visualUpdate();
}

function buyBetterClick(){
	idleData.points-=priceG(250, 2, idleData.strongBonus, idleData.betterClickAmt);
	idleData.betterClickAmt++;
	visualUpdate();
}

function buyStrongGen1(){
	idleData.points-=priceG(250, 2, idleData.strongBonus, idleData.strongGen1);
	idleData.strongGen1++;
	visualUpdate();
}

function buyPercentClick(){
	idleData.points-=price(100, 10, idleData.percentClick);
	idleData.percentClick++;
	visualUpdate();
}

function price(a, x, n){
	var z = Math.round(a*Math.pow(x,n*Math.pow(0.96,idleData.lambdaDiscount)))		
	return z;
}

function priceG(a, x, y, n){
	var z = Math.round(a*Math.pow(y*Math.pow(x/y, Math.pow(0.96,idleData.lambdaDiscount)),n));
	return z;
}

function clickBonus(){
	var x = ((idleData.baseClick+1) * idleData.baseBonus * Math.pow(1.25,idleData.betterClickAmt));
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
		if (typeof savegame.strongBonus !== "undefined") idleData.strongBonus = savegame.strongBonus;
		if (typeof savegame.allTimePoints !== "undefined") idleData.allTimePoints = savegame.allTimePoints;
		if (typeof savegame.synergyBonus !== "undefined") idleData.synergyBonus = savegame.synergyBonus;
		if (typeof savegame.firstTimeAll !== "undefined") idleData.firstTimeAll = savegame.firstTimeAll;
		if (typeof savegame.thisAscension !== "undefined") idleData.thisAscension = savegame.thisAscension;
		if (typeof savegame.fastAscension !== "undefined") idleData.fastAscension = savegame.fastAscension;
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
	//veery big spaghetti
	document.getElementById("idleStats").innerHTML = "<p style=\"padding: 5px\">All time points = "+idleData.allTimePoints + "<br>Base click = "+idleData.baseClick+"<br>Base click bonus = "+ idleData.baseBonus +"x<br>First generator production = " + idleData.gen1Power + "<br>Generator 1 bonus = " + idleData.gen1Bonus + "x<br>Total synergy = " + idleData.percentClick*idleData.synergyBonus*100+"% of the points per second<br>Better click bonus = " + Math.pow(idleData.strongBonus,idleData.betterClickAmt)*100 + "%<br>Stronger generator bonus = " + Math.pow(idleData.strongBonus,idleData.strongGen1)*100 + "%<br>Playing for: " + Math.floor((Date.now()-idleData.firstTimeAll)/(24*60*60*1000)) + " days, "+ Math.floor(((Date.now()-idleData.firstTimeAll)%(24*60*60*1000))/(60*60*1000)) + " hours, "+ Math.floor((Date.now()-idleData.firstTimeAll)%(60*60*1000)/(60*1000)) + " minutes, " + Math.floor((Date.now()-idleData.firstTimeAll)%(60*1000)/1000) + " seconds</p>";
}
	//update the stats tab
var statsUpdate = window.setInterval(function(){getStats()},1000)