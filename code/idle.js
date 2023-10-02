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
	omega:0,
	legacy:0,
	highestPPS:1000,
	equipedReference:"none",
	chanceMakerTimer:0,
	extraSynergy:0,
	starterPack:0,
	comboPack:0,
	kingdomExpansion:0,
	kingdomManagement:0,
	chosenKing:0,
	memory:0,
	hasSold:false,
	inAscension:false,
	pointsThisAscension:0,
	referenceCondenser:0,
	clickKing:0,
	symmetry:false,
	darkMatter:0,
	singularity:0,
	lastAscensionPoints:0,
	candy1:0,
	candy2:0,
	candy3:0,
	laiAccel:0,
	clicks:0,
	clicksThisAcension:0
}
var idlePrices = [
[10, 1.5, true, 'baseClick'],
[10, 1.2, true, 'gen1Power'],
[250, 2, true, 'betterClickAmt'],
[250, 2, true, 'strongGen1'],
[50, 10, true, 'percentClick'],
[100, 2, false, 'basicDiscountAmt'],
[1000, 100, false, 'clickKing'],
[1000, 100, false, 'idleKing'],
[10, 2500, false, 'logPower'],
[37, 3, false, 'extraSynergy'],
[5, 2, false, 'starterPack'],
[20, 20, false, 'comboPack'],
[100, 100, false, 'memory'],
[1000, 10**6, false, 'legacy'],
[70, 7, false, 'kingdomExpansion'],
[2700, 7, false, 'kingdomManagement'],
[10**5, 1000, false, 'chosenKing'],
[10000, Infinity, false, 'referenceCondenser'],
[10**6, Infinity, false, 'omega']
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
	clickKingCap:5,
	version:7,
	sellBack:0.75,
	coolFactor:0.001,
	buyAmount:1,
	sell:false,
	chanceMakerEffect:'none',
	chanceMakerActive:false
}

function clickPoints(){
	if(idleData.haltClicks) {return}
	if(!autoClicker) document.getElementById('theButton').blur()
	let x = Date.now()
	let diff = x-idleData.lastClick
	
	if(diff <= 100&&!idleTrophies.perfectSpeed){
		idleTrophies.perfectSpeed = true
		achieveCheck('perfectSpeed','Perfect speed')
		saveAchievements()
	}

	if(idleData.equipedReference == 'candyBox'&&rng(1,100)==100){
		let rngesus = rng(1,100)
		if(rngesus<=60){
			idleData.candy1++
		} else
		if(rngesus<=90){
			idleData.candy2++
		} else
		if(rngesus<=100){
			idleData.candy3++
		}
	}
	
	if(autoClicker && diff >= 100||!autoClicker){
		let y = clickBonus() * clickKingBonus(diff) + synergyTotal()
		idleData.points += y
		idleData.allTimePoints += y
		idleData.pointsThisAscension += y
		idleData.lastClick = x;
	}
	idleData.idleKingBonus /= 10;
	idleData.clicks++
	idleData.clicksThisAcension++
	visualUpdate();	
	
}

function synergyTotal(){
	let x = idleData.percentClick*idleImportant.synergyBonus*totalPPS();
	return x
}

function totalPPS(){
	let x = gen1PPS()*(1+idleData.idleKingBonus)*(1+idleImportant.coolFactor*idleData.totalCool)*logBonus();
	
	if(idleImportant.chanceMakerEffect == 'frenzy'){x*=7}
	if(idleImportant.chanceMakerEffect == 'clot'){x/=6}
	
	if(idleData.equipedReference=='ad'){
		if(log(10,idleData.darkMatter)>1){
			x*=log(10,idleData.darkMatter)
		}
	}

	if(idleData.legacy == 1){
		let legacy = 1.03**trophyCount('idle')
		if(legacy < 100)
			x*=legacy
		else {
			x*=100
			if(!idleTrophies.hitSoftcap){
				achieveCheck('hitSoftcap','Get *softcapped* dummy')
				idleTrophies.hitSoftcap = true
			}
		}
	}
	if(idleData.legacy == 2){
		let legacy = 1.04**(trophyCount('idle')*trophyCount('news'))
		if(legacy < 10000)
			x*=legacy
		else {
			x*=10000
			if(!idleTrophies.hitSoftcap){
				achieveCheck('hitSoftcap','Get *softcapped* dummy')
				idleTrophies.hitSoftcap = true
			}
		}
	}
	
	
	if(idleData.equipedReference=="cookie")
		x*=1.77
	
	if(x>idleData.highestPPS) idleData.highestPPS = x;
	return x;
}

//calculates only the points per second of the 1st generator
function gen1PPS(){
	if(document.getElementById("main").style.display == "none"&&document.getElementById("offlineIdle").style.display == "none") return 0;
	let x = idleData.gen1Power*idleImportant.gen1Bonus*idleImportant.betterGen**idleData.strongGen1;
	return x;
}

function update(){
	correctVariables()
	if(idleData.haltClicks&&idleData.haltProduction&&idleData.inAscension){
		document.getElementById('main').style.display = 'none'
		document.getElementById('ascensionSection').style.display = 'block'
	}
	diff = (Date.now() - idleData.lastTick)/1000*timeMult()
	if(idleData.points<0) idleData.points=0
	if(idleData.equipedReference == 'ad'){
		idleData.darkMatter+=darkMatterTotal()*diff
	}
	if(!idleData.haltProduction){
		let x =totalPPS()*diff
		if(x>0){
			idleData.points+=x;
			idleData.pointsThisAscension+=x;
			idleData.allTimePoints+=x;
			if(diff/timeMult()>=10&&document.getElementById("main").style.display != "none"){
				let tx = document.getElementById('offlineIdle')
				tx.style.display = "block";
				document.getElementById("main").style.display = "none";
				let t = timeConvert(diff*1000)
				let txt = '<h1>You have been offline for:<br>'
				if(t[5]>0)
					txt+= t[5] + " weeks, "
				if(t[4]>0)
					txt+= t[4] + " days, "
				if(t[3]>0)
					txt+= t[3] + " hours, "
				if(t[2]>0)
					txt+= t[2] + " minutes and "
				txt+= t[1] + " seconds<br><br>You got "+ format(x) +" points while you were away</h1><br><button class=\"large long\" onclick=\"openIdle()\">Thanks!</button>"
				tx.innerHTML = txt
			}
		}	
	}
	visualUpdate();	
	if(diff/*/timeMult()*/>=86400&&!idleTrophies.aDayOff) {achieveCheck("aDayOff","Touching grass");idleTrophies.aDayOff = true;saveAchievements()}
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
	document.getElementById("clickPower").innerHTML = "You have " + format(clickBonus()*clickKingBonus(Date.now()-idleData.lastClick) + synergyTotal()) + " click power"
	//halted production
	if(idleData.haltProduction)	document.getElementById("ppsCounter").innerHTML = "Production has been halted!"
	if(idleData.haltClicks) document.getElementById("clickPower").innerHTML = "You aren't getting points per click!"
	
	
	//shop button logic
		if(idleData.clickKing>0&&idleData.idleKing==0) {
			document.getElementById('idleKing').style.display = 'none'
		} else {
			document.getElementById('idleKing').style.display = 'block'
		}
		if(idleData.idleKing>0&&idleData.clickKing==0) {
			document.getElementById('clickKing').style.display = 'none'
		} else {
			document.getElementById('clickKing').style.display = 'block'
		}
	if(idleData.equipedReference!='ad'){
	//shop text
	document.getElementById("moreClick").innerHTML = "More Clicks - lv. " + idleData.baseClick + "<br>" + format(thingPrice('baseClick')) + " points";
	document.getElementById("pointGen1").innerHTML = "Point Generator - lv. " + idleData.gen1Power + "<br>" + format(thingPrice('gen1Power')) + " points";
	document.getElementById("betterClick").innerHTML = "Better Clicks - lv. " + idleData.betterClickAmt + "<br>" + format(thingPrice('betterClickAmt')) + " points";
	document.getElementById("strongGen1").innerHTML = "Stronger Generator - lv. " + idleData.strongGen1 + "<br>" + format(thingPrice('strongGen1')) + " points";
	document.getElementById("percentClick").innerHTML = "Synergy - lv. " + idleData.percentClick + "<br>" + format(thingPrice('percentClick')) + " points";
	document.getElementById("basicDiscount").innerHTML = "Discount - lv. " + idleData.basicDiscountAmt + " (+" + floor(idleData.basicDiscountAmt/(10-idleData.comboPack)) + ")<br>" + format(thingPrice('basicDiscountAmt')) + " points";
	document.getElementById("clickKing").innerHTML = "The Click King - lv. " + idleData.clickKing + "<br>" + format(thingPrice('clickKing')) + " points";	
	document.getElementById("idleKing").innerHTML = "The Idle King - lv. " + idleData.idleKing + "<br>" + format(thingPrice('idleKing')) + " points";	

		//more click shop
		if((idleData.points>=thingPrice('baseClick')||idleImportant.sell&&idleData.baseClick>0)&&thingPrice('baseClick')>0){
			document.getElementById("moreClick").disabled = false;
		} else {document.getElementById("moreClick").disabled = true;}
		//1st generator shop
		if((idleData.points>=thingPrice('gen1Power')||idleImportant.sell&&idleData.gen1Power>0)&&thingPrice('gen1Power')>0){
			document.getElementById("pointGen1").disabled=false;
		}else{document.getElementById("pointGen1").disabled=true;}
		//better click shop
		if((idleData.points>=thingPrice('betterClickAmt')||idleImportant.sell&&idleData.betterClickAmt>0)&&thingPrice('betterClickAmt')>0){
			document.getElementById("betterClick").disabled=false;
		}else{document.getElementById("betterClick").disabled=true;}
		//stronger 1st generator shop
		if((idleData.points>=thingPrice('strongGen1')||idleImportant.sell&&idleData.strongGen1>0)&&thingPrice('strongGen1')>0){
			document.getElementById("strongGen1").disabled=false;
		}else{document.getElementById("strongGen1").disabled=true;}
		//synergy shop
		if((idleData.points>=thingPrice('percentClick')||idleImportant.sell&&idleData.percentClick>0)&&thingPrice('percentClick')>0){
			document.getElementById("percentClick").disabled=false;
		}else{document.getElementById("percentClick").disabled=true;}
		//discount shop
		if((idleData.points>=thingPrice('basicDiscountAmt')||idleImportant.sell&&idleData.basicDiscountAmt>0)&&thingPrice('basicDiscountAmt')>0){
			document.getElementById("basicDiscount").disabled=false;
		}else{document.getElementById("basicDiscount").disabled=true;}
		//idle king shop
		if((idleData.points>=thingPrice('idleKing')||idleImportant.sell&&idleData.idleKing>0)&&thingPrice('idleKing')>0){
			document.getElementById("idleKing").disabled=false;
		}else{document.getElementById("idleKing").disabled=true;}
		//click king shop
		if((idleData.points>=thingPrice('clickKing')||idleImportant.sell&&idleData.clickKing>0)&&thingPrice('clickKing')>0){
			document.getElementById("clickKing").disabled=false;
		}else{document.getElementById("clickKing").disabled=true;}
		document.getElementById('sellButton').style.display = 'block'
		document.getElementById('buyMaxButton').style.display = 'block'
		document.getElementById('intoLaiPlayground').style.display = 'none'

		if(idleImportant.buyAmount==Infinity&&!idleImportant.sell){
			document.getElementById('moreClick').innerHTML = '[Buy '+maxThingDiff('baseClick')+']<br>'+ document.getElementById('moreClick').innerHTML
			document.getElementById('pointGen1').innerHTML = '[Buy '+maxThingDiff('gen1Power')+']<br>'+ document.getElementById('pointGen1').innerHTML
			document.getElementById('betterClick').innerHTML = '[Buy '+maxThingDiff('betterClickAmt')+']<br>'+ document.getElementById('betterClick').innerHTML
			document.getElementById('strongGen1').innerHTML = '[Buy '+maxThingDiff('strongGen1')+']<br>'+ document.getElementById('strongGen1').innerHTML
			document.getElementById('percentClick').innerHTML = '[Buy '+maxThingDiff('percentClick')+']<br>'+ document.getElementById('percentClick').innerHTML
			document.getElementById('basicDiscount').innerHTML = '[Buy '+maxThingDiff('basicDiscountAmt')+']<br>'+ document.getElementById('basicDiscount').innerHTML
			document.getElementById('idleKing').innerHTML = '[Buy '+maxThingDiff('idleKing')+']<br>'+ document.getElementById('idleKing').innerHTML
			document.getElementById('clickKing').innerHTML = '[Buy '+maxThingDiff('clickKing')+']<br>'+ document.getElementById('clickKing').innerHTML
		}
	} else {
	//shop text
	document.getElementById("moreClick").innerHTML = "More Clicks<br>lv. " + fixed(2,idleData.baseClick)
	document.getElementById("pointGen1").innerHTML = "Point Generator<br>lv. " + fixed(2,idleData.gen1Power)
	document.getElementById("betterClick").innerHTML = "Better Clicks<br>lv. " + fixed(2,idleData.betterClickAmt)
	document.getElementById("strongGen1").innerHTML = "Stronger Generator<br>lv. " + fixed(2,idleData.strongGen1)
	document.getElementById("percentClick").innerHTML = "Synergy<br>lv. " + fixed(2,idleData.percentClick)
	document.getElementById("basicDiscount").innerHTML = "Discount<br>lv. 0"
	document.getElementById("clickKing").innerHTML = "The Click King<br>lv. 0"
	document.getElementById("idleKing").innerHTML = "The Idle King<br>lv. 0"
			document.getElementById("moreClick").disabled =true;
			document.getElementById("pointGen1").disabled=true;
			document.getElementById("betterClick").disabled=true;
			document.getElementById("strongGen1").disabled=true;
			document.getElementById("percentClick").disabled=true;
			document.getElementById("basicDiscount").disabled=true;
			document.getElementById("idleKing").disabled=true;
			document.getElementById("clickKing").disabled=true;
		document.getElementById('sellButton').style.display = 'none'
		document.getElementById('buyMaxButton').style.display = 'none'
	document.getElementById('darkMatterCounter').innerHTML = 'You have ' + format(idleData.darkMatter) + ' dark matter'
	document.getElementById('dpsCounter').innerHTML = 'You are getting ' + format(darkMatterTotal()) + ' dark matter per second'
	document.getElementById('singularityCounter').innerHTML = 'You have ' + format(idleData.singularity) + ' singularities'
	document.getElementById('universalSpeedometer').innerHTML = 'Time is running at ' + floor(timeMult()*100) + '% speed'
	document.getElementById('buySingularity').innerHTML = 'Condense space<br>'+ format(price(11,11,idleData.singularity,false)) + ' dark matter'
	document.getElementById('buyAccel').innerHTML = 'Accelerate time<br>'+ format(price(50,4,idleData.laiAccel,false)) + ' dark matter'
		document.getElementById('intoLaiPlayground').style.display = 'block'
	}
	
	document.getElementById('percentClickTt').innerHTML = 'Increases click power by ' + format(idleImportant.synergyBonus*100) + '% of the points per second'
	document.getElementById('clickKingTt').innerHTML = 'Gives a bonus based on how fast you\'re clicking, up to '+ idleImportant.clickKingCap +'x at '+ format(10-0.8*idleData.kingdomManagement) +' clicks per second'
	document.getElementById('idleKingTt').innerHTML = 'Gives a bonus to production every second after you stop clicking, up to ' + format(idleImportant.idleKingCap*100) + '% after '+ format(60*0.87**idleData.kingdomManagement) +'s'

		
	//show the ascension button
	if(idleData.pointsThisAscension<10**9){
		document.getElementById("ascensionButton").style.display = "none";
	} else{
		document.getElementById("ascensionButton").style.display = "block";
	}
	document.getElementById('ascensionButton').innerHTML = 'Ascend<br>+'+format(calcPrestige())+' cooler points'
}	

if(idleData.equipedReference == 'cookie'){
	document.getElementById('chanceMakerButton').style.display = 'block'
} else {
	document.getElementById('chanceMakerButton').style.display = 'none'
}

if(idleData.equipedReference == 'candyBox'){
	document.getElementById('candyBox').style.display = 'grid';
	document.getElementById('candy1').innerHTML = idleData.candy1
	document.getElementById('candy2').innerHTML = idleData.candy2
	document.getElementById('candy3').innerHTML = idleData.candy3
} else {
	document.getElementById('candyBox').style.display = 'none';
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
	document.getElementById('referenceCondenserTitle').innerHTML = 'The reference condenser<br>' + format(thingPrice('referenceCondenser')) + ' cooler points'
	document.getElementById('omegaTitle').innerHTML = 'Omega Overcharge<br>' + format(thingPrice('omega')) + ' cooler points'
	//document.getElementById('Title').innerHTML = '<br>' + format(thingPrice('')) + ' cooler points'
	
}

}

function thingAmount(thing){
	let amount = idleData[thing]
	return amount
}

function thingPrice(thing){
	//set everything necessary
	let x = 'thing not found'
	let amt = thingAmount(thing)
	
	//find the price
	for(i=0;i<idlePrices.length&&x=='thing not found';i++){
		if(idlePrices[i][3] == thing) x = price(idlePrices[i][0],idlePrices[i][1], amt, idlePrices[i][2]) 
	}	
	i--
	let scale = idlePrices[i][1]
	if (idleImportant.sell){scale = 1/scale} 
	if(scale == Infinity && amt>0) return Infinity
	if(scale == Infinity && amt==0) return x
	if(idleImportant.buyAmount >= amt&&idleImportant.sell){
		x = sumPGTerms(x, scale, amt)
	} else
	if(idleImportant.buyAmount != Infinity){
		x = sumPGTerms(x, scale, idleImportant.buyAmount)
	} else {
		let base = idlePrices[i][0]
		if(idlePrices[i][2]){
			base *=basicDiscounting()
		}
		let n = floor(log(scale,idleData.points*(scale-1)/base+scale**amt))
		x = base*(scale**n-scale**amt)/(scale-1)
	}
	return x
}

function maxThingDiff(thing){
	let x = 'thing not found'
	let amt = thingAmount(thing)
	for(i=0;i<idlePrices.length&&x=='thing not found';i++){
		if(idlePrices[i][3] == thing) x = price(idlePrices[i][0],idlePrices[i][1], amt, idlePrices[i][2]) 
	}	
	i--
	let scale = idlePrices[i][1]
	let base = idlePrices[i][0]
	if(idlePrices[i][2]){
		base *=basicDiscounting()
	}
	return floor(log(scale,idleData.points*(scale-1)/base+scale**amt))-amt
}

function thingBought(thing){
	let amt = thingAmount(thing)
	if(idleImportant.buyAmount >= amt&&idleImportant.sell){
		amt = thingAmount(thing)
	} else {
	amt = idleImportant.buyAmount
	}
	return amt
}

function buySomething(thing){
	//buy or sell
	if(!idleImportant.sell){	
		if(idleImportant.buyAmount == Infinity){	
			let amt = thingAmount(thing)
			let x = 'thing not found'
			for(i=0;i<idlePrices.length&&x=='thing not found';i++){
				if(idlePrices[i][3] == thing) x = price(idlePrices[i][0],idlePrices[i][1], amt, idlePrices[i][2]) 
			}	
			i--
			let base = idlePrices[i][0]
			if(idlePrices[i][2]){
				base *=basicDiscounting()
			}
			let scale = idlePrices[i][1]
			idleData[thing] = floor(log(scale,idleData.points*(scale-1)/base+scale**amt))
			idleData.points -= base*(scale**idleData[thing]-scale**amt)/(scale-1)
		} else {
			idleData.points-=thingPrice(thing);
			idleData[thing]+=thingBought(thing);			
		}
	} else 
	if(thingAmount(thing)>0) {
		hasSold = true
		idleData.points+=thingPrice(thing);
		idleData[thing]-=thingBought(thing);
	}
	correctVariables()
	visualUpdate();
}

function price(a, x, n, bdiscount){
	if(idleImportant.sell) n--;
	if(n>=0){		
	let z = round(a*x**n);
	if(bdiscount){
		z*=basicDiscounting();
	}
	if(idleImportant.sell) 
		z *= idleImportant.sellBack;
	return z;
	} else return 0;
}

function basicDiscounting(){
	let discount = idleImportant.basicDiscount**(idleData.basicDiscountAmt+floor(idleData.basicDiscountAmt/(10-idleData.comboPack)))
	if(idleData.equipedReference=="cookie"){
		discount*=0.23
	}
	return discount
}

function clickBonus(){
	let x = ((idleData.baseClick+1) * idleImportant.baseBonus * idleImportant.betterClick**idleData.betterClickAmt) * logBonus()*(1+idleImportant.coolFactor*idleData.totalCool)
	
	if(idleImportant.chanceMakerEffect == 'click frenzy')
		x *= 77
	
	if(idleData.equipedReference=='ad'){
		if(log(10,idleData.darkMatter)>1){
			x*=log(10,idleData.darkMatter)
		}
	}
	
	return x;
}

var refresh = window.setInterval(function(){update()},100)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("idleSave", JSON.stringify(idleData))
}, 1000)

var savegame = JSON.parse(localStorage.getItem("idleSave"))
	Object.entries(savegame).forEach(([key, val]) => {if(idleData[key]!=undefined) {idleData[key] = val}})

function eachSecond(){
	if(document.getElementById('main').style.display!='none'){

		if(idleData.idleKingBonus+idleImportant.idleKingCap*idleData.idleKing/(60*0.87**idleData.kingdomManagement)<idleImportant.idleKingCap*idleData.idleKing)
			idleData.idleKingBonus += idleImportant.idleKingCap*idleData.idleKing/(60*0.87**idleData.kingdomManagement);
		else
			idleData.idleKingBonus=idleImportant.idleKingCap*idleData.idleKing;

		//veery big spaghetti
		diff = timeConvert(Date.now()-idleData.firstTimeAll);
		let statTab = document.getElementById('idleStats')
		let tx = ""
		tx = "<p>All time points = "+format(idleData.allTimePoints) 
		tx+= "<br>Points this ascension = "+format(idleData.pointsThisAscension)
		tx+= '<br>All time clicks: ' + format(idleData.clicks)
		tx+= '<br>Clicks this ascension: ' + format(idleData.clicksThisAcension)
		tx+= "<br>Base click = "+idleData.baseClick
		if(idleImportant.baseBonus>1)
			tx+= "<br>Base click bonus = "+ idleImportant.baseBonus+"x"
		tx+= "<br>First generator production = " + idleData.gen1Power 
		if(idleImportant.gen1Bonus)
			tx+= "<br>Generator 1 bonus = " + idleImportant.gen1Bonus + "x"
		if(idleData.percentClick>0)
			tx+= "<br>Total synergy = " + round(idleData.percentClick*idleImportant.synergyBonus*100)+"% of the points per second"
		tx+= "<br>Price multiplier = " + basicDiscounting() +"x"
		if(idleData.betterClickAmt>0)
			tx+= "<br>Better click bonus = " + round(idleImportant.betterClick**idleData.betterClickAmt) + "x"
		if(idleData.strongGen1>0)
			tx+= "<br>Stronger generator bonus = " + round(idleImportant.betterGen**idleData.strongGen1) + "x"
		if(idleData.idleKing>0){
			tx+= "<br>Idle king cap: "+ format(idleImportant.idleKingCap*idleData.idleKing*100) +"%"
			tx+= "<br>Idle king bonus: "+ format(idleData.idleKingBonus*100) +"%"
		}
		if(idleData.clickKing>0){
			tx+= '<br>Click king max bonus: ' + format(clickKingBonus(0))
		}
		if(timeMult()>1){
			tx+= '<br>Time multiplier: ' + floor(timeMult()*100) + 'x'
		}
		tx+= "<br>Playing for: " 
		if(diff[5]>0)
			tx+= diff[5] + " weeks, "
		if(diff[4]>0)
			tx+= diff[4] + " days, "
		if(diff[3]>0)
			tx+= diff[3] + " hours, "
		if(diff[2]>0)
			tx+= diff[2] + " minutes and "
		tx+= diff[1] + " seconds"
		statTab.innerHTML = tx
	}	
	idleData.chanceMakerTimer++
	if(rng(1,100)<=7&&idleData.chanceMakerTimer >= 77&&idleData.equipedReference=='cookie'&&!idleImportant.chanceMakerActive){
		idleImportant.chanceMakerActive = true
		if(rng(1,2)==1){
			document.getElementById('chanceMakerButton').innerHTML = 'Chancemaker<br>Force the hand of fate'			
		} else {
			document.getElementById('chanceMakerButton').innerHTML = 'Chancemaker<br>I\'m feeling lucky'
		}
	}
}
var secondUpdate = window.setInterval(function(){eachSecond()},1000)

function openIdle(){
	document.getElementById("main").style.display = "block";
	document.getElementById("offlineIdle").style.display = "none";
}

function buyAmount(){
	let x = idleImportant.buyAmount
	if(x==1){idleImportant.buyAmount = 5} else
	if(x==5){idleImportant.buyAmount = 10} else
	if(x==10){idleImportant.buyAmount = 25} else
	if(x==25){idleImportant.buyAmount = 100} else
	if(x==100){idleImportant.buyAmount = Infinity} else
	if(x==Infinity){idleImportant.buyAmount = 1}
	
	if (idleImportant.buyAmount == Infinity) document.getElementById("buyMaxButton").innerHTML = "Maximum"
	else document.getElementById("buyMaxButton").innerHTML = idleImportant.buyAmount + " by " + idleImportant.buyAmount
}

function sellMode(){
	idleImportant.sell = !idleImportant.sell
	if (idleImportant.sell) document.getElementById("sellButton").innerHTML = "Sell"
	else document.getElementById("sellButton").innerHTML = "Buy"
}

function calcPrestige(){
	let x = (Math.cbrt(idleData.pointsThisAscension)*log(10, 10*idleData.pointsThisAscension))/1000;
	return x
}

function prestige(){

if(sure()){
	document.getElementById('main').style.display = 'none'
	document.getElementById('ascensionSection').style.display = 'block'
	prestiged = Date.now();
	idleData.inAscension = true
	idleData.haltProduction=true;
	idleData.haltClicks=true;
	let x = calcPrestige()
	idleData.totalCool += x;
	idleData.coolerPoints += x;
	idleData.lastAscensionPoints = idleData.points
	idleData.points = 0;
	idleData.pointsThisAscension = 0;
	idleData.clicksThisAcension = 0
	idleData.highScore = 0;
	idleData.baseClick=0;
	idleImportant.baseBonus=1;
	idleData.gen1Power=0;
	idleImportant.gen1Bonus=1;
	idleData.basicDiscountAmt=0;
	idleData.idleKing=0;
	idleData.clickKing=0;
	idleData.hasSold=false;
	idleImportant.buyAmount = 1;
	idleImportant.sell = false;
	idleData.highestPPS = 1000
	document.getElementById('chanceMakerButton').innerHTML = 'Chancemaker'
	document.getElementById('buyMaxButton').innerHTML = "1 by 1"
	
	
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
	if(!idleTrophies.old&&Date.now()-idleData.firstTimeAll>=1209600000){
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
	if(!idleTrophies.expand&&idleData.kingdomExpansion>0){
		achieveCheck("expand","Expand, expand, expand")
		idleTrophies.expand=true
	}
	if(!idleTrophies.biggering&&idleData.chosenKing>0){
		achieveCheck("biggering","Biggering")
		idleTrophies.biggering=true
	}
	if(!idleTrophies.neverForget&&idleData.memory>0){
		achieveCheck("neverForget","Never forget")
		idleTrophies.neverForget=true
	}
	if(!idleTrophies.omegacap&&idleData.omega==1){
		achieveCheck("omegacap","Goodbye softcaps, hello softcaps")
		idleTrophies.omegacap=true
	}
	if(!idleTrophies.pierceTheSkies&&idleData.legacy==2){
		achieveCheck("pierceTheSkies","Pierce the skies")
		idleTrophies.pierceTheSkies=true
	}
	if(!idleTrophies.beyond&&idleData.numOfAscensions>0){
		achieveCheck("beyond","Beyond")
		idleTrophies.beyond=true
	}
	/*if(!idleTrophies.&&idleData.){
		achieveCheck("","")
		idleTrophies.=true
	}*/
	
	//secret
	
	if(!secretTrophies.singularity&&idleData.points==Infinity)
		achieveCheck('singularity','Singularity')
		secretTrophies.singularity=true
	}
	if(!secretTrophies.insane&&idleData.highScore>=(idleData.highestPPS+1)*2419200){
		achieveCheck('insane','Insanity')
		secretTrophies.insane=true
	}
	
	saveAchievements()
},5000)

function companionBox(){
	array = ['hi','youre right','everything is ok','i dont have enough dialogue D:','thats nice','wow, thats pretty cool','im the companion box :)','owo',':D','you chose the wrong dialogue option','you should click that other button','im rapidly not approaching your location']
	document.getElementById('companionBox').innerHTML = array[rng(0, array.length-1)]
}


//ascension stuff

caps = {
	logCap:3,
	logOver:5,
	exSynergy:9,
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
progressBar(idleData.referenceCondenser,'referenceCondenser')
progressBar(idleData.omega,'omega')
//progressBar(idleData.,'')

function ascensionMsg(id){
	let current = document.getElementById(id+'Current')
	let upgrade = document.getElementById(id+'Upgrade')
	if(id == 'logPower'){
	let txt = ', x being all points produced this ascension'
		if(idleData[id] == 0) {
			current.innerHTML = 'Nothing'
			upgrade.innerHTML = 'Increases production by log_10 x of the square root' + txt
		} else
		if(idleData[id] == 1){
			current.innerHTML = 'Increases production by log_10 x of the square root' + txt
			upgrade.innerHTML = 'Increases production by log_5 x' + txt			
		} else
		if(idleData[id] == 2){
			current.innerHTML = 'Increases production by log_5 x' + txt
			upgrade.innerHTML = 'Increases production by log_2 x' + txt	
		} else
		if(idleData[id] == 3){
			current.innerHTML = 'Increases production by log_2 x' + txt
			if(!idleData.omega) {
				upgrade.innerHTML = 'Maxed'
			} else {
				upgrade.innerHTML = 'Increases production by (ln x)^2/2' + txt		
			}
		} else
		if(idleData[id] == 4){
			current.innerHTML = 'Increases production by (ln x)^2/2' + txt
			upgrade.innerHTML = 'Increases production by (ln x)^ln(ln x)/3' + txt	
		} else
		if(idleData[id] == 5){
			current.innerHTML = 'Increases production by ln(x)^ln(ln x)/3' + txt
			upgrade.innerHTML = 'Maxed'	
		}
	} else
	if(id == 'extraSynergy'){
		current.innerHTML = 'Synergy per upgrade: '+(idleImportant.synergyBonus*100)+'%'	
		if(idleData[id] < caps.exSynergy){		
			upgrade.innerHTML = 'Synergy per upgrade: '+(idleImportant.synergyBonus*100+1)+'%'	
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
		current.innerHTML = 'Idle king cap per upgrade: ' + format(idleImportant.idleKingCap*100) + '<br>Click king cap per upgrade: ' + idleImportant.clickKingCap
		if(idleData[id] < caps.kingExpanCap || idleData.omega && idleData[id] < caps.kingExpanOver){
			upgrade.innerHTML = 'Idle king cap per upgrade: ' + format(idleImportant.idleKingCap*100+7) + '<br>Click king cap per upgrade: ' + 4*(floor(1.05**(idleData.kingdomExpansion+1)*100)/100)
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'kingdomManagement'){
		current.innerHTML = 'Idle king maximizes in: ' + format(60*0.87**idleData.kingdomManagement) + 's<br>Click king maximizes at: ' + fixed(1,10-0.8*idleData.kingdomManagement) + ' clicks per second'
		if(idleData[id] < caps.kingManageCap || idleData.omega && idleData[id] < caps.kingManageOver){
			upgrade.innerHTML = 'Idle king maximizes in: ' + format(54*0.87**idleData.kingdomManagement) + 's<br>Click king maximizes at: ' + fixed(1,9.2-0.8*idleData.kingdomManagement) + ' clicks per second'
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'chosenKing'){
		current.innerHTML = 'Kings scales by ' + idlePrices[6][1]
		if(idleData[id] < caps.chosenOneCap || idleData.omega && idleData[id] < caps.chosenOneOver){
			upgrade.innerHTML = 'Kings scales by ' + (idlePrices[6][1]/2)
		} else {
			upgrade.innerHTML = 'Maxed'
		}
	} else
	if(id == 'referenceCondenser'){
		if(idleData[id]==false){
			current.innerHTML = 'Nothing'
			upgrade.innerHTML = 'Turns some games on the news into helpful things'
		} else {
			current.innerHTML = 'Choose a bonus: <br><select id="selectCondensed"><option value="none">None</option></select>'
			let condensed = document.getElementById('selectCondensed')
			if(newsTrophies.chanceMaker){condensed.innerHTML += '<option value="cookie">Chancemaker</option>'}
			if(newsTrophies.antimatter){condensed.innerHTML += '<option value="ad">Lai oversimplification</option>'}
			if(newsTrophies.candyBox){condensed.innerHTML += '<option value="candyBox">Candy box</option>'}
			//if(newsTrophies.){condensed.innerHTML += '<option value=""></option>'}
			
			document.getElementById('selectCondensed').value = idleData.equipedReference
			
			if(idleData.equipedReference == 'none'){upgrade.innerHTML = 'Waits for you to equip something'}
			if(idleData.equipedReference == 'cookie'){upgrade.innerHTML = '77% discount and boost to production, can be activated to do random things'}
			if(idleData.equipedReference == 'ad'){upgrade.innerHTML = 'You can\'t buy upgrades, generates dark matter'}
			if(idleData.equipedReference == 'candyBox'){upgrade.innerHTML = 'Clicking sometimes rewards you with candies that can skip time'}
			//if(idleData.equipedReference == ''){upgrade.innerHTML = ''}
				
		document.getElementById('selectCondensed').addEventListener("change", function(e) {idleData.equipedReference = e.currentTarget.value; ascensionMsg('referenceCondenser')})
		}
	} else
	if(id == 'omega'){
		if(idleData[id]==false){
			current.innerHTML = 'Nothing'
			upgrade.innerHTML = 'Lets some ascension upgrades be upgraded even more'
		} else {
			current.innerHTML = 'Lets some ascension upgrades be upgraded even more'
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

	if(!secretTrophies.surrenderToCaps&&name=='omega'&&idleData.omega==1)
		achieveCheck('surrenderToCaps','Surrender to the softcaps now')
		secretTrophies.surrenderToCaps=true
		
	if(idleData[name]<limit||idleData.omega&&idleData[name]<limitOver){
		let x = thingPrice(name)
		if(idleData.coolerPoints>=x){
			idleData[name]++
			idleData.coolerPoints-=x
			progressBar(idleData[name],name)	
			ascensionMsg(name)
		}
		if(!idleTrophies.limitBreak&&limit>=idleData[name]){
			achieveCheck('limitBreak','Limit break')
			idleTrophies.limitBreak=true
		}
		if(!idleTrophies.noBounds&&limitOver==idleData[name]&&limit!=limitOver){
			achieveCheck('noBounds','No bounds')
			idleTrophies.noBounds=true
		}
	}
	ascensionMsg(name)
}

function progressBar(current, name){
	barPercent = document.getElementById(name+'PB2')
	barBg = document.getElementById(name+'PB1')
	setAscensionLimit(name)

	if(typeof current==="boolean")
		current=0;
	barPercent.innerHTML = current+"/"+limit
	if(current<=limit) {
		barPercent.style.width = current/limit*100 + "%"
	} else 
	if(idleData.omega&&current<=limitOver) {
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
	
	starterValue()
	
	idleData.hasSold = false;
	idleData.inAscension = false;
	
	idleData.chanceMakerTimer = 0;
	idleData.darkMatter = 0
	idleData.laiAccel = 0
	idleData.candy1 = 0
	idleData.candy2 = 0
	idleData.candy3 = 0
	
	correctVariables()
	
	idleData.thisAscension = Date.now()
	
	//unfreeze the necessary
	idleData.haltProduction = false;
	idleData.haltClicks = false;
}

function correctVariables(){
	//ad reference
	if(idleData.equipedReference == 'ad'){
		laiAmount()
	}
	
	
	//set the quantity buffs
	
	//click bonus
	if(idleData.baseClick>=10){
		idleImportant.baseBonus= (2*(idleData.symmetry+1))**floor(idleData.baseClick/25+1);
	} else idleImportant.baseBonus=1;	

	//generator bonus
	if(idleData.gen1Power>=10){
		idleImportant.gen1Bonus= 2**floor(idleData.gen1Power/25+1);
	} else idleImportant.gen1Bonus=1;	
	
	//king cap per upgrade
	idleImportant.idleKingCap = 0.5 + idleData.kingdomExpansion * 0.07
	idleImportant.clickKingCap = 4*(floor(1.05**idleData.kingdomExpansion*100)/100)
	
	//synergy per upgrade
	idleImportant.synergyBonus = (idleData.extraSynergy+1) * 0.01
	
	//king scaling
	if(idleData.chosenKing >= 2){
		idlePrices[6][1] = 25
		idlePrices[7][1] = 25
	} else
	if(idleData.chosenKing == 1){
		idlePrices[6][1] = 50
		idlePrices[7][1] = 50
	} else {
		idlePrices[6][1] = 100
		idlePrices[7][1] = 100
	}
	
	//cool factor
	idleImportant.coolFactor = 0.001 + idleData.memory * 0.0005
	
	//cookie effect removal
	
	if(idleImportant.chanceMakerEffect == 'clot'&&idleData.chanceMakerTimer>66||idleImportant.chanceMakerEffect == 'frenzy'&&idleData.chanceMakerTimer>77||idleImportant.chanceMakerEffect == 'click frenzy'&&idleData.chanceMakerTimer>27){
		idleImportant.chanceMakerEffect = 'none'
		document.getElementById('chanceMakerButton').innerHTML = 'Chancemaker'
	}
	
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
	if(name == 'referenceCondenser'){
		limit = 1
		limitOver = 1
	}
	if(name == 'omega'){
		limit = 1
		limitOver = 1
	}
}

function chanceMaker(){
	if(idleImportant.chanceMakerActive){
		let chanceButton = document.getElementById('chanceMakerButton')
		idleImportant.chanceMakerActive = false
		idleData.chanceMakerTimer = 0
		chanceButton.innerHTML = 'Chancemaker<br>'
		
		let x = rng(1,6)
		
		if(x == 1){
			idleImportant.chanceMakerEffect = 'ruin'
			let a = totalPPS()*36
			idleData.points-=a
			chanceButton.innerHTML += 'Ruin!<br>You have lost ' + format(a) + ' points'			
		} else
		if(x == 2){
			idleImportant.chanceMakerEffect = 'clot'
			chanceButton.innerHTML += 'Clot!<br>Production /6 for 66 seconds'			
		} else
		if(x == 3){
			idleImportant.chanceMakerEffect = 'blab'
			let a = ['Screen crunchiness increased by 50%','+1 click closer of the next update','Code has been executed','Cooler points are 10% cooler','Points are 15% more shiny','Frenzy!<br>Production x1 for 77 seconds','Lucky!<br>Someone else won &infin; points','7777777','And nothing happened','Thanks for clicking!','They know','Huh... Try again later','Well that didn\'t work']			
			chanceButton.innerHTML += a[rng(0, a.length-1)]
		} else
		if(x == 4){
			idleImportant.chanceMakerEffect = 'lucky'
			let a = totalPPS()*240+rng(7,14)
			idleData.points+=a
			chanceButton.innerHTML += 'Lucky!<br>You have won ' + format(a) + ' points'			
		} else
		if(x == 5){
			idleImportant.chanceMakerEffect = 'frenzy'
			chanceButton.innerHTML += 'Frenzy!<br>Production x7 for 77 seconds'			
		} else
		if(x == 6){
			idleImportant.chanceMakerEffect = 'click frenzy'
			chanceButton.innerHTML += 'Click frenzy!<br>Base click x77 for 27 seconds'			
		}
	}
}

function logBonus(){
	let x = 1
	if(idleData.logPower==1){
		x*=log(10, idleData.pointsThisAscension)/2
	} else
	if(idleData.logPower==2){
		x*=log(5, idleData.pointsThisAscension)
	} else
	if(idleData.logPower==3){
		x*=log(2, idleData.pointsThisAscension)
	} else
	if(idleData.logPower==4){
		x*=log('e', idleData.pointsThisAscension)**2
	} else
	if(idleData.logPower==5){
		x*=log('e', idleData.pointsThisAscension)**log('e',log('e',idleData.pointsThisAscension))
	}
	if(!isFinite(x)||x<1) return 1
	return x
}

function clickKingBonus(speed){
	let x = idleImportant.clickKingCap*idleData.clickKing
	let y = 1000/speed*x/(10-0.8*idleData.kingdomManagement)
	
	if(1 > y||x == 0) return 1
	if(x < y) return x
	return y
}

function starterValue(){
	let x = idleData.starterPack*5
	idleData.baseClick = floor(x/idlePrices[0][1]);
	idleData.gen1Power = floor(x/idlePrices[1][1]);
	idleData.betterClickAmt = floor(x/idlePrices[2][1]);
	idleData.strongGen1 = floor(x/idlePrices[3][1]);
	idleData.percentClick = floor(x/idlePrices[4][1]);
	idleData.points = idleData.lastAscensionPoints*idleData.starterPack/10**9	
}

function footerInfo(bool){
	let footer = document.getElementById('footer')
	if(bool){
		footer.innerHTML = 'Update ' + idleImportant.version + ' -  V0.5'	
	} else {
		footer.innerHTML = 'Made by Ibaraki DX'
	}
}

function laiAmount(){
	for(i=0;i<5;i++){
		let amt = idleData[idlePrices[i][3]]
		let scale = idlePrices[i][1]
		let base = idlePrices[i][0]*25
		idleData[idlePrices[i][3]] = log(scale,idleData.points*(scale-1)/base+scale**amt)	
	}	
}

function darkMatterTotal(){
	return 2**idleData.singularity
}

function buySingularity(){
	let x = price(11,11,idleData.singularity,false)
	if(idleData.darkMatter>=x){
		idleData.darkMatter = 0	
		idleData.singularity++
	}
	
}

function buyAccelerator(){
	let x = price(50, 4, idleData.laiAccel,false)
	if(idleData.darkMatter>=x){
		idleData.darkMatter -= x	
		idleData.laiAccel++
	}
}

function useCandy(candyNum){
	if(idleData['candy'+candyNum]>0){
		if(candyNum==1){
			idleData.lastTick -= 60000
		} else
		if(candyNum==2){
			idleData.lastTick -= 180000
		} else
		if(candyNum==3){
			idleData.lastTick -= 420000
		}
		idleData['candy'+candyNum]--
	}
}

function timeMult(){
	let mult = 1;
	mult*=1.25**idleData.laiAccel
	return mult
}


