var idleTrophies = {
	idleP01:false,
	idleP02:false,
	idleP03:false,
	idlePPS01:false,
	idlePPS02:false,
	idlePPS03:false,
	idlePPC01:false,
	idlePPC02:false,
	idlePPC03:false,
	aDayOff:false,
	old:false,
	generator01:false,
	moreClick01:false,
	generator02:false,
	moreClick02:false,
	king01:false,
	king02:false,
	king03:false,
	evenBeyond:false,
	beyond:false,
	noBounds:false,
	limitBreak:false,
	pierceTheSkies:false,
	neverForget:false,
	perfectSpeed:false,
	expand:false,
	biggering:false,
	omegacap:false,
	hitSoftcap:false,
	ordeal_pure:false,
	ordeal_unstable:false,
	ordeal_plain:false,
	ordeal_noclick:false,
	ordeal_noidle:false,
	ordeal_anarchy:false,
	ordeal_decay:false,
	transcensionMult:false,
	lazyKing:false,
	critKing:false
}

var reqTrophies = {
	reqidleP01:1000,
	reqidleP02:10**9,
	reqidleP03:10**18,
	reqidlePPS01:100,
	reqidlePPS02:10**6,
	reqidlePPS03:10**15,
	reqidlePPC01:25,
	reqidlePPC02:10**6/4,
	reqidlePPC03:10**15/4,
	reqGenerator01:50,
	reqGenerator02:125,
	reqMoreClick01:25,
	reqMoreClick02:75,
	reqKing01:1,
	reqKing02:5,
	reqKing03:10
}

var newsTrophies = {
	realNews:false,
	multiverse:false,
	antimatter:false,
	chanceMaker:false,
	consolationPrize:false,
	portalCycle:false,
	candyBox:false,
	freeCookie:false
}

var secretTrophies = {
	luckyDay:false,
	insane:false,
	singularity:false,
	insisting:false,
	funKiller:false,
	insistingNum:0,
	literally:false,
	konamiCode:false,
	surrenderToCaps:false,
	lose:false,
	antiidle:false,
	neverclick:false
}

var idleTD = [
	['idleP01','Just a warm up',''],
	['idleP02','Getting somewhere',''],
	['idleP03','Not enough',''],
	['idlePPS01','Break time',''],
	['idlePPS02','Ready to go',''],
	['idlePPS03','Stand by',''],
	['idlePPC01','Active person',''],
	['idlePPC02',"It's also idle, remember?",''],
	['idlePPC03','The clicker',''],
	['aDayOff','Touching grass','Be offline for at least 1 day'],
	['old','An old man','Have 2 weeks of playtime'],
	['generator01','Production line',''],
	['moreClick01','Click a ton',''],
	['generator02','The great factory',''],
	['moreClick02','Strength in numbers',''],
	['king01','A new reign',''],
	['king02','Blooming kingdom',''],
	['king03','Where are we going, King?',''],
	['beyond','Beyond','Ascend for the first time'],
	['evenBeyond','Even further beyond','Transcend for the first time'],
	['noBounds','No bounds','Overcharge an ascension upgrade completely'],
	['limitBreak','Limit break','>Maximize an ascension upgrade'],
	['pierceTheSkies','Piercing the skies','Overcharge the convergent legacy'],
	['neverForget','Never forget','Get the residual memory upgrade'],
	['perfectSpeed','Perfect speed','Click at 10cps or faster (or use auto clicker)'],
	['expand','Expand, expand, expand','Get the kingdom expansion upgrade'],
	['biggering','Biggering','Get the chosen one upgrade'],
	['omegacap','Goodbye softcaps, hello softcaps','Get the omega overcharge'],
	['hitSoftcap','Get *softcapped*, dummy','Make anything stop giving bonus for getting too strong'],
	['ordeal_pure','Proving I can do it again',''],
	['ordeal_unstable',"It's fine",''],
	['ordeal_plain','Not boring enough',''],
	['ordeal_noclick','But nothing changed...',''],
	['ordeal_noidle','My finger hurts...',''],
	['ordeal_anarchy','I kinda missed those upgrades',''],
	['ordeal_decay','This is not fun',''],
	['transcensionMult','Hey dev, where is my transcension level?','Buy a cool multiplier upgrade'],
	['lazyKing','The lazy gets lazier','Autobuy Idle King'],
	['critKing','Big boy multipliers','Get a critical crit click on the button'],
	//['','',''],
	//[id,title,description],
]
var newsTD = [
	['realNews','Trustworthy','Find and click the news that asks to be trusted'],
	['multiverse','Outside of everything?','See news about a rocket at insane speeds<br>This unlocks all references to outside'],
	['antimatter','Inversion','See news about antimatter<br>Unlocks Lai oversimplification on the condenser'],
	['chanceMaker',"Who doesn't like cookies?",'See news about the cookie entity<br>Unlocks the Chancemaker on the condenser'],
	['consolationPrize','Do you feel consoled yet?','Get the consolation prize'],
	['portalCycle','Portal mayhem','See news about someone coming from a portal'],
	['candyBox',"It's all about the gains",'See news about someone training too much<br>Unlocks the candy box on the condenser'],
	['freeCookie','Free stuff!','Get a free cookie']
	//['','',''],
	//[id,title,description],
]
var secretTD = [
	['luckyDay','Lucky day',''],
	['insane','Insanity',''],
	['singularity','Singularity',''],
	['insisting','Stop insisting',''],
	['funKiller','Fun killer',''],
	['literally','As said',''],
	['konamiCode','That classic code',''],
	['surrenderToCaps','Surrender to the softcaps now',''],
	['lose','Congratulations, you lose',''],
	['antiidle','Anti-idle',''],
	['neverclick','Neverclick','']
	//['','',''],
	//[id,title,description],
]

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

function completedAchievements(){
	Object.entries(idleTrophies).forEach(([key,val]) => {
		if(val==1&&document.getElementById(key)!==null) completed(key)
	})
	Object.entries(newsTrophies).forEach(([key,val]) => {
		if(val==1&&document.getElementById(key)!==null) completed(key)
	})
	Object.entries(secretTrophies).forEach(([key,val]) => {
		if(val==1&&document.getElementById(key)!==null) completed(key)
	})
}


function idle(type, id){
	
	//points total
	if(type=="P"){
		document.getElementById("idleP"+id).innerHTML = "Get " + format(reqTrophies['reqidleP'+id]) + " points";
	}
	
	//points per second
	if(type=="PPS"){
		document.getElementById("idlePPS"+id).innerHTML = "Get " + format(reqTrophies['reqidlePPS'+id]) + " points per second";	
	}

	//points per click
	if(type=="PPC"){
		document.getElementById("idlePPC"+id).innerHTML = "Get " + format(reqTrophies['reqidlePPC'+id]) + " points in a single click (ignoring synergy)";	
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
		document.getElementById("king"+id).innerHTML = "Get a King upgrade to lv." + format(reqTrophies['reqKing'+id])
	}
}

function secret(id){
	description = document.getElementById(id)
	if(id=="luckyDay"){
		if(secretTrophies.luckyDay){description.innerHTML = "You had a 1/1000000 chance to get this every second"} else {description.innerHTML="Wait a bit, at any moment you will get"}	
	}
	if(id=="singularity"){
		if(secretTrophies.singularity){description.innerHTML = "Scale to &infin;"}else{description.innerHTML="Make the game reach its breaking point"}
	}
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
	if(id=='konamiCode'){
		if(secretTrophies.konamiCode){
			description.innerHTML = 'Load "wwssadad"'
		} else {
			description.innerHTML = 'Load an special 8 digit code'
		}
	}
	if(id=='lose'){
		if(secretTrophies.lose){
			description.innerHTML = 'Activate the Work 24/7 and the Forced Vacation ordeals at the same time'
		} else {
			description.innerHTML = 'Lock your click and idle production to 0'
		}
	}
	if(id=='antiidle'){
		if(secretTrophies.antiidle){
			description.innerHTML = 'Complete the Pure ordeal without pressing the button'
		} else {
			description.innerHTML = 'Finish a pure run without stressing your fingers'
		}
	}
	if(id=='neverclick'){
		if(secretTrophies.antiidle){
			description.innerHTML = 'Complete the Pure ordeal without buying a generator'
		} else {
			description.innerHTML = 'Finish a pure run with only your effort'
		}
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

function ordUpd()
{
	let ordealData = [
		['pure','Pure'],
		['unstable','Unstable'],
		['plain','Plain'],
		['noclick','Forced Vacation'],
		['noidle','Work 24/7'],
		['anarchy','Anarchy'],
		['decay','Decaying World']
		//[id, title],
	]
	for([id,title] of ordealData)
	{
		document.getElementById('ordeal_'+id).innerHTML = `Complete the ${title} ordeal`
	}
}