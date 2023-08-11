var idleTrophies = {
	idleHand01:false,
	idleHand02:false,
	idleHand03:false,
	idleProduction01:false,
	idleProduction02:false,
	idleProduction03:false,
	idleClick01:false,
	idleClick02:false,
	idleClick03:false,
	aDayOff:false,
	old:false,
	generator01:false,
	moreClick01:false,
	generator02:false,
	moreClick02:false,
	idleKing01:false,
	idleKing02:false,
	idleKing03:false,
	//evenBeyond:false,
	beyond:false,
	//noBounds:false,
	limitBreak:false,
	//pierceTheSkies:false,
	neverForget:false
}

var reqTrophies = {
	reqIdleHand01:1000,
	reqIdleHand02:1000**3,
	reqIdleHand03:1000**6,
	reqIdleProduction01:100,
	reqIdleProduction02:1000**2,
	reqIdleProduction03:1000**5,
	reqIdleClick01:25,
	reqIdleClick02:1000**2/2**3,
	reqIdleClick03:1000**5/2**6,
	reqGenerator01:50,
	reqGenerator02:125,
	reqMoreClick01:25,
	reqMoreClick02:75,
	reqIdleKing01:1,
	reqIdleKing02:5,
	reqIdleKing03:10
}

var newsTrophies = {
	realNews:false,
	multiverse:false,
	antimatter:false,
	chanceMaker:false,
	consolationPrize:false,
	portalCycle:false,
	candyBox:false
}

var secretTrophies = {
	luckyDay:false,
	//neverClick:false,
	//everClick:false,
	insane:false,
	singularity:false,
	insisting:false,
	funKiller:false,
	insistingNum:0
}

function trophyCount(type){
	let x = 0
	if(type=='idle'){
	Object.entries(idleTrophies).forEach(([key, val])=>{if(val==true) x++})
	}
	if(type=='secret'){
	Object.entries(secretTrophies).forEach(([key, val])=>{if(val==true) x++})		
	}
	if(type=='news'){
	Object.entries(newsTrophies).forEach(([key, val])=>{if(val==true) x++})
	}
	return x
}

function resetTrophies() {
	Object.entries(idleTrophies).forEach(([key, val])=>{if(val==true) idleTrophies[key]=false})
	Object.entries(newsTrophies).forEach(([key, val])=>{if(val==true) newsTrophies[key]=false})
	Object.entries(secretTrophies).forEach(([key, val])=>{if(val==true) secretTrophies[key]=false})
	saveAchievements()
	location.reload()
}

function funKiller(){
	Object.entries(idleTrophies).forEach(([key, val])=>{if(val==false) idleTrophies[key]=true})
	Object.entries(newsTrophies).forEach(([key, val])=>{if(val==false) newsTrophies[key]=true})
	Object.entries(secretTrophies).forEach(([key, val])=>{if(val==false) secretTrophies[key]=true})
	saveAchievements()
	location.reload()
}

function saveAchievements() {
	localStorage.setItem("idleAchievements", JSON.stringify(idleTrophies))
	localStorage.setItem("newsAchievements", JSON.stringify(newsTrophies))
	localStorage.setItem("secretAchievements", JSON.stringify(secretTrophies))
} 

function loadAchievements(){
	achieve = JSON.parse(localStorage.getItem("idleAchievements"))
	Object.entries(achieve).forEach(([key, val])=>{if(idleTrophies[key]!==undefined) idleTrophies[key]=val})
	achieve = JSON.parse(localStorage.getItem("newsAchievements"))
	Object.entries(achieve).forEach(([key, val])=>{if(newsTrophies[key]!==undefined) newsTrophies[key]=val})
	achieve = JSON.parse(localStorage.getItem("secretAchievements"))
	Object.entries(achieve).forEach(([key, val])=>{if(secretTrophies[key]!==undefined) secretTrophies[key]=val})	
}
loadAchievements()

/*var achieve = JSON.parse(localStorage.getItem("idleAchievements"))
	if (typeof achieve.idleHand01 !== undefined) idleTrophies.idleHand01 = achieve.idleHand01;
	if (typeof achieve.idleHand02 !== undefined) idleTrophies.idleHand02 = achieve.idleHand02;
	if (typeof achieve.idleHand03 !== undefined) idleTrophies.idleHand03 = achieve.idleHand03;
	if (typeof achieve.idleProduction01 !== undefined) idleTrophies.idleProduction01 = achieve.idleProduction01;
	if (typeof achieve.idleProduction02 !== undefined) idleTrophies.idleProduction02 = achieve.idleProduction02;
	if (typeof achieve.idleProduction03 !== undefined) idleTrophies.idleProduction03 = achieve.idleProduction03;
	if (typeof achieve.idleClick01 !== undefined) idleTrophies.idleClick01 = achieve.idleClick01;
	if (typeof achieve.idleClick02 !== undefined) idleTrophies.idleClick02 = achieve.idleClick02;
	if (typeof achieve.idleClick03 !== undefined) idleTrophies.idleClick03 = achieve.idleClick03;
	if (typeof achieve.aDayOff !== undefined) idleTrophies.aDayOff = achieve.aDayOff;
	if (typeof achieve.old !== undefined) idleTrophies.old = achieve.old;
	if (typeof achieve.generator01 !== undefined) idleTrophies.generator01 = achieve.generator01;
	if (typeof achieve.generator02 !== undefined) idleTrophies.generator02 = achieve.generator02;
	if (typeof achieve.moreClick01 !== undefined) idleTrophies.moreClick01 = achieve.moreClick01;
	if (typeof achieve.moreClick02 !== undefined) idleTrophies.moreClick02 = achieve.moreClick02;
	if (typeof achieve.idleKing01 !== undefined) idleTrophies.idleKing01 = achieve.idleKing01;
	if (typeof achieve.beyond !== undefined) idleTrophies.beyond = achieve.beyond;
	if (typeof achieve.limitBreak !== undefined) idleTrophies.limitBreak = achieve.limitBreak;
	if (typeof achieve.neverForget !== undefined) idleTrophies.neverForget = achieve.neverForget;
	//if (typeof achieve. !== undefined) idleTrophies. = achieve.;
	
var achieve = JSON.parse(localStorage.getItem("newsAchievements"))
	if (typeof achieve.realNews !== undefined) newsTrophies.realNews = achieve.realNews;
	if (typeof achieve.multiverse !== undefined) newsTrophies.multiverse = achieve.multiverse;
	if (typeof achieve.antimatter !== undefined) newsTrophies.antimatter = achieve.antimatter;
	if (typeof achieve.chanceMaker !== undefined) newsTrophies.chanceMaker = achieve.chanceMaker;
	if (typeof achieve.consolationPrize !== undefined) newsTrophies.consolationPrize = achieve.consolationPrize;
	if (typeof achieve.portalCycle !== undefined) newsTrophies.portalCycle = achieve.portalCycle;
	//if (typeof achieve. !== undefined) newsTrophies. = achieve.;
	
var achieve = JSON.parse(localStorage.getItem("secretAchievements"))
	if (typeof achieve.luckyDay !== undefined) secretTrophies.luckyDay = achieve.luckyDay;
	if (typeof achieve.neverClick !== undefined) secretTrophies.neverClick = achieve.neverClick;
	if (typeof achieve.everClick !== undefined) secretTrophies.everClick = achieve.everClick;
	if (typeof achieve.insane !== undefined) secretTrophies.insane = achieve.insane;
	if (typeof achieve.singularity !== undefined) secretTrophies.singularity = achieve.singularity;
	if (typeof achieve.insisting !== undefined) secretTrophies.insisting = achieve.insisting;
	if (typeof achieve.funKiller !== undefined) secretTrophies.funKiller = achieve.funKiller;
	//if (typeof achieve. !== undefined) secretTrophies. = achieve.;*/

function completedAchievements(){
	if(idleTrophies.idleHand01) completed('idleP01');
	if(idleTrophies.idleHand02) completed('idleP02');
	if(idleTrophies.idleHand03) completed('idleP03');
	if(idleTrophies.idleProduction01) completed('idlePPS01');
	if(idleTrophies.idleProduction02) completed('idlePPS02');
	if(idleTrophies.idleProduction03) completed('idlePPS03');
	if(idleTrophies.idleClick01) completed('idlePPC01');
	if(idleTrophies.idleClick02) completed('idlePPC02');
	if(idleTrophies.idleClick03) completed('idlePPC03');
	if(newsTrophies.realNews) completed('realNews');
	if(newsTrophies.multiverse) completed('multiverse');
	if(newsTrophies.antimatter) completed('antimatter');
	if(newsTrophies.chanceMaker) completed('chanceMaker');
	if(idleTrophies.aDayOff) completed('aDayOff');
	if(idleTrophies.old) completed('old');
	if(newsTrophies.consolationPrize) completed('consolationPrize');
	if(idleTrophies.generator01) completed('generator01');
	if(idleTrophies.generator02) completed('generator02');
	if(idleTrophies.moreClick01) completed('moreClick01');
	if(idleTrophies.moreClick02) completed('moreClick02');
	if(idleTrophies.idleKing01) completed('idleKing01');
	if(idleTrophies.idleKing02) completed('idleKing02');
	if(idleTrophies.idleKing03) completed('idleKing03');
	if(secretTrophies.luckyDay) completed('lucky');
	if(secretTrophies.neverClick) completed('noclick');
	if(secretTrophies.everClick) completed('click');
	if(secretTrophies.insane) completed('insane');
	if(secretTrophies.singularity) completed('singularity');
	if(secretTrophies.insisting) completed('insisting');
	if(secretTrophies.funKiller) completed('funky');
	if(newsTrophies.portalCycle) completed('portalCycle');
	if(idleTrophies.beyond) completed('beyond');
	if(idleTrophies.neverForget) completed('neverForget');
	if(idleTrophies.limitBreak) completed('limitBreak');
	if(newsTrophies.candyBox) completed('candyBox');
	//if(Trophies.) completed('');
}


