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
	equippedReference:"none",
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
	darkMatter:0,
	singularity:0,
	lastAscensionPoints:0,
	candy1:0,
	candy2:0,
	candy3:0,
	laiAccel:0,
	clicks:0,
	clicksThisAscension:0,
	clicksThisTranscension:0,
	pointsThisTranscension:0,
	inTranscension:false,
	thisTranscension:0,
	fastTranscension:0,
	numOfTranscensions:0,
	lastTranscensionPoints:0,
	theTotalCool:0,
	coolestPoints:0,
	//truePoints:0,
	//unrealPoints:0,
	coolMult:0,
	greatOrdeal:0,
	greatestKing:0,
	crit:0,
	critMult:0,
	critCrit:0,
	chanceBuy:0,
	ordeal_pure:false,
	ordeal_unstable:false,
	ordeal_plain:false,
	ordeal_noclick:false,
	ordeal_noidle:false,
	ordeal_anarchy:false,
	ordeal_decay:false,
	challenged:false,
	currentObjective:Infinity,
	completed:{ordeal_pure:false,ordeal_unstable:false,ordeal_plain:false,ordeal_noclick:false,ordeal_noidle:false,ordeal_anarchy:false,ordeal_decay:false},
	cookieCounter:0
}
var idlePrices = [
[10, 1.5, true, 'baseClick'],
[10, 1.2, true, 'gen1Power'],
[250, 2, true, 'betterClickAmt'],
[250, 2, true, 'strongGen1'],
[1000, 1000, true, 'percentClick'],
[50, 2, false, 'basicDiscountAmt'],
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
[10**5, 10**5, false, 'chosenKing'],
[10000, Infinity, false, 'referenceCondenser'],
[10**7, Infinity, false, 'omega'],
[10,30,false,'coolMult'],
[75, Infinity, false, 'greatOrdeal'],
[25, Infinity, false, 'greatestKing'],
[10**5,4,true,'crit'],
[300000,7,true,'critMult'],
[10**6,11,true,'critCrit'],
[10**5,15,true,'chanceBuy']

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
	version:8,
	sellBack:0.75,
	coolFactor:0.001,
	buyAmount:1,
	sell:false,
	chanceMakerEffect:'none',
	chanceMakerActive:false,
	unstableMult:50,
	ordeal:{pure:false,unstable:false,plain:false,noclick:false,noidle:false,anarchy:false,decay:false},
	trueObj:0
}

var ordealData = [
	['pure','Pure',10**9],
	['unstable','Unstable',10**16],
	['plain','Plain',10**12],
	['noclick','Forced Vacation',10**15],
	['noidle','Work 24/7',10**15],
	['anarchy','Anarchy',10**17],
	['decay','Decaying World',10**18]
	//[id, title, objective],
]

function clickPoints(){
	if(idleData.haltClicks) {return}
	if(!autoClicker) document.getElementById('theButton').blur()
	let x = Date.now()
	let diff = x-idleData.lastClick
	
	if(diff <= 100&&!idleTrophies.perfectSpeed){
		idleTrophies.perfectSpeed = true
		achieveCheck('perfectSpeed')
		saveAchievements()
	}

	if(idleData.equippedReference == 'candyBox'&&rng(1,100)==100){
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
		let y = clickBonus() * clickKingBonus(diff) * critMult() + synergyTotal()

		idleData.points += y
		idleData.allTimePoints += y
		idleData.pointsThisAscension += y
		idleData.pointsThisTranscension += y
		idleData.lastClick = x;
	}
	idleData.idleKingBonus /= 10;
	idleData.clicks++
	idleData.clicksThisAscension++
	idleData.clicksThisTranscension++
	visualUpdate();	
	
}

function synergyTotal(){
	let x = idleData.percentClick*idleImportant.synergyBonus*totalPPS();
	return x
}

function totalPPS(){
	let x = gen1PPS()*(1+idleData.idleKingBonus)*ascBonusMult()*logBonus()*unstableOrdeal()*legacyMult()*decayOrdeal('idle');
	if(!idleData.ordeal_pure){
		if(idleData.completed.ordeal_noclick&&isFinite(log(10,x))&&log(10,x)>1) x*= log(10,x)
		if(idleImportant.chanceMakerEffect == 'frenzy'){x*=7}
		if(idleImportant.chanceMakerEffect == 'clot'){x/=6}
		
		if(idleData.equippedReference=='ad'){
			if(log(10,idleData.darkMatter)>1){
				x*=log(10,idleData.darkMatter)
			}
		}
		
		
		if(idleData.equippedReference=="cookie")
			x*=1.07

		if(idleData.completed.ordeal_unstable) x*=2
	}	
	
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
	if(idleData.inTranscension){
		document.getElementById('main').style.display = 'none'
		document.getElementById('transcensionSection').style.display = 'block'
	} else
	if(idleData.inAscension){
		document.getElementById('main').style.display = 'none'
		document.getElementById('ascensionSection').style.display = 'block'
	}
	diff = (Date.now() - idleData.lastTick)/1000*timeMult()
	if(idleData.points<0) idleData.points=0
	if(idleData.equippedReference == 'ad'){
		idleData.darkMatter+=darkMatterTotal()*diff
	}
	if(!idleData.haltProduction){
		let x =totalPPS()*diff
		if(x>=0){
			idleData.points+=x;
			idleData.pointsThisAscension+=x;
			idleData.pointsThisTranscension+=x;
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
		} else
		if(x<0&&idleData.points+x>0){
			idleData.points+=x;
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
				txt+= t[1] + " seconds<br><br>You lost "+ format(-x) +" points while you were away</h1><br><button class=\"large long\" onclick=\"openIdle()\">Ok!</button>"
				tx.innerHTML = txt
			}
		} else
		{
			idleData.points=0;
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
				txt+= t[1] + " seconds<br><br>You lost all your points while you were away</h1><br><button class=\"large long\" onclick=\"openIdle()\">Oh no!</button>"
				tx.innerHTML = txt
			}
		}
	}
	visualUpdate();	
	if(diff/timeMult()>=86400&&!idleTrophies.aDayOff) {achieveCheck("aDayOff");idleTrophies.aDayOff = true;saveAchievements()}
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
		//exclusive king
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
		//later king unlocks
		if(idleData.greatestKing&&!idleData.ordeal_pure){
			if(idleData.idleKing>0){
				document.getElementById('chanceBuy').style.display = 'block'
				document.getElementById('crit').style.display = 'none'
				document.getElementById('critMult').style.display = 'none'
				document.getElementById('critCrit').style.display = 'none'
			} else if(idleData.clickKing>0){
				document.getElementById('crit').style.display = 'block'
				document.getElementById('critMult').style.display = 'block'
				document.getElementById('critCrit').style.display = 'block'
				document.getElementById('chanceBuy').style.display = 'none'
			} else {
				document.getElementById('chanceBuy').style.display = 'none'
				document.getElementById('crit').style.display = 'none'
				document.getElementById('critMult').style.display = 'none'
				document.getElementById('critCrit').style.display = 'none'
			}
		} else {
			document.getElementById('chanceBuy').style.display = 'none'
			document.getElementById('crit').style.display = 'none'
			document.getElementById('critMult').style.display = 'none'
			document.getElementById('critCrit').style.display = 'none'
		}
	if(idleData.equippedReference!='ad'){
	//shop text
	document.getElementById("moreClick").innerHTML = "More Clicks - lv. " + idleData.baseClick + "<br>" + format(thingPrice('baseClick')) + " points";
	document.getElementById("pointGen1").innerHTML = "Point Generator - lv. " + idleData.gen1Power + "<br>" + format(thingPrice('gen1Power')) + " points";
	document.getElementById("betterClick").innerHTML = "Better Clicks - lv. " + idleData.betterClickAmt + "<br>" + format(thingPrice('betterClickAmt')) + " points";
	document.getElementById("strongGen1").innerHTML = "Stronger Generator - lv. " + idleData.strongGen1 + "<br>" + format(thingPrice('strongGen1')) + " points";
	document.getElementById("percentClick").innerHTML = "Synergy - lv. " + idleData.percentClick + "<br>" + format(thingPrice('percentClick')) + " points";
	document.getElementById("basicDiscount").innerHTML = "Discount - lv. " + idleData.basicDiscountAmt + " (+" + floor(extraDiscounts()) + ")<br>" + format(thingPrice('basicDiscountAmt')) + " points";
	document.getElementById("clickKing").innerHTML = "The Click King - lv. " + idleData.clickKing + "<br>" + format(thingPrice('clickKing')) + " points";	
	document.getElementById("idleKing").innerHTML = "The Idle King - lv. " + idleData.idleKing + "<br>" + format(thingPrice('idleKing')) + " points";	
	document.getElementById("chanceBuy").innerHTML = "Not an AI - lv. " + idleData.chanceBuy + "<br>" + format(thingPrice('chanceBuy')) + " points";	
	document.getElementById("crit").innerHTML = "Critical Clicking - lv. " + idleData.crit + "<br>" + format(thingPrice('crit')) + " points";	
	document.getElementById("critMult").innerHTML = "Critical Pontuation - lv. " + idleData.critMult + "<br>" + format(thingPrice('critMult')) + " points";	
	document.getElementById("critCrit").innerHTML = "Critical Crits - lv. " + idleData.critCrit + "<br>" + format(thingPrice('critCrit')) + " points";	
	//document.getElementById("").innerHTML = "Name - lv. " + idleData. + "<br>" + format(thingPrice('')) + " points";	

		//more click shop
		if((idleData.points>=thingPrice('baseClick')||idleImportant.sell&&idleData.baseClick>0)&&thingPrice('baseClick')>0&&!idleData.ordeal_noclick){
			document.getElementById("moreClick").disabled = false
		} else {document.getElementById("moreClick").disabled = true}
		//1st generator shop
		if((idleData.points>=thingPrice('gen1Power')||idleImportant.sell&&idleData.gen1Power>0)&&thingPrice('gen1Power')>0&&!idleData.ordeal_noidle){
			document.getElementById("pointGen1").disabled=false
		}else{document.getElementById("pointGen1").disabled=true}
		//better click shop
		if((idleData.points>=thingPrice('betterClickAmt')||idleImportant.sell&&idleData.betterClickAmt>0)&&thingPrice('betterClickAmt')>0&&!idleData.ordeal_noclick){
			document.getElementById("betterClick").disabled=false
		}else{document.getElementById("betterClick").disabled=true}
		//stronger 1st generator shop
		if((idleData.points>=thingPrice('strongGen1')||idleImportant.sell&&idleData.strongGen1>0)&&thingPrice('strongGen1')>0&&!idleData.ordeal_noidle){
			document.getElementById("strongGen1").disabled=false
		}else{document.getElementById("strongGen1").disabled=true}
		//synergy shop
		if((idleData.points>=thingPrice('percentClick')||idleImportant.sell&&idleData.percentClick>0)&&thingPrice('percentClick')>0&&!idleData.ordeal_noclick&&!idleData.ordeal_noidle&&!idleData.ordeal_plain&&!idleData.ordeal_decay){
			document.getElementById("percentClick").disabled=false
		}else{document.getElementById("percentClick").disabled=true}
		//discount shop
		if((idleData.points>=thingPrice('basicDiscountAmt')||idleImportant.sell&&idleData.basicDiscountAmt>0)&&thingPrice('basicDiscountAmt')>0){
			document.getElementById("basicDiscount").disabled=false
		}else{document.getElementById("basicDiscount").disabled=true}
		//idle king shop
		if((idleData.points>=thingPrice('idleKing')||idleImportant.sell&&idleData.idleKing>0)&&thingPrice('idleKing')>0&&!idleData.ordeal_noidle&&!idleData.ordeal_anarchy){
			document.getElementById("idleKing").disabled=false
		}else{document.getElementById("idleKing").disabled=true}
		//click king shop
		if((idleData.points>=thingPrice('clickKing')||idleImportant.sell&&idleData.clickKing>0)&&thingPrice('clickKing')>0&&!idleData.ordeal_noclick&&!idleData.ordeal_anarchy){
			document.getElementById("clickKing").disabled=false
		}else{document.getElementById("clickKing").disabled=true}
		//not an ai
		if((idleData.points>=thingPrice('chanceBuy')||idleImportant.sell&&idleData.chanceBuy>0)&&thingPrice('chanceBuy')>0){
			document.getElementById("chanceBuy").disabled=false
		}else{document.getElementById("chanceBuy").disabled=true}
		//crit
		if((idleData.points>=thingPrice('crit')||idleImportant.sell&&idleData.crit>0)&&thingPrice('crit')>0){
			document.getElementById("crit").disabled=false;
		}else{document.getElementById("crit").disabled=true;}
		//crit multiplier
		if((idleData.points>=thingPrice('critMult')||idleImportant.sell&&idleData.critMult>0)&&thingPrice('critMult')>0){
			document.getElementById("critMult").disabled=false;
		}else{document.getElementById("critMult").disabled=true;}
		//critical crit
		if((idleData.points>=thingPrice('critCrit')||idleImportant.sell&&idleData.critCrit>0)&&thingPrice('critCrit')>0){
			document.getElementById("critCrit").disabled=false;
		}else{document.getElementById("critCrit").disabled=true;}
		/*template
		if((idleData.points>=thingPrice('')||idleImportant.sell&&idleData.>0)&&thingPrice('')>0){
			document.getElementById("").disabled=false;
		}else{document.getElementById("").disabled=true;}*/
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
			document.getElementById('chanceBuy').innerHTML = '[Buy '+maxThingDiff('chanceBuy')+']<br>'+document.getElementById('chanceBuy').innerHTML
			document.getElementById('crit').innerHTML = '[Buy '+maxThingDiff('crit')+']<br>'+document.getElementById('crit').innerHTML
			document.getElementById('critMult').innerHTML = '[Buy '+maxThingDiff('critMult')+']<br>'+document.getElementById('critMult').innerHTML
			document.getElementById('critCrit').innerHTML = '[Buy '+maxThingDiff('critCrit')+']<br>'+document.getElementById('critCrit').innerHTML
			//document.getElementById('').innerHTML = '[Buy '+maxThingDiff('')+']<br>'+document.getElementById('').innerHTML
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
	document.getElementById('chanceBuy').innerHTML = 'Not an AI<br>lv. 0'
	document.getElementById('chanceBuy').disabled = true
	document.getElementById('crit').innerHTML = 'Critical Clicking<br>lv. 0'
	document.getElementById('crit').disabled = true
	document.getElementById('critMult').innerHTML = 'Critical Pontuation<br>lv. 0'
	document.getElementById('critMult').disabled = true
	document.getElementById('critCrit').innerHTML = 'Critical Crits<br>lv. 0'
	document.getElementById('critCrit').disabled = true
	/*document.getElementById('').innerHTML = ''
	document.getElementById('').disabled = true*/
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
	document.getElementById('clickKingTt').innerHTML = 'Gives a bonus based on how fast you\'re clicking, up to '+ idleImportant.clickKingCap +'x at '+ format(kingdomManagement('click')) +' clicks per second'
	document.getElementById('idleKingTt').innerHTML = 'Gives a bonus to production every second after you stop clicking, up to ' + format(idleImportant.idleKingCap*100) + '% after '+ format(kingdomManagement('idle')) +'s'
	document.getElementById('critTt').innerHTML = `Increases the chance of critting on button click by .5% (Currently ${fixed(1,Math.min(100,idleData.crit*0.5))}%)`
	document.getElementById('critMultTt').innerHTML = `Increases crit multiplier by .25 (Currently x${fixed(2,1.25+idleData.critMult*0.25)})`
	document.getElementById('critCritTt').innerHTML = `Critical crits have a .5% of happening when a crit happens, this increases crit crit multiplier by 1 (Currently x${2+idleData.critCrit*2})`

		
	//show the ascension button
	if(idleData.pointsThisAscension<10**9){
		document.getElementById("ascensionButton").style.display = "none";
	} else{
		document.getElementById("ascensionButton").style.display = "block";
	}
	document.getElementById('ascensionButton').innerHTML = 'Ascend<br>+'+format(calcPrestige())+' cooler points'
}	

if(idleData.equippedReference == 'cookie'){
	document.getElementById('chanceMakerButton').style.display = 'block'
} else {
	document.getElementById('chanceMakerButton').style.display = 'none'
}

if(idleData.equippedReference == 'candyBox'){
	document.getElementById('candyBox').style.display = 'grid';
	document.getElementById('candy1').innerHTML = idleData.candy1
	document.getElementById('candy2').innerHTML = idleData.candy2
	document.getElementById('candy3').innerHTML = idleData.candy3
} else {
	document.getElementById('candyBox').style.display = 'none';
}

//updates txt on the ascension section
if(document.getElementById('ascensionSection').style.display!='none'){
	document.getElementById('ascensionCounter').innerHTML = "You have " + format(idleData.coolerPoints) + " cooler points<br>Ascension level " + format(idleData.totalCool) + ' (+'+ format(idleData.totalCool*idleImportant.coolFactor*100) +'%)'
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
	if(calcTranscension()<10) document.getElementById('ultAsc').style.display = 'none'; else {document.getElementById('ultAsc').style.display = 'block';document.getElementById('ultAscBar').innerHTML = format(calcTranscension())}
}

if(document.getElementById('transcensionSection').style.display!='none'){
	document.getElementById('transcensionCounter').innerHTML = `You have ${format(idleData.coolestPoints)} of the coolest points<br>Transcension level ${format(idleData.theTotalCool)}`
	transcensionMsg('coolMult')
	transcensionMsg('greatestKing')
	transcensionMsg('greatOrdeal')
}

//limiting upgrades that aren't infinite
if(idleData.chanceBuy>=50){
	document.getElementById('chanceBuy').disabled = true;
	document.getElementById('chanceBuy').innerHTML = `Not an AI - lv. MAX`;
}
if(idleData.crit>=200){
	document.getElementById('crit').disabled = true;
	document.getElementById('crit').innerHTML = `Critical Clicking - lv. MAX`;
}

if(idleData.greatOrdeal){
	document.getElementById('ordealTab').style.display = 'block'
} else document.getElementById('ordealTab').style.display = 'none'
//updates the great ordeals text
ordealData.forEach(([id,title,objective]) => {
	let txt = `${title}<br>Objective: ${format(objective)} points`
	if(idleData['ordeal_'+id]) txt += `<br>Active`
	else txt+=`<br>Not Active`
	if(idleImportant.ordeal[id]) txt+=`<br>Next Ascension`
	else txt+=`<br>Won't Activate`
	if(idleData.completed['ordeal_'+id]) txt+=`<br>Completed`
	else txt+='<br>Incompleted'
	document.getElementById('ordealTitle_'+id).innerHTML = txt
})
if(idleData.challenged)
	elem('ordealCounter').innerHTML = `You made ${format(idleData.pointsThisAscension)} points on this ordeal, your objective is ${format(idleData.currentObjective)}`
else
	elem('ordealCounter').innerHTML = ''

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
	if(!isFinite(x)&&isFinite(scale)){
		if(!secretTrophies.singularity)
		achieveCheck('singularity')
		secretTrophies.singularity=true
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
		idleData.hasSold = true
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
	let discount = idleImportant.basicDiscount**(idleData.basicDiscountAmt+extraDiscounts())
	if(idleData.equippedReference=="cookie"&&!idleData.ordeal_pure){
		discount*=0.93
	}
	return discount
}

function extraDiscounts(){
	if(idleData.ordeal_plain) return 0
	if(idleData.ordeal_pure) return floor(idleData.basicDiscountAmt/10)
	return floor(idleData.basicDiscountAmt/(10-idleData.comboPack))
}

function clickBonus(){
	let x = (idleData.baseClick+1) * idleImportant.baseBonus * idleImportant.betterClick**idleData.betterClickAmt * logBonus() * ascBonusMult() * unstableOrdeal() * decayOrdeal('click')
	if(!idleData.ordeal_pure) 
	{	
		if(idleData.completed.ordeal_noidle&&isFinite(log(10,x))&&log(10,x)>1) x*= log(10,x)
		if(idleImportant.chanceMakerEffect == 'click frenzy')
			x *= 17
		
		if(idleData.equippedReference=='ad'){
			if(log(10,idleData.darkMatter)>1){
				x*=log(10,idleData.darkMatter)
			}
		}
		if(idleData.completed.ordeal_unstable) x*=2
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
	let now = Date.now()
	notAnAI()
	if(idleData.ordeal_unstable) idleImportant.unstableMult = rng(-100,200)
	if(!secretTrophies.luckyDay&&rng(1,10**6)==1){
		achieveCheck("luckyDay")
		secretTrophies.luckyDay=true
	}
	if(document.getElementById('main').style.display!='none'){

		let cap = idleImportant.idleKingCap*idleData.idleKing
		let ikbonus = cap/kingdomManagement('idle')
		if(idleData.idleKingBonus+ikbonus<cap)
			idleData.idleKingBonus += ikbonus;
		else
			idleData.idleKingBonus=cap;

		//veery big spaghetti
		let statTab = document.getElementById('idleStats')
		let tx = ""
		tx = "<p>All time points: "+format(idleData.allTimePoints) 
		if(idleData.numOfTranscensions>0) tx+= '<br>Points this transcension: '+format(idleData.pointsThisTranscension)
		tx+= '<br>All time clicks: ' + format(idleData.clicks)
		if(idleData.numOfTranscensions>0) tx+= '<br>Clicks this transcension: '+format(idleData.clicksThisTranscension)
			tx+= "<br>Base click: "+idleData.baseClick
		if(idleImportant.baseBonus>1)
			tx+= "<br>Base click amount multiplier: "+ format(idleImportant.baseBonus)
		tx+= "<br>First generator production: " + idleData.gen1Power 
		if(idleImportant.gen1Bonus>1)
			tx+= "<br>Generator 1 amount multiplier: " + format(idleImportant.gen1Bonus)
		if(idleData.percentClick>0)
			tx+= "<br>Total synergy: " + round(idleData.percentClick*idleImportant.synergyBonus*100)+"% of the points per second"
		tx+= `<br>Price multiplier: ${fixed(2,basicDiscounting()*10**-floor(log(10,basicDiscounting())))}e${floor(log(10,basicDiscounting()))}`
		if(idleData.betterClickAmt>0)
			tx+= "<br>Better click multiplier: " + format(idleImportant.betterClick**idleData.betterClickAmt)
		if(idleData.strongGen1>0)
			tx+= "<br>Stronger generator multiplier: " + format(idleImportant.betterGen**idleData.strongGen1)
		if(idleData.idleKing>0){
			tx+= "<br>Idle king cap: "+ format(idleImportant.idleKingCap*idleData.idleKing*100) +"%"
			tx+= "<br>Idle king bonus: "+ floor(idleData.idleKingBonus*100+100)/100 +"x"
		}
		if(idleData.clickKing>0){
			tx+= `<br>Click king max bonus: ${(floor(clickKingBonus(0)*100)/100)}x`
			if(idleData.crit>0){
				tx+= `<br>Crit chance: ${Math.min(0.5*idleData.crit,100)}%`
				tx+= `<br>Crit multiplier: ${format(1.25+idleData.critMult*0.25)}`
				tx+= `<br>Critical crit multiplier: ${format((1.25+idleData.critMult*0.25)*(2+idleData.critCrit*2))}`
			}
		}
		if(idleData.numOfAscensions>0){
			tx += "<br>Points this ascension: "+format(idleData.pointsThisAscension)
			tx += '<br>Clicks this ascension: ' + format(idleData.clicksThisAscension)
			tx += `<br>Number of ascensions done: ${format(idleData.numOfAscensions)}`
			tx += `<br>Fastest ascension time: ${timeToText(timeConvert(idleData.fastAscension))}`
			tx += `<br>Current ascension time: ${timeToText(timeConvert(now-idleData.thisAscension))}`
			tx += `<br>Cooler points: ${format(idleData.coolerPoints)}`
			tx += `<br>Ascension level: ${format(idleData.totalCool)}`
			tx += `<br>Points on the last ascension: ${format(idleData.lastAscensionPoints)}`
		}
		if(logBonus()>1) tx+= `<br>Log power multiplier: ${format(logBonus())}`
		if(ascBonusMult()>1) tx+= `<br>Ascension bonus multiplier: ${format(ascBonusMult())}`
		if(timeMult()>1){
			tx+= '<br>Time multiplier: ' + floor(timeMult()*100) + 'x'
		}
		if(idleData.numOfTranscensions>0){
			tx += "<br>Points this transcension: "+format(idleData.pointsThisTranscension)
			tx += '<br>Clicks this transcension: ' + format(idleData.clicksThisTranscension)
			tx += `<br>Number of transcensions done: ${format(idleData.numOfTranscensions)}`
			tx += `<br>Fastest transcension time: ${timeToText(timeConvert(idleData.fastTranscension))}`
			tx += `<br>Current transcension time: ${timeToText(timeConvert(now-idleData.thisTranscension))}`
			tx += `<br>Coolest points: ${format(idleData.coolestPoints)}`
			tx += `<br>Transcension level: ${format(idleData.theTotalCool)}`
			tx += `<br>Cool points on the last trascension: ${format(idleData.lastTranscensionPoints)}`
			tx += `<br>The cool multiplier: ${format(2**idleData.coolMult)}`
		}
		tx+= "<br>Playing for: " + timeToText(timeConvert(now-idleData.firstTimeAll))
		statTab.innerHTML = tx
	}	
	idleData.chanceMakerTimer++
	if(rng(1,100)<=7&&idleData.chanceMakerTimer >= 77&&idleData.equippedReference=='cookie'&&!idleImportant.chanceMakerActive){
		idleImportant.chanceMakerActive = true
		if(rng(1,2)==1){
			document.getElementById('chanceMakerButton').innerHTML = 'Chancemaker<br>Force the hand of fate'			
		} else {
			document.getElementById('chanceMakerButton').innerHTML = "Chancemaker<br>I'm feeling lucky"
		}
	}
}
var secondUpdate = window.setInterval(function(){eachSecond()},1000)

function openIdle(){
	document.getElementById("main").style.display = "block";
	document.getElementById("offlineIdle").style.display = "none";
}

function buyAmount(crescent){
	let x = idleImportant.buyAmount
	if(crescent){
		if(x==1){idleImportant.buyAmount = 5} else
		if(x==5){idleImportant.buyAmount = 10} else
		if(x==10){idleImportant.buyAmount = 25} else
		if(x==25){idleImportant.buyAmount = 100} else
		if(x==100){idleImportant.buyAmount = Infinity} else
		if(x==Infinity){idleImportant.buyAmount = 1}
	} else {		
	if(x==1){idleImportant.buyAmount = Infinity} else
	if(x==5){idleImportant.buyAmount = 1} else
	if(x==10){idleImportant.buyAmount = 5} else
	if(x==25){idleImportant.buyAmount = 10} else
	if(x==100){idleImportant.buyAmount = 25} else
	if(x==Infinity){idleImportant.buyAmount = 100}
	}
	
	if (idleImportant.buyAmount == Infinity) document.getElementById("buyMaxButton").innerHTML = "Maximum"
	else document.getElementById("buyMaxButton").innerHTML = idleImportant.buyAmount + " by " + idleImportant.buyAmount
}

function sellMode(){
	idleImportant.sell = !idleImportant.sell
	if (idleImportant.sell) document.getElementById("sellButton").innerHTML = "Sell"
	else document.getElementById("sellButton").innerHTML = "Buy"
}

function calcPrestige(){
	//let x = Math.cbrt(idleData.pointsThisAscension)/100*2**idleData.coolMult
	let x = Math.cbrt(idleData.pointsThisAscension)/(log(10,idleData.pointsThisAscension)**2)*2**idleData.coolMult
	if(isFinite(x)&&idleData.pointsThisAscension>=10**9&&!idleData.challenged) return x
	return 0
}

function calcTranscension(){
	let x = Math.cbrt(idleData.totalCool)/100
	//let x = Math.cbrt(idleData.totalCool)/(log(10,idleData.totalCool)**2)
	if(isFinite(x)&&idleData.totalCool>=10**9) return x
	return 0
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
	//ordeal stuff
	let flag_lose = 0
	let flag_pure = 0
		//ordeal complete
		ordealData.forEach(([id,title,objective]) => {	
			idleData.challenged = false
			if(idleData.pointsThisAscension>=idleData.currentObjective&&idleData['ordeal_'+id]) {
				idleTrophies['ordeal_'+id] = true
				idleData.completed['ordeal_'+id] = true
				achieveCheck('ordeal_'+id)
				saveAchievements()
			}
		})
		if(idleData.ordeal_pure){
			flag_pure++
		}
		//ordeal start
		ordealData.forEach(([id,title,objective]) => {	
			idleData['ordeal_'+id] = idleImportant.ordeal[id]
			if(objective>idleImportant.trueObj&&idleData['ordeal_'+id]) idleImportant.trueObj = objective
			if(idleData['ordeal_'+id]) idleData.challenged = true
			idleImportant.ordeal[id] = false
		})
		if(idleData.ordeal_noidle){
			flag_lose++
		}
		if(idleData.ordeal_noclick){
			flag_lose++
		}
		idleData.currentObjective = idleImportant.trueObj
		idleImportant.trueObj = 0
		//ordeal achievements
		if(flag_lose == 2&&!secretTrophies.lose){
			achieveCheck('lose')
			secretTrophies.lose = true
		}
		if(flag_pure&&idleData.clicksThisAscension==0){
			achieveCheck('neverclick')
			secretTrophies.neverclick = true
		}
		if(flag_pure&&!idleData.hasSold&&idleData.gen1Power==0){
			achieveCheck('antiidle')
			secretTrophies.antiidle = true
		}
	idleData.points = 0
	idleData.pointsThisAscension = 0
	idleData.clicksThisAscension = 0
	idleData.highScore = 0
	idleData.baseClick=0
	idleImportant.baseBonus=1
	idleData.betterClickAmt = 0
	idleData.gen1Power=0
	idleImportant.gen1Bonus=1
	idleData.strongGen1 = 0
	idleData.basicDiscountAmt=0
	idleData.percentClick = 0
	idleData.idleKing=0
	idleData.clickKing=0
	idleData.chanceBuy=0
	idleData.crit=0
	idleData.critMult=0
	idleData.critCrit=0
	idleData.hasSold=false
	idleImportant.buyAmount = 1
	idleImportant.sell = false
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
if(sure()){
	document.getElementById('transcensionSection').style.display = 'block'
	document.getElementById('ascensionSection').style.display = 'none'
	transcended = Date.now()
	idleData.inTranscension = true
	idleData.haltProduction=true
	idleData.haltClicks=true
	let x = calcTranscension()
	idleData.coolestPoints += x
	idleData.theTotalCool += x
	idleData.lastTranscensionPoints = idleData.totalCool
	idleData.totalCool = 0
	idleData.coolerPoints = 0
	idleData.pointsThisTranscension = 0
	idleData.clicksThisTranscension = 0
	idleData.numOfAscensions = 1
	idleData.logPower = 1
	idleData.extraSynergy = 0
	idleData.starterPack = 0
	idleData.comboPack = 0
	idleData.memory = 1
	idleData.legacy = 0
	idleData.kingdomExpansion = 0
	idleData.kingdomManagement = 0
	idleData.chosenKing = 0
	idleData.referenceCondenser = 0
	idleData.omega = 0	
	idleData.equippedReference = 'none'
	
	idleData.numOfTranscensions++;
	if(idleData.thisTranscension == 0){
		idleData.fastTranscension = transcended-idleData.firstTimeAll;
	} else if(idleData.fastTranscension>transcended-idleData.thisTranscension){
		idleData.fastTranscension = transcended-idleData.thisTranscension;
	}	
}
}

function achieveCheck(id){
	let index = -1;
	let type = '?'
	for(i=0;i<idleTD.length;i++)
	{
		if(idleTD[i][0] == id) 
		{
			index = i
			type = 'idle'
		}
	}
	if(type=='?'){
		for(i=0;i<secretTD.length;i++)
		{
			if(secretTD[i][0] == id) 
			{
				index = i
				type = 'secret'
			}
		}
	}
	if(type=='?'){
		for(i=0;i<newsTD.length;i++)
		{
			if(newsTD[i][0] == id) 
			{
				index = i
				type = 'news'
			}
		}
	}
	if(type == 'idle')
	document.getElementById("achievementsDisplay").innerHTML += "<div id='"+id+"X' style='border-bottom:3px solid var(--detail)' class='long'><button onclick='selfDestruct("+id+"X)'>Achievement unlocked: "+idleTD[index][1]+"</button><br></div>"
	else
	if(type == 'secret')
	document.getElementById("achievementsDisplay").innerHTML += "<div id='"+id+"X' style='border-bottom:3px solid var(--detail)' class='long'><button onclick='selfDestruct("+id+"X)'>Achievement unlocked: "+secretTD[index][1]+"</button><br></div>"
	else
	if(type == 'news')
	document.getElementById("achievementsDisplay").innerHTML += "<div id='"+id+"X' style='border-bottom:3px solid var(--detail)' class='long'><button onclick='selfDestruct("+id+"X)'>Achievement unlocked: "+newsTD[index][1]+"</button><br></div>"
}

var achievementUpdate = window.setInterval(function(){
	if(document.getElementById("main").style.display != "none"){
	
	//idle
	
	if(!idleTrophies.idleP01&&idleData.points>=reqTrophies.reqidleP01) {
		achieveCheck("idleP01")
		idleTrophies.idleP01=true
	} 
	if(!idleTrophies.idleP02&&idleData.points>=reqTrophies.reqidleP02) {
		achieveCheck("idleP02")
		idleTrophies.idleP02=true
	}
	if(!idleTrophies.idleP03&&idleData.points>=reqTrophies.reqidleP03) {
		achieveCheck("idleP03")
		idleTrophies.idleP03=true
	}
	if(!idleTrophies.idlePPS01&&totalPPS()>=reqTrophies.reqidlePPS01){
		achieveCheck("idlePPS01")
		idleTrophies.idlePPS01=true
	}
	if(!idleTrophies.idlePPS02&&totalPPS()>=reqTrophies.reqidlePPS02){
		achieveCheck("idlePPS02")
		idleTrophies.idlePPS02=true
	}
	if(!idleTrophies.idlePPS03&&totalPPS()>=reqTrophies.reqidlePPS03){
		achieveCheck("idlePPS03")
		idleTrophies.idlePPS03=true
	}
	if(!idleTrophies.idlePPC01&&clickBonus()>=reqTrophies.reqidlePPC01) {
		achieveCheck("idlePPC01")
		idleTrophies.idlePPC01=true
	}
	if(!idleTrophies.idlePPC02&&clickBonus()>=reqTrophies.reqidlePPC02) {
		achieveCheck("idlePPC02")
		idleTrophies.idlePPC02=true
	}
	if(!idleTrophies.idlePPC03&&clickBonus()>=reqTrophies.reqidlePPC03) {
		achieveCheck("idlePPC03")
		idleTrophies.idlePPC03=true
	}
	if(!idleTrophies.king01&&(idleData.idleKing>=reqTrophies.reqKing01||idleData.clickKing>=reqTrophies.reqKing01)){
		achieveCheck("king01")
		idleTrophies.king01=true
	}
	if(!idleTrophies.king02&&(idleData.idleKing>=reqTrophies.reqKing02||idleData.clickKing>=reqTrophies.reqKing02)){
		achieveCheck("king02")
		idleTrophies.king02=true
	}
	if(!idleTrophies.king03&&(idleData.idleKing>=reqTrophies.reqKing03||idleData.clickKing>=reqTrophies.reqKing03)){
		achieveCheck("king03")
		idleTrophies.king03=true
	}
	if(!idleTrophies.old&&Date.now()-idleData.firstTimeAll>=1209600000){
		achieveCheck("old")
		idleTrophies.old=true
	}
	if(!idleTrophies.generator01&&idleData.gen1Power>=reqTrophies.reqGenerator01){
		achieveCheck("generator01")
		idleTrophies.generator01=true
	}
	if(!idleTrophies.generator02&&idleData.gen1Power>=reqTrophies.reqGenerator02){
		achieveCheck("generator02")
		idleTrophies.generator02=true
	}
	if(!idleTrophies.moreClick01&&idleData.baseClick>=reqTrophies.reqMoreClick01){
		achieveCheck("moreClick01")
		idleTrophies.moreClick01=true
	}
	if(!idleTrophies.moreClick02&&idleData.baseClick>=reqTrophies.reqMoreClick02){
		achieveCheck("moreClick02")
		idleTrophies.moreClick02=true
	}
	if(!idleTrophies.expand&&idleData.kingdomExpansion>0){
		achieveCheck("expand")
		idleTrophies.expand=true
	}
	if(!idleTrophies.biggering&&idleData.chosenKing>0){
		achieveCheck("biggering")
		idleTrophies.biggering=true
	}
	if(!idleTrophies.neverForget&&idleData.memory>0){
		achieveCheck("neverForget")
		idleTrophies.neverForget=true
	}
	if(!idleTrophies.omegacap&&idleData.omega==1){
		achieveCheck("omegacap")
		idleTrophies.omegacap=true
	}
	if(!idleTrophies.pierceTheSkies&&idleData.legacy==2){
		achieveCheck("pierceTheSkies")
		idleTrophies.pierceTheSkies=true
	}
	if(!idleTrophies.beyond&&idleData.numOfAscensions>0){
		achieveCheck("beyond")
		idleTrophies.beyond=true
	}
	/*if(!idleTrophies.&&idleData.){
		achieveCheck("")
		idleTrophies.=true
	}*/
	
	//secret
	

	if(!secretTrophies.insane&&idleData.highScore>=(idleData.highestPPS+1)*2419200){
		achieveCheck('insane')
		secretTrophies.insane=true
	}
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
		current.innerHTML = 'Synergy per upgrade: '+floor(idleImportant.synergyBonus*100)+'%'	
		if(idleData[id] < caps.exSynergy){		
			upgrade.innerHTML = 'Synergy per upgrade: '+floor(idleImportant.synergyBonus*100+1)+'%'	
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
			if(newsTrophies.antimatter){condensed.innerHTML += '<option value="ad">Lai oversimplification*</option>'}
			if(newsTrophies.candyBox){condensed.innerHTML += '<option value="candyBox">Candy box</option>'}
			//if(newsTrophies.){condensed.innerHTML += '<option value=""></option>'}
			
			document.getElementById('selectCondensed').value = idleData.equippedReference
			
			if(idleData.equippedReference == 'none'){upgrade.innerHTML = 'Waits for you to equip something'}
			if(idleData.equippedReference == 'cookie'){upgrade.innerHTML = '7% discount, 77% boost to production and can be activated to do random things'}
			if(idleData.equippedReference == 'ad'){upgrade.innerHTML = "You can't buy upgrades, generates dark matter<br>This upgrade will break progression, sorry. Refrain from using it if you want a more balanced experience."}
			if(idleData.equippedReference == 'candyBox'){upgrade.innerHTML = 'Clicking sometimes rewards you with candies that can skip time'}
			//if(idleData.equippedReference == ''){upgrade.innerHTML = ''}
				
		document.getElementById('selectCondensed').addEventListener("change", function(e) {idleData.equippedReference = e.currentTarget.value; ascensionMsg('referenceCondenser')})
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
		achieveCheck('surrenderToCaps')
		secretTrophies.surrenderToCaps=true
		
	if(idleData[name]<limit||idleData.omega&&idleData[name]<limitOver){
		let x = thingPrice(name)
		if(idleData.coolerPoints>=x){
			idleData[name]++
			idleData.coolerPoints-=x
			progressBar(idleData[name],name)	
			ascensionMsg(name)
		}
		if(!idleTrophies.limitBreak&&limit<=idleData[name]){
			achieveCheck('limitBreak')
			idleTrophies.limitBreak=true
		}
		if(!idleTrophies.noBounds&&limitOver==idleData[name]&&limit!=limitOver){
			achieveCheck('noBounds')
			idleTrophies.noBounds=true
		}
	}
	ascensionMsg(name)
	if(name == 'omega') {
		localStorage.setItem("idleSave", JSON.stringify(idleData))
		location.reload()
	}
}

function progressBar(current, name){
	barPercent = document.getElementById(name+'PB2')
	barBg = document.getElementById(name+'PB1')
	setAscensionLimit(name)

	if(typeof current==="boolean")
		if(current==false) 
			current=0;
		else
			current=1;
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

caps2 = {
	coolMult:Infinity,
	greatOrdeal:1,
	greatestKing:1
}

function buyTranscensionUpgrade(name){
	let limit = caps2[name]
		
	if(idleData[name]<limit){
		let x = thingPrice(name)
		if(idleData.coolestPoints>=x){
			idleData[name]++
			idleData.coolestPoints-=x
		}
	}
	transcensionMsg(name)

}

function transcensionMsg(name){
	let title = document.getElementById(name + 'Title')
	//let price = format(thingPrice(name))
	//let current = document.getElementById(name + 'Current')
	//let upgrade = document.getElementById(name + 'Upgrade')
	switch(name){
		case 'coolMult': {
			title.innerHTML = `A Cool Multiplier`
			document.getElementById(name + 'Current').innerHTML = `Current: ${2**idleData[name]}x cool points production`
			document.getElementById(name + 'Upgrade').innerHTML = `Upgrade: ${2**(idleData[name]+1)}x cool points production`
		} break;
		case 'greatOrdeal': {
			title.innerHTML = `The Great Ordeals`
		} break;
		case 'greatestKing': {
			title.innerHTML = `The Greatest King`
		} break;
	}
	title.innerHTML += `<br>${format(thingPrice(name))} of the coolest points`
	progressBar2(name)
}

function progressBar2(name){
	let limit = caps2[name]
	let bar = document.getElementById(name+'Progress')
	if(limit == 1){
		if(idleData[name] == 0) bar.innerHTML = 'LOCKED'
		else bar.innerHTML = 'OBTAINED!' 
	} else
	{
		if(idleData[name] == limit) bar.innerHTML = 'Lv. MAX!'
		else bar.innerHTML = 'Lv. ' + idleData[name]
	}
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

	if(idleData.ordeal_noclick&&!idleData.haltClicks) idleData.haltClicks = true
	if(idleData.ordeal_noidle&&!idleData.haltProduction) idleData.haltProduction = true
	
	//ad reference
	if(idleData.equippedReference == 'ad'&&!idleData.ordeal_pure){
		laiAmount()
	}
		
	//set the quantity buffs
	
	//click bonus
	if(idleData.baseClick>=10&&!idleData.ordeal_plain){
		if(idleData.completed.ordeal_plain){
			idleImportant.baseBonus= 4.4**floor(idleData.baseClick/25+1)
		} else
		idleImportant.baseBonus= 4**floor(idleData.baseClick/25+1)
	} else idleImportant.baseBonus=1

	//generator bonus
	if(idleData.gen1Power>=10&&!idleData.ordeal_plain){
		if(idleData.completed.ordeal_plain){
			idleImportant.gen1Bonus= 2.2**floor(idleData.gen1Power/25+1)
		} else
		idleImportant.gen1Bonus= 2**floor(idleData.gen1Power/25+1)
	} else idleImportant.gen1Bonus=1
	
	if(!idleData.ordeal_pure){
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
	} else {		
	idleImportant.idleKingCap = 0.5
	idleImportant.clickKingCap = 4
	idleImportant.synergyBonus = 0.01
	idlePrices[6][1] = 100
	idlePrices[7][1] = 100
	idleImportant.coolFactor = 0
	if(idleData.clickKing == 0) {
		idleData.crit = 0
		idleData.critMult = 0
		idleData.critCrit = 0
	}
	if(idleData.idleKing == 0) idleData.chanceBuy = 0
	}
	
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
		if(idleData.ordeal_pure) x = 0
		
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
			let a = totalPPS()*120+rng(7,14)
			idleData.points+=a
			chanceButton.innerHTML += 'Lucky!<br>You have won ' + format(a) + ' points'			
		} else
		if(x == 5){
			idleImportant.chanceMakerEffect = 'frenzy'
			chanceButton.innerHTML += 'Frenzy!<br>Production x7 for 77 seconds'			
		} else
		if(x == 6){
			idleImportant.chanceMakerEffect = 'click frenzy'
			chanceButton.innerHTML += 'Click frenzy!<br>Base click x17 for 27 seconds'			
		}
	}
}

function logBonus(){
	if(idleData.ordeal_pure) return 1
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
	if(!idleData.challenged){
		let x = idleData.starterPack*5
		idleData.baseClick = floor(x/idlePrices[0][1]);
		idleData.gen1Power = floor(x/idlePrices[1][1]);
		idleData.betterClickAmt = floor(x/idlePrices[2][1]);
		idleData.strongGen1 = floor(x/idlePrices[3][1]);
		idleData.percentClick = floor(x/idlePrices[4][1]);
		idleData.points = idleData.lastAscensionPoints*idleData.starterPack/10**9
		if(idleData.completed.ordeal_pure) idleData.points*=1000
	}
	if(idleData.ordeal_pure) idleData.points = 10
	if(idleData.ordeal_noclick) idleData.gen1Power = 1
}

function footerInfo(bool){
	let footer = document.getElementById('footer')
	if(bool){
		footer.innerHTML = 'Update ' + idleImportant.version + ' -  V0.6'	
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
		if(!idleData.ordeal_pure){
			if(candyNum==1){
				idleData.lastTick -= 60000
			} else
			if(candyNum==2){
				idleData.lastTick -= 180000
			} else
			if(candyNum==3){
				idleData.lastTick -= 420000
			}
		}
		idleData['candy'+candyNum]--
	}
}

function timeMult(){
	if(idleData.ordeal_pure) return 1
	return 1.25**idleData.laiAccel
}

function untranscend()
{
	document.getElementById('transcensionSection').style.display = 'none'
	document.getElementById('ascensionSection').style.display = 'block'
	
	idleData.inTranscension = false
	idleData.inAscension = true
	if(idleData.completed.ordeal_anarchy) idleData.chosenKing = 1
	if(idleData.completed.ordeal_plain) idleData.comboPack = 1
	
	correctVariables()
	
	idleData.thisTranscension = Date.now()
	localStorage.setItem("idleSave", JSON.stringify(idleData))
	location.reload()
}

function kingdomManagement(mode)
{
	if(mode == 'idle'){
		if(idleData.ordeal_pure) return 60
		let x = 60*0.87**idleData.kingdomManagement
		if(idleData.completed.ordeal_decay) x/=2
		return x
	} else
	if(mode == 'click'){
		if(idleData.ordeal_pure) return 10
		let x = 10-0.7*idleData.kingdomManagement
		if(idleData.completed.ordeal_decay) x/=2
		return x
	}
}

function decayOrdeal(mode){
	if(!idleData.ordeal_decay) return 1
	let x
	let t = (Date.now()-idleData.lastClick)/1000
	if(mode == 'idle'){
		x = (1/(t+1)-t/110)**3
		if(t>10) return 0
	}
	if(mode == 'click'){
		x = 2**(t-10)
	}
	if(x>1) return 1
	else
	if(x<0) return 0
	else
	return x
}

function unstableOrdeal(){
	if(idleData.ordeal_unstable) return idleImportant.unstableMult/100
	else return 1
}

function canBuy(name)
{
	if(thingPrice(name)<=idleData.points&&thingPrice(name)>0) return true; else return false
}

function notAnAI(){
	if(!idleImportant.sell&&rng(1,50)<=idleData.chanceBuy)
	{
		if(canBuy('idleKing')) buySomething('idleKing')
		else if(canBuy('strongGen1')) buySomething('strongGen1')
		else if(canBuy('gen1Power')) buySomething('gen1Power')
		else if(canBuy('basicDiscountAmt')) buySomething('basicDiscountAmt')
	}
}

function critMult()
{
	let x = 1
	if(idleData.crit>=rng(1,200))
	{ 
		document.getElementById('critIndicator').style.display = 'block'
		x = 1.25+idleData.critMult*0.25
		if(rng(1,200)==1) {
			x *= 2+idleData.critCrit*2
			document.getElementById('critIndicator').innerHTML = `CRITICAL CRIT (x${fixed(2,x)})`
		} else
		document.getElementById('critIndicator').innerHTML = `CRIT (x${fixed(1,x)})`
	} else
	document.getElementById('critIndicator').style.display = 'none'
	return x
}

function ascBonusMult(){
	if(idleData.challenged) return 1
	return 1+idleImportant.coolFactor*idleData.totalCool
}

function legacyMult(){
	if(idleData.ordeal_pure) return 1
	let x = 1
	if(idleData.legacy == 1){
		let legacy = 1.03**trophyCount('idle')
		if(legacy < 100)
			x=legacy
		else {
			x=100
			if(!idleTrophies.hitSoftcap){
				achieveCheck('hitSoftcap')
				idleTrophies.hitSoftcap = true
			}
		}
	}
	if(idleData.legacy == 2){
		let legacy = 1.04**(trophyCount('idle')+trophyCount('news'))
		if(legacy < 10000)
			x*=legacy
		else {
			x*=10000
			if(!idleTrophies.hitSoftcap){
				achieveCheck('hitSoftcap')
				idleTrophies.hitSoftcap = true
			}
		}
	}
	return x
}

function nextOrdeal(id){
	if(!idleData.challenged){
		idleImportant.ordeal[id] = !idleImportant.ordeal[id]
	}
}


document.addEventListener("keydown",hotKey)
function hotKey(e){	
	if(!idleData.inAscension&&!idleData.inTranscension)
		if (!e.repeat) 
		{
			switch(e.code){
				case 'Digit1':{
					if(!document.getElementById('moreClick').disabled) buySomething('baseClick')
				} break;
				case 'Digit2':{
					if(!document.getElementById('pointGen1').disabled) buySomething('gen1Power')
				} break;
				case 'Digit3':{
					if(!document.getElementById('betterClick').disabled) buySomething('betterClickAmt')
				} break;
				case 'Digit4':{
					if(!document.getElementById('strongGen1').disabled) buySomething('strongGen1')
				} break;
				case 'Digit5':{
					if(!document.getElementById('basicDiscount').disabled) buySomething('basicDiscountAmt')
				} break;
				case 'KeyO':{
					if(document.getElementById('ordealTab').style.display == 'block') openTab('ordealSection',false)
				} break;
				case 'KeyS':{
					openTab('idleTab',false)
				} break;
				case 'KeyU':{
					openTab('basicSection',false)
				} break;
				case 'KeyP':{
					if(idleData.points>=10**9) prestige()
				} break;
				case 'ControlLeft':{
					buyAmount(1)
				} break;
				case 'ShiftLeft':{
					buyAmount(0)
				} break;
			}
		}
}