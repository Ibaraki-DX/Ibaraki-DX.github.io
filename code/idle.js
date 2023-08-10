var idleData ={
	points: 0,
	baseClick:0,
	percentClick:0,
	gen1Power:0,
	highScore:0,
	trueHighScore:0,
	betterClickAmt:0,
	strongGen1:0,
	logPower:0,
	allTimePoints:0,
	basicDiscountAmt:0,
	idleKing:0,
	idleKingBonus:0.0,
	thisAscension:0,
	fastAscension:0,
	numOfAscensions:0,
	firstTimeAll:Date.now(),
	lastTick:Date.now(),
	lastClick:Date.now(),
	coolerPoints:0,
	totalCool:0,
	haltProduction:false,
	haltClicks:false,
	omega:false,
	legacy:0,
	highestPPS:0,
	equipedReference:"none",
	chanceMakerTimer:0,
	lastChanceMakerActivation:0,
	portalCycleWorld:"normal",
	extraSynergy:0,
	starterPack:0,
	comboPack:0,
	kingdomExpansion:0,
	kingdomManagement:0,
	chosenKing:0,
	memory:0,
	hasSold:false,
	inAscension:false
}
var idlePrices = [
[10, 1.5, true, 'baseClick'],
[10, 1.2, true, 'gen1Power'],
[250, 2, true, 'betterClickAmt'],
[250, 2, true, 'strongGen1'],
[50, 10, true, 'percentClick'],
[100, 2, false, 'basicDiscountAmt'],
[1000, 100, false, 'idleKing'],
[10, 10000, false, 'logPower'],
[125, 5, false, 'extraSynergy'],
[5, 2, false, 'starterPack'],
[20, 20, false, 'comboPack'],
[100, 100, false, 'memory'],
[1000, 10**6, false, 'legacy'],
[1000, 7, false, 'kingdomExpansion'],
[7000, 7, false, 'kingdomManagement'],
[10**5, 1000, false, 'chosenKing']
//[base price, price scale, discount, id]
]
var idleImportant = {
	baseBonus:1,
	gen1Bonus:1,
	betterClick:1.25,
	betterGen:1.25,
	synergyBonus:0.01,
	basicDiscount:0.9,
	idleKingCap:0.5,
	version:4,
	sellBack:0.75,
	coolFactor:0.001,
	buyMax:false,
	sell:false
}

function clickPoints(){
	if(idleData.haltClicks) {return}
	if(Date.now()-idleData.lastClick >= 100){
	idleData.points += clickBonus() + idleData.percentClick*idleImportant.synergyBonus*totalPPS()*(idleData.extraSynergy/2+1);
	idleData.allTimePoints +=clickBonus()+idleData.percentClick*idleImportant.synergyBonus*totalPPS()*(idleData.extraSynergy/2+1);	
	idleData.lastClick = Date.now();
	}
	idleData.idleKingBonus = 0;
	visualUpdate();	
}

function totalPPS(){
	var x = gen1PPS()*(1+idleData.idleKingBonus)*(1+idleImportant.coolFactor*idleData.totalCool);
	
	if(idleData.logPower==1&&log(10,idleData.highScore)/2>1){x*=log(10, idleData.highScore)/2} else
	if(idleData.logPower==2&&log(10,idleData.highScore)>1){x*=log(10, idleData.highScore)} else
	if(idleData.logPower==3&&log(5,idleData.highScore)>1){x*=log(5, idleData.highScore)}
	
	if(idleData.equipedReference=="cookie clicker")
		x*=1.07
	
	if(x>idleData.highestPPS) idleData.highestPPS = x;
	return x;
}

//calculates only the points per second of the 1st generator
function gen1PPS(){
	if(document.getElementById("main").style.display == "none"&&document.getElementById("offlineIdle").style.display == "none") return 0;
	var x = idleData.gen1Power*idleImportant.gen1Bonus*idleImportant.betterGen**idleData.strongGen1;
	return x;
}

function update(){
	correctVariables()
	if(idleData.haltClicks&&idleData.haltProduction&&idleData.inAscension){
		document.getElementById('main').style.display = 'none'
		document.getElementById('ascensionSection').style.display = 'block'
	}
	diff = (Date.now() - idleData.lastTick)/1000;
	if(idleData.points<0) idleData.points=0
	if(!idleData.haltProduction){
		x=totalPPS()*diff
		if(x>0){
			idleData.points+=x;
			idleData.allTimePoints+=x;
			if(diff>=10&&document.getElementById("main").style.display != "none"){
				document.getElementById("offlineIdle").style.display = "block";
				document.getElementById("main").style.display = "none";
				document.getElementById("offlineIdle").innerHTML = "<h1>You have been offline for:<br>"+ floor(diff/86400) + " days, "+ floor((diff%86400)/3600) + " hours, "+ floor((diff%3600)/60) + " minutes, " + floor(diff%60) + " seconds<br><br>You got "+ format(x) +" points while you were away</h1><br><button class=\"large long\" onclick=\"openIdle()\">Thanks!</button>"
			}
		}	
	}
	visualUpdate();	
	if(diff>=86400&&!idleTrophies.aDayOff) {achieveCheck("aDayOff","Touching grass");idleTrophies.aDayOff = true;saveAchievements()}
	idleData.lastTick = Date.now();
	
}

function visualUpdate(){
//updates txt outside ascension while its visible
if(document.getElementById('ascensionSection').style.display=='none'){
	//points and highscore display
	if(idleData.points>idleData.highScore){
		idleData.highScore = idleData.points
	}
	if(idleData.highScore>idleData.trueHighScore) {
		idleData.trueHighScore = idleData.highScore
	}
	if(idleData.allTimePoints<idleData.highScore) idleData.allTimePoints = idleData.highScore;
	document.getElementById("pointCounter").innerHTML = format(idleData.points) + " points accumulated";
	document.getElementById("highscoreDisplay").innerHTML = "Your high score is " + format(idleData.highScore) + ". For now!";
	if(idleData.numOfAscensions>0) document.getElementById("trueHighScore").innerHTML = "Your true high score is " + format(idleData.trueHighScore) + "!"
	//points per second display
	if(totalPPS()!=0){
	document.getElementById("ppsCounter").innerHTML = "You are getting " + format(totalPPS()) + " points per second";
	} else document.getElementById("ppsCounter").innerHTML = ''
	//click power display
	document.getElementById("clickPower").innerHTML = "You have " + format(clickBonus() + (idleData.percentClick*idleImportant.synergyBonus*totalPPS())) + " click power"
	
	//halted production
	if(idleData.haltProduction)	document.getElementById("ppsCounter").innerHTML = "Production has been halted!"
	if(idleData.haltClicks) document.getElementById("clickPower").innerHTML = "You aren't getting points per click!"
	
	//shop text
	document.getElementById("moreClick").innerHTML = "More Clicks - lv. " + idleData.baseClick + "<br>" + format(thingPrice('baseClick')) + " points";
	document.getElementById("pointGen1").innerHTML = "Point Generator - lv. " + idleData.gen1Power + "<br>" + format(thingPrice('gen1Power')) + " points";
	document.getElementById("betterClick").innerHTML = "Better Clicks - lv. " + idleData.betterClickAmt + "<br>" + format(thingPrice('betterClickAmt')) + " points";
	document.getElementById("strongGen1").innerHTML = "Stronger Generator - lv. " + idleData.strongGen1 + "<br>" + format(thingPrice('strongGen1')) + " points";
	document.getElementById("percentClick").innerHTML = "Synergy - lv. " + idleData.percentClick + "<br>" + format(thingPrice('percentClick')) + " points";
	document.getElementById("basicDiscount").innerHTML = "Discount - lv. " + idleData.basicDiscountAmt + " (+" + floor(idleData.basicDiscountAmt/(10-idleData.comboPack)) + ")<br>" + format(thingPrice('basicDiscountAmt')) + " points";
	document.getElementById("idleKing").innerHTML = "The Idle King - lv. " + idleData.idleKing + "<br>" + format(thingPrice('idleKing')) + " points";	
	
	//shop button logic
	
	//more click shop
	if(idleData.points>=thingPrice('baseClick')||idleImportant.sell&&idleData.baseClick>0){
		document.getElementById("moreClick").disabled = false;
	} else {document.getElementById("moreClick").disabled = true;}
	//1st generator shop
	if(idleData.points>=thingPrice('gen1Power')||idleImportant.sell&&idleData.gen1Power>0){
		document.getElementById("pointGen1").disabled=false;
	}else{document.getElementById("pointGen1").disabled=true;}
	//better click shop
	if(idleData.points>=thingPrice('betterClickAmt')||idleImportant.sell&&idleData.betterClickAmt>0){
		document.getElementById("betterClick").disabled=false;
	}else{document.getElementById("betterClick").disabled=true;}
	//stronger 1st generator shop
	if(idleData.points>=thingPrice('strongGen1')||idleImportant.sell&&idleData.strongGen1>0){
		document.getElementById("strongGen1").disabled=false;
	}else{document.getElementById("strongGen1").disabled=true;}
	//synergy shop
	if(idleData.points>=thingPrice('percentClick')||idleImportant.sell&&idleData.percentClick>0){
		document.getElementById("percentClick").disabled=false;
	}else{document.getElementById("percentClick").disabled=true;}
	document.getElementById('percentClickTt').innerHTML = 'Increases click power by ' + (idleImportant.synergyBonus*100) + '% of the points per second'
	//discount shop
	if(idleData.points>=thingPrice('basicDiscountAmt')||idleImportant.sell&&idleData.basicDiscountAmt>0){
		document.getElementById("basicDiscount").disabled=false;
	}else{document.getElementById("basicDiscount").disabled=true;}
	//idle king shop
	if(idleData.points>=thingPrice('idleKing')||idleImportant.sell&&idleData.idleKing>0){
		document.getElementById("idleKing").disabled=false;
	}else{document.getElementById("idleKing").disabled=true;}
	document.getElementById('idleKingTt').innerHTML = 'Gives a bonus to production every second after you stop clicking, up to ' + (idleImportant.idleKingCap*100) + '% after '+ format(60*0.9**idleData.kingdomManagement) +'s'
	
	//show the ascension button
	if(idleData.points<10**9){
		document.getElementById("ascensionButton").style.display = "none";
	} else{
		document.getElementById("ascensionButton").style.display = "block";
	}
	document.getElementById('ascensionButton').innerHTML = 'Ascend<br>+'+format(calcPrestige())+' cooler points'
}	

//updates txt on the ascension section
if(document.getElementById('ascensionSection').style.display!='none'){
	
	document.getElementById('ascensionCounter').innerHTML = "You have " + floor(idleData.coolerPoints) + " cooler points<br>Ascension level " + floor(idleData.totalCool) + ' (+'+ format(idleData.totalCool*idleImportant.coolFactor*100) +'%)'
	document.getElementById('logPowerTitle').innerHTML = 'Log power<br>'+format(thingPrice('logPower'))+' cooler points'
	document.getElementById('extraSynergyTitle').innerHTML = 'Extra synergy<br>'+format(thingPrice('extraSynergy'))+' cooler points'
	document.getElementById('starterPackTitle').innerHTML = 'Starter pack<br>' + format(thingPrice('starterPack')) + ' cooler points'
	document.getElementById('comboPackTitle').innerHTML = 'Combo pack<br>' + format(thingPrice('comboPack')) + ' cooler points'
	document.getElementById('memoryTitle').innerHTML = 'Residual memory<br>' + format(thingPrice('memory')) + ' cooler points'
	document.getElementById('legacyTitle').innerHTML = 'Convergent legacy<br>' + format(thingPrice('legacy')) + ' cooler points'
	document.getElementById('kingdomExpansionTitle').innerHTML = 'Kingdom expansion<br>' + format(thingPrice('kingdomExpansion')) + ' cooler points'
	document.getElementById('kingdomManagementTitle').innerHTML = 'Kingdom management<br>' + format(thingPrice('kingdomManagement')) + ' cooler points'
	document.getElementById('chosenKingTitle').innerHTML = 'The chosen one<br>' + format(thingPrice('chosenKing')) + ' cooler points'
	//document.getElementById('Title').innerHTML = '<br>' + format(thingPrice('')) + ' cooler points'
	
}

}

function thingAmount(thing){
	amount = 0
	/*if(thing=='baseClick') {amount = idleData.baseClick} else
	if(thing=='gen1Power') {amount = idleData.gen1Power} else
	if(thing=='betterClickAmt') {amount = idleData.betterClickAmt} else
	if(thing=='strongGen1') {amount = idleData.strongGen1} else
	if(thing=='percentClick') {amount = idleData.percentClick} else
	if(thing=='basicDiscountAmt') {amount = idleData.basicDiscountAmt} else
	if(thing=='idleKing') {amount = idleData.idleKing} else
	if(thing=='logPower') {amount = idleData.logPower} else
	if(thing=='synergyBonus') {amount = idleData.extraSynergy} else
	if(thing=='starterPack') {amount = idleData.starterPack} else 
	if(thing=='comboPack') {amount = idleData.comboPack}*/
	amount = idleData[thing]
	return amount
}

function thingPrice(thing){
	//set everything necessary
	x = 'thing not found'
	/*gBoost = 1
	if(thing=='betterClickAmt') {gBoost = idleImportant.betterClick} else
	if(thing=='strongGen1') {gBoost = idleImportant.betterGen}*/
	
	//find the price
	for(i=0;i<idlePrices.length&&x=='thing not found';i++){
		if(idlePrices[i][3] == thing) x = price(idlePrices[i][0],idlePrices[i][1], thingAmount(thing), idlePrices[i][2]) 
	}	
	return x
}

function buySomething(thing){
	//buy or sell
	if(!idleImportant.sell){	
	idleData.points-=thingPrice(thing);
	idleData[thing]++;
	if(idleImportant.buyMax&&thingPrice(thing)<idleData.points) buySomething(thing)
	} else {
	hasSold = true
	idleData.points+=thingPrice(thing);
	idleData[thing]--;
	if(idleImportant.buyMax&&thingAmount(thing)>0&&idleImportant.sell) buySomething(thing)}
	correctVariables()
	visualUpdate();
}

function price(a, x, n, bdiscount){
	if(idleImportant.sell) n--;
	if(n>=0){		
	var z = round(a*x**n);
	if(bdiscount){
		z*=idleImportant.basicDiscount**(idleData.basicDiscountAmt+floor(idleData.basicDiscountAmt/(10-idleData.comboPack)));
		if(idleData.equipedReference=="cookie clicker")
			z*=0.93
	}
	if(idleImportant.sell) 
		z *= idleImportant.sellBack;
	return round(z);
	} else return 0;
}

/*function priceG(a, x, y, n, bdiscount){
	if(idleImportant.sell) n--;
	if(n>=0){
	var z = round(a*(y*(x/y)**0.95**idleData.lambdaDiscount)**n);
	if(bdiscount)
		z*=idleImportant.basicDiscount**(idleData.basicDiscountAmt+floor(idleData.basicDiscountAmt/10));
	if(idleData.equipedReference=="cookie clicker")
		z*=0.93
	if(idleImportant.sell) 
		z *= idleImportant.sellBack;
	return round(z);
	} else return 0
}*/

function clickBonus(){
	var x = ((idleData.baseClick+1) * idleImportant.baseBonus * idleImportant.betterClick**idleData.betterClickAmt);
	if(idleData.logPower==true)
		x*=log(10,idleData.points)
	return x;
}

var refresh = window.setInterval(function(){update()},100)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("idleSave", JSON.stringify(idleData))
}, 1000)

var savegame = JSON.parse(localStorage.getItem("idleSave"))
/*		if (typeof savegame.points !== undefined) idleData.points = savegame.points;
		if (typeof savegame.baseClick !== undefined) idleData.baseClick = savegame.baseClick;
		if (typeof savegame.percentClick !== undefined) idleData.percentClick = savegame.percentClick;
		if (typeof savegame.gen1Power !== undefined) idleData.gen1Power = savegame.gen1Power;
		if (typeof savegame.highScore !== undefined) idleData.highScore = savegame.highScore;
		if (typeof savegame.trueHighScore !== undefined) idleData.trueHighScore = savegame.trueHighScore;
		if (typeof savegame.betterClickAmt !== undefined) idleData.betterClickAmt = savegame.betterClickAmt;
		if (typeof savegame.strongGen1 !== undefined) idleData.strongGen1 = savegame.strongGen1;
		if (typeof savegame.logPower !== undefined) idleData.logPower = savegame.logPower;
		if (typeof savegame.allTimePoints !== undefined) idleData.allTimePoints = savegame.allTimePoints;
		if (typeof savegame.firstTimeAll !== undefined) idleData.firstTimeAll = savegame.firstTimeAll;
		if (typeof savegame.thisAscension !== undefined) idleData.thisAscension = savegame.thisAscension;
		if (typeof savegame.fastAscension !== undefined) idleData.fastAscension = savegame.fastAscension;
		if (typeof savegame.basicDiscountAmt !== undefined) idleData.basicDiscountAmt = savegame.basicDiscountAmt;
		if (typeof savegame.idleKing !== undefined) idleData.idleKing = savegame.idleKing;
		if (typeof savegame.idleKingBonus !== undefined) idleData.idleKingBonus = savegame.idleKingBonus;
		if (typeof savegame.lastClick !== undefined) idleData.lastClick = savegame.lastClick;
		if (typeof savegame.lastTick !== undefined) idleData.lastTick = savegame.lastTick;
		if (typeof savegame.numOfAscensions !== undefined) idleData.numOfAscensions = savegame.numOfAscensions;
		if (typeof savegame.coolerPoints !== undefined) idleData.coolerPoints = savegame.coolerPoints;
		//if (typeof savegame.totalCool !== undefined) idleData.totalCool = savegame.totalCool;
		if (typeof savegame.haltProduction !== undefined) idleData.haltProduction = savegame.haltProduction;
		if (typeof savegame.haltClicks !== undefined) idleData.haltClicks = savegame.haltClicks;
		if (typeof savegame.omega !== undefined) idleData.omega = savegame.omega;
		if (typeof savegame.legacy !== undefined) idleData.legacy = savegame.legacy;
		if (typeof savegame.highestPPS !== undefined) idleData.highestPPS = savegame.highestPPS;
		if (typeof savegame.equipedReference !== undefined) idleData.equipedReference = savegame.equipedReference
		if (typeof savegame.chanceMakerTimer !== undefined) idleData.chanceMakerTimer = savegame.chanceMakerTimer;
		if (typeof savegame.lastChanceMakerActivation !== undefined) idleData.lastChanceMakerActivation = savegame.lastChanceMakerActivation;
		if (typeof savegame.portalCycleWorld !== undefined) idleData.portalCycleWorld = savegame.portalCycleWorld;
		if (typeof savegame.extraSynergy !== undefined) idleData.extraSynergy = savegame.extraSynergy;
		if (typeof savegame.starterPack !== undefined) idleData.starterPack = savegame.starterPack;
		if (typeof savegame.comboPack !== undefined) idleData.comboPack = savegame.comboPack;
		//if (typeof savegame.x !== undefined) idleData.x = savegame.x;*/
	Object.entries(savegame).forEach(([key, val]) => {idleData[key] = val})



function getStats(){
	if(document.getElementById('main').style.display!='none'){

		//updating idle king bonus here because yes
		if(idleData.idleKingBonus+(idleImportant.idleKingCap*idleData.idleKing)/(60*0.9**idleData.kingdomManagement)<idleImportant.idleKingCap*idleData.idleKing)
			idleData.idleKingBonus += (idleImportant.idleKingCap*idleData.idleKing)/(60*0.9**idleData.kingdomManagement);
		else
			idleData.idleKingBonus=idleImportant.idleKingCap*idleData.idleKing;

		//veery big spaghetti
		diff = (Date.now()-idleData.firstTimeAll)/1000;
		document.getElementById("idleStats").innerHTML = "<p style=\"padding: 5px\">All time points = "+format(idleData.allTimePoints) + "<br>Base click = "+idleData.baseClick+"<br>Base click bonus = "+ idleImportant.baseBonus +"x<br>First generator production = " + idleData.gen1Power + "<br>Generator 1 bonus = " + idleImportant.gen1Bonus + "x<br>Total synergy = " + round(idleData.percentClick*idleImportant.synergyBonus*100)+"% of the points per second<br>Total basic discount = " + (100-idleImportant.basicDiscount**(idleData.basicDiscountAmt+floor(idleData.basicDiscountAmt%10))*100) + "% off<br>Better click bonus = " + round(idleImportant.betterClick**idleData.betterClickAmt) + "x<br>Stronger generator bonus = " + round(idleImportant.betterGen**idleData.strongGen1) + "x<br>Idle king cap: "+ idleImportant.idleKingCap*idleData.idleKing*100 +"%<br> Idle king bonus: "+ format(idleData.idleKingBonus*100) +"%<br>Playing for: " + floor(diff/86400) + " days, "+ floor((diff%86400)/3600) + " hours, "+ floor((diff%3600)/60) + " minutes, " + floor(diff%60) + " seconds</p>";
	}	
}
	//update the stats tab
var statsUpdate = window.setInterval(function(){getStats()},1000)

function openIdle(){
	document.getElementById("main").style.display = "block";
	document.getElementById("offlineIdle").style.display = "none";
}

function buyMaximum(){
	idleImportant.buyMax = !idleImportant.buyMax
	if (idleImportant.buyMax) document.getElementById("buyMaxButton").innerHTML = "Maximum"
	else document.getElementById("buyMaxButton").innerHTML = "One by One"
}

function sellMode(){
	idleImportant.sell = !idleImportant.sell
	if (idleImportant.sell) document.getElementById("sellButton").innerHTML = "Sell"
	else document.getElementById("sellButton").innerHTML = "Buy"
}

function calcPrestige(){
	x = (Math.cbrt(idleData.highScore)*log(10, 10*idleData.highScore))/1000;
	return x
}

function prestige(){

if(sure()){
	document.getElementById('main').style.display = 'none'
	document.getElementById('ascensionSection').style.display = 'block'
	prestiged = Date.now();
	idleData.haltProduction=true;
	idleData.haltClicks=true;
	x = calcPrestige()
	idleData.totalCool += x;
	idleData.coolerPoints += x;
	idleData.points = 0;
	idleData.highScore = 0;
	idleData.baseClick=0;
	idleImportant.baseBonus=1;
	idleData.gen1Power=0;
	idleImportant.gen1Bonus=1;
	idleData.basicDiscountAmt=0;
	idleData.idleKing=0;
	idleData.hasSold=false;
	
	
	idleData.numOfAscensions++;
	if(idleData.thisAscension == 0){
		idleData.fastAscension = prestiged-idleData.firstTimeAll;
	} else if(idleData.fastAscension>prestiged-idleData.thisAscension){
		idleData.fastAscension = prestiged-idleData.thisAscension;
	}	
}

}

function ultraAscension(){
	console.log('got you hehe')
}

function achieveCheck(id,name){
	document.getElementById("achievementsDisplay").innerHTML += "<div id='"+id+"X' style='border-bottom:3px solid var(--detail)' class='long'><button onclick='selfDestruct("+id+"X)'>Achievement unlocked: "+name+"</button><br></div>"
}

var achievementUpdate = window.setInterval(function(){
	if(document.getElementById("main").style.display != "none"){
	
	//idle
	
	if(!idleTrophies.idleHand01&&idleData.points>=reqTrophies.reqIdleHand01) {
		achieveCheck("idleHand01","Just a warm up")
		idleTrophies.idleHand01=true
	} 
	if(!idleTrophies.idleHand02&&idleData.points>=reqTrophies.reqIdleHand02) {
		achieveCheck("idleHand02","Getting somewhere")
		idleTrophies.idleHand02=true
	}
	if(!idleTrophies.idleHand03&&idleData.points>=reqTrophies.reqIdleHand03) {
		achieveCheck("idleHand03","Not enough")
		idleTrophies.idleHand03=true
	}
	if(!idleTrophies.idleProduction01&&totalPPS()>reqTrophies.reqIdleProduction01){
		achieveCheck("idleProduction01","Break time")
		idleTrophies.idleProduction01=true
	}
	if(!idleTrophies.idleProduction02&&totalPPS()>reqTrophies.reqIdleProduction02){
		achieveCheck("idleProduction02","Ready to go")
		idleTrophies.idleProduction02=true
	}
	if(!idleTrophies.idleProduction03&&totalPPS()>reqTrophies.reqIdleProduction03){
		achieveCheck("idleProduction03","Stand by")
		idleTrophies.idleProduction03=true
	}
	if(!idleTrophies.idleClick01&&clickBonus()>=reqTrophies.reqIdleClick01) {
		achieveCheck("idleClick01","Active person")
		idleTrophies.idleClick01=true
	}
	if(!idleTrophies.idleClick02&&clickBonus()>=reqTrophies.reqIdleClick02) {
		achieveCheck("idleClick02","It's also idle, remember?")
		idleTrophies.idleClick02=true
	}
	if(!idleTrophies.idleClick03&&clickBonus()>=reqTrophies.reqIdleClick03) {
		achieveCheck("idleClick03","The clicker")
		idleTrophies.idleClick03=true
	}
	if(!idleTrophies.idleKing01&&idleData.idleKing>=reqTrophies.reqIdleKing01){
		achieveCheck("idleKing01","A new reign")
		idleTrophies.idleKing01=true
	}
	if(!idleTrophies.idleKing02&&idleData.idleKing>=reqTrophies.reqIdleKing02){
		achieveCheck("idleKing02","Blooming kingdom")
		idleTrophies.idleKing02=true
	}
	if(!idleTrophies.idleKing03&&idleData.idleKing>=reqTrophies.reqIdleKing03){
		achieveCheck("idleKing03","Where are we going, King?")
		idleTrophies.idleKing03=true
	}
	if(!idleTrophies.old&&Date.now()-idleData.firstTimeAll>=86400000){
		achieveCheck("old","An old man")
		idleTrophies.old=true
	}
	if(!idleTrophies.generator01&&idleData.gen1Power>=reqTrophies.reqGenerator01){
		achieveCheck("generator01","Production line")
		idleTrophies.generator01=true
	}
	if(!idleTrophies.generator02&&idleData.gen1Power>=reqTrophies.reqGenerator02){
		achieveCheck("generator02","The great factory")
		idleTrophies.generator02=true
	}
	if(!idleTrophies.moreClick01&&idleData.baseClick>=reqTrophies.reqMoreClick01){
		achieveCheck("moreClick01","Click a ton")
		idleTrophies.moreClick01=true
	}
	if(!idleTrophies.moreClick02&&idleData.baseClick>=reqTrophies.reqMoreClick02){
		achieveCheck("moreClick02","Strength in numbers")
		idleTrophies.moreClick02=true
	}
	
	//secret
	
	if(!secretTrophies.singularity&&idleData.points==Infinity)
		achieveCheck('singularity','Singularity')
		idleTrophies.singularity=true
	}
	if(!secretTrophies.insane&&idleData.highScore>=idleData.highestPPS*2419200){
		achieveCheck('insane','Insanity')
		idleTrophies.insane=true
	}
	
	saveAchievements()
},5000)

function companionBox(){
	array = ['hi','youre right','everything is ok','i dont have enough dialogue D:','thats nice','wow, thats pretty cool','im the companion box :)','owo',':D','you chose the wrong dialogue option','you should click that other button','im rapidly not approaching your location']
	document.getElementById('companionBox').innerHTML = array[rng(0, array.length-1)]
}


//ascension stuff

caps = {
	logCap:2,
	logOver:3,
	exSynergy:3,
	starterCap:20,
	starterOver:30,
	comboPackCap:5,
	memoryCap:4,
	memoryOver:8,
	legacyCap:1,
	legacyOver:2,
	kingExpanCap:5,
	kingExpanOver:10,
	kingManageCap:5,
	kingManageOver:10,
	chosenOneCap:1,
	chosenOneOver:2
}

progressBar(idleData.logPower,'logPower')
progressBar(idleData.extraSynergy,'extraSynergy')
progressBar(idleData.starterPack,'starterPack')
progressBar(idleData.comboPack,'comboPack')
progressBar(idleData.memory,'memory')
progressBar(idleData.legacy,'legacy')
progressBar(idleData.kingdomExpansion,'kingdomExpansion')
progressBar(idleData.kingdomManagement,'kingdomManagement')
progressBar(idleData.chosenKing,'chosenKing')
//progressBar(idleData.,'')

function ascensionMsg(id){
	current = document.getElementById(id+'Current')
	upgrade = document.getElementById(id+'Upgrade')
	if(id == 'logPower'){
		if(idleData[id] == 0) {
			current.innerHTML = 'Nothing'
			upgrade.innerHTML = 'Increases production by the log_10 of the square root of your highscore'
		} else
		if(idleData[id] == 1){
			current.innerHTML = 'Increases production by the log_10 of the square root of your highscore'
			upgrade.innerHTML = 'Increases production by the log_10 of your highscore'			
		} else
		if(idleData[id] == 2){
			current.innerHTML = 'Increases production by the log_10 of your highscore'
			if(!idleData.omega) {
			upgrade.innerHTML = 'Maxed'
			} else {
			upgrade.innerHTML = 'Increases production by the log_5 of your highscore'	
			}
		} else
		if(idleData[id] == 3){
			current.innerHTML = 'Increases production by the log_5 of your highscore'
			upgrade.innerHTML = 'Maxed'		
		}		
	} else
	if(id == 'extraSynergy'){
		current.innerHTML = 'Synergy per upgrade: '+(idleImportant.synergyBonus*100)+'%'	
		if(idleData[id] < caps.exSynergy){		
			upgrade.innerHTML = 'Synergy per upgrade: '+(idleImportant.synergyBonus*100+0.5)+'%'	
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'starterPack'){
		current.innerHTML = 'Starts with a little bit of upgrades based on the level this upgrade has'
		if(idleData[id] < caps.starterCap || idleData.omega && idleData[id] <caps.starterOver){
			upgrade.innerHTML = 'Gives more upgrades'	
		} else {
			upgrade.innerHTML = 'Maxed'
		}
		
	} else
	if(id == 'comboPack'){
		current.innerHTML = 'You get 1 extra discount every ' + (10-idleData.comboPack) + ' discounts'
		if(idleData[id] < caps.comboPackCap){
			upgrade.innerHTML = 'You get 1 extra discount every ' + (9-idleData.comboPack) + ' discounts'	
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'memory'){
		current.innerHTML = 'Bonus per ascension level: ' + (idleImportant.coolFactor*100) + '%'
		if(idleData[id] < caps.memoryCap || idleData.omega && idleData[id] < caps.memoryOver){
			upgrade.innerHTML = 'Bonus per ascension level: ' + (idleImportant.coolFactor*100 + 0.05) + '%'
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'legacy'){
		if(idleData[id] == 0) {
			current.innerHTML = 'Nothing'
			upgrade.innerHTML = 'Increases production by 3% for each idle achievement you have, up to 10000% (' + format(1.03**trophyCount('idle')*100) + '% if uncapped)'
		} else
		if(idleData[id] == 1){
			current.innerHTML = 'Increases production by 3% for each idle achievement you have, up to 10000% (' + format(1.03**trophyCount('idle')*100) + '% if uncapped)'
			if(!idleData.omega) {
			upgrade.innerHTML = 'Maxed'
			} else {
			upgrade.innerHTML = 'Increases production by 4% for each non secret achievement you have, up to 1000000% (' + format(1.04**(trophyCount('idle')+trophyCount('news'))*100) + '% if uncapped)'	
			}
		} else
		if(idleData[id] == 2){
			current.innerHTML = 'Increases production by 4% for each non secret achievement you have, up to 1000000% (' + format(1.04**(trophyCount('idle')+trophyCount('news'))*100) + '% if uncapped)'
			upgrade.innerHTML = 'Maxed'		
		}
	} else
	if(id == 'kingdomExpansion'){
		current.innerHTML = 'Idle king cap per upgrade: ' + idleImportant.idleKingCap*100
		if(idleData[id] < caps.kingExpanCap || idleData.omega && idleData[id] < caps.kingExpanOver){
			upgrade.innerHTML = 'Idle king cap per upgrade: ' + (idleImportant.idleKingCap*100+7)
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'kingdomManagement'){
		current.innerHTML = 'Time for idle king to maximize: ' + format(60*0.9**idleData.kingdomManagement) + 's'
		if(idleData[id] < caps.kingManageCap || idleData.omega && idleData[id] < caps.kingManageOver){
			upgrade.innerHTML = 'Maximizes 10% faster (' + format(54*0.9**idleData.kingdomManagement) + 's)'
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'chosenKing'){
		current.innerHTML = 'Idle king scales by ' + idlePrices[6][1]
		if(idleData[id] < caps.chosenOneCap || idleData.omega && idleData[id] < caps.chosenOneOver){
			upgrade.innerHTML = 'Idle king scales by ' + (idlePrices[6][1]/2)
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == ''){} else
	{
		document.getElementById(id).innerHTML = "not ready"
	}
	
	visualUpdate()
}

function buyAscensionUpgrade(name){
	setAscensionLimit(name)	
	
	if(idleData[name]<limit||idleData.omega&&idleData[name]<limitOver){
		x = thingPrice(name)
		if(idleData.coolerPoints>x){
			idleData[name]++
			idleData.coolerPoints-=x
			progressBar(idleData[name],name)	
		}
	}
	ascensionMsg(name)
}

function progressBar(current, name){
	barPercent = document.getElementById(name+'PB2')
	barBg = document.getElementById(name+'PB1')
	setAscensionLimit(name)

		
	barPercent.innerHTML = current+"/"+limit
	if(current<=limit) {
		barPercent.style.width = current/limit*100 + "%"
	} else 
	if(omega&&current<=limitOver) {
		barPercent.style.width = (current-limit)/(limitOver-limit)*100 + "%"
	}
	if(current==limit&&!idleData.omega||current==limitOver) {barPercent.innerHTML = 'MAXED!'}
	if (current>limit) {barPercent.style.background = '#c90';barBg.style.background = 'green'}
	if (current==limit && !idleData.omega || current==limitOver) {barPercent.style.color = 'var(--rainbow)';barPercent.style.background = '#000'}
}

/*function ascendTab(){
	main = document.getElementById('main')
	ascendSec = document.getElementById('ascensionSection')
	if(main.style.display == 'block'){
		main.style.display = 'none'
		ascendSec.style.display = 'block'
	} else {
		main.style.display = 'block'
		ascendSec.style.display = 'none'
	}
}*/

function unprestige(){
	document.getElementById('main').style.display = 'block'
	document.getElementById('ascensionSection').style.display = 'none'
	
	//apply the starter pack
	
	idleData.baseClick = floor(idleData.starterPack*5/idlePrices[0][1]);
	idleData.gen1Power = floor(idleData.starterPack*5/idlePrices[1][1]);
	idleData.betterClickAmt = floor(idleData.starterPack*5/idlePrices[2][1]);
	idleData.strongGen1 = floor(idleData.starterPack*5/idlePrices[3][1]);
	idleData.percentClick = floor(idleData.starterPack*5/idlePrices[4][1]);
	idleData.basicDiscountAmt = floor(idleData.starterPack*5/idlePrices[5][1]);
	idleData.idleKing = floor(idleData.starterPack*5/idlePrices[6][1]);
	
	idleData.hasSold = false;
	
	correctVariables()
	
	idleData.thisAscension = Date.now()
	
	//unfreeze the necessary
	idleData.haltProduction = false;
	idleData.haltClicks = false;
}

function correctVariables(){
	//set the quantity buffs
	
	//click bonus
	if(idleData.baseClick>=10){
		idleImportant.baseBonus= 2**floor(idleData.baseClick/25+1);
	} else idleImportant.baseBonus=1;	

	//generator bonus
	if(idleData.gen1Power>=10){
		idleImportant.gen1Bonus= 2**floor(idleData.gen1Power/25+1);
	} else idleImportant.gen1Bonus=1;	
	
	//king cap per upgrade
	idleImportant.idleKingCap = 0.5 + idleData.kingdomExpansion * 0.07
	
	//synergy per upgrade
	idleImportant.synergyBonus = 0.01 + idleData.extraSynergy * 0.005
	
	//king scaling
	if(idleData.chosenKing >= 2){
		idlePrices[6][1] = 25
	} else
	if(idleData.chosenKing == 1){
		idlePrices[6][1] = 50
	} else {
		idlePrices[6][1] = 100
	}
	
	//cool factor
	idleImportant.coolFactor = 0.001 + idleData.memory * 0.0005
}

function setAscensionLimit(name){
	if(name == 'logPower'){
		limit = caps.logCap
		limitOver = caps.logOver
	} else 
	if(name == 'extraSynergy'){
		limit = caps.exSynergy
		limitOver = limit
	} else
	if(name == 'starterPack'){
		limit = caps.starterCap
		limitOver = caps.starterOver
	} else
	if(name == 'comboPack'){
		limit = caps.comboPackCap
		limitOver = limit
	} else
	if(name == 'memory'){
		limit = caps.memoryCap
		limitOver = caps.memoryOver
	} else 
	if(name == 'legacy'){
		limit = caps.legacyCap
		limitOver = caps.legacyOver
	} else 
	if(name == 'kingdomExpansion'){
		limit = caps.kingExpanCap
		limitOver = caps.kingExpanOver
	} else
	if(name == 'kingdomManagement'){
		limit = caps.kingManageCap
		limitOver = caps.kingManageOver
	} else
	if(name == 'chosenKing'){
		limit = caps.chosenOneCap
		limitOver = caps.chosenOneOver
	}
}

function sure(){
	return confirm('Are you sure?\nPress "OK" to proceed')
}