function idle(type, id){
	
	//points total
	if(type=="P"){
		document.getElementById("idleP"+id).innerHTML = "Get " + format(reqTrophies['reqIdleHand'+id]) + " points";
	}
	
	//points per second
	if(type=="PPS"){
		document.getElementById("idlePPS"+id).innerHTML = "Get " + format(reqTrophies['reqIdleProduction'+id]) + " points per second";	
	}

	//points per click
	if(type=="PPC"){
		document.getElementById("idlePPC"+id).innerHTML = "Get " + format(reqTrophies['reqIdleClick'+id]) + " points in a single click (ignoring synergy)";	
	}

	//more clicks level
	if(type=="Mor"){
		document.getElementById("moreClick"+id).innerHTML = "Get to More Clicks lv." + format(reqTrophies['reqMoreClick'+id]);
	}
	
	//generator level
	if(type=="Gen"){
		document.getElementById("generator"+id).innerHTML = "Get to Point Generator lv." + format(reqTrophies['reqGenerator'+id]);}

	//idle king level
	if(type=="King"){
		document.getElementById("idleKing"+id).innerHTML = "Get to Idle King lv." + format(reqTrophies['reqIdleKing'+id])
	}
}

function secret(id){
	description = document.getElementById(id)
	if(id=="lucky"){
		if(secretTrophies.luckyDay){description.innerHTML = "You had a 1/1000000 chance to get this every second"} else {description.innerHTML="Wait a bit, at any moment you will get"}	
	}
	if(id=="singularity"){
		if(secretTrophies.singularity){description.innerHTML = "Reach infinity"}else{description.innerHTML="Make the game reach its breaking point"}
	}
	/*if(id=="noclick"){
		if(secretTrophies.neverClick){description.innerHTML = "Beat the pure challenge without click upgrades"} else {description.innerHTML = "Wait for when you find purity and you will know what to do"}
	}
	if(id=="click"){
		if(secretTrophies.everClick){description.innerHTML = "Beat the pure challenge without generator upgrades"} else {description.innerHTML = "Wait for when you find purity and you will know what to do"}
	}*/
	if(id=="insane"){
		if(secretTrophies.insane){description.innerHTML = "Hold at some point 28 days of your record idle production"} else {description.innerHTML = "For when you forget the game, or for when you know what is this requirement and try to achieve it anyways"}
	}
	if(id=="insisting"){
		secretTrophies.insistingNum++;
		if(secretTrophies.insistingNum>=100&&!secretTrophies.insisting){
			secretTrophies.insisting=true; 
			completedAchievements(); 
		}
		if(secretTrophies.insisting){description.innerHTML = "Hover over this achievement 100 times, you did that " + secretTrophies.insistingNum + " times, feel bad now"} else {
			moveAwayMsg = ["Please, hover away", "Hey that tickles", "Stupid mouse", "Give me some space", "Thats not funny", "Bro, you have the entire screen"]
			description.innerHTML = moveAwayMsg[rng(0,moveAwayMsg.length-1)]
		}
		saveAchievements();
	}
}

function completed(elementid){
	if(localStorage.getItem("theme")!="magik"&&localStorage.getItem("theme")!="hover") {document.getElementById(elementid).parentElement.querySelectorAll('div').forEach(element => element.classList.add('rainbowBorder','rainbowText'))}
	else document.getElementById(elementid).parentElement.querySelectorAll('div').forEach(element => {
		element.style.borderColor="#0f0" 
		element.style.background="#000"
		element.style.color='#0f0'
	})
}

function luckyDay(){
	function luckyThrow(){
		let x = rng(1, 1000000)
		if(x==1) {
			secretTrophies.luckyDay = true
			saveAchievements()
		}
	}
	if(secretTrophies.luckyDay==false) window.setInterval(function(){luckyThrow()},1000)
}
luckyDay()