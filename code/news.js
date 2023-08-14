var newsArray=[];

function updateNewsArray() {
newsArray = [
//random
["We're no strangers to love, you know the rules and so do I. A full commitment's what I'm thinking of... You wouldn't get this from any other guy. I just wanna tell you how I'm feeling... Gotta make you understand. Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you",true,"r01"],
["Hey, you can suggest more news on our discord!",true,"r02"],
["Ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ORA!",true,"r03"],
["The cake is probably a lie",true,"r04"],
["That will probably not be fixed",true,"r05"],
["What do you mean that's not how you're suposed to use news tickers?",true,"r06"],
["Lore - Never coming.",true,"r07"],
["It's actually not that hard to get the same news ticker multiple times",true,"r08"],
["Bro, I have news...",true,"r09"],
["Only the truth here",true,"r10"],
["News ticker, now with extra references!",newsTrophies.multiverse,"r11"],
["Dev forgot to put copypastas on the news",true,"r12"],
["xd - the dev, anytime he sends a message",true,"r13"],
["No, don't put a cat on a box with radioactive stuff and explosives",true,"r14"],
["News ticker 1, looking at the big numbers 1123581321345589144233377610987",true,"r15"],
["There was a moment where you couldnt hover upgrades, dark times",true,"r16"],
["Insert your ad here",true,"r17"],
["This news ticker is brought to you by Random Number Generator!",true,"r18"],
["Wake up, we miss you",true,"r19"],
["*does a flip*",true,"r20"],
["Welcome to Brazil",true,"r21"],
["This is a fake news",true,"r22"],
["Batman, I caught a pokemon...",true,"r23"],
["Welcome to the internet, have a look around",true,"r24"],
["No, I can't beat Goku :(",true,"r25"],
['&#x1f938;&#x1f3cc;',true,'r26'],
["If it hadn't been for Cotton-Eye Joe...",true,'r27'],
["&#x1f3c3;",true,'r28'],
['&#x1f3cd;&#xfe0f;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x2800;&#x1f693;',true,'r29'],
['&#x1f914;',true,'r30'],
['I forgot what I was going to write :^)',true,'r31'],
['Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy?',true,'r32'],
['99.99% of the quotes and statistics you find online are fake and made up - Albert Einstein',true,'r32'],
//clickable
["<a href=https://youtu.be/HUtTC9x14mY?t=2 target='_blank'>Click here to not win a prize!</a>",true,"c01"],
["<a href=https://youtu.be/dQw4w9WgXcQ target='_blank'>https://youtu.be/dQw4w9WgXcQ</a>",true,"c02"],
["<a href=# onclick='{newsTrophies.realNews=true; saveAchievements()}'>Click here if you believe in me</a>",!newsTrophies.realNews,"c03"],
["<a href=# onclick='{newsTrophies.consolationPrize=true; saveAchievements()}'>Here is a consolation prize for you!</a>",!newsTrophies.consolationPrize,"c04"],
["<a href=https://youtu.be/dQw4w9WgXcQ target='_blank'>COLD SINGLES AWAY FROM YOU!!!1!</a>",true,"c05"],
["<a href=https://youtu.be/HUtTC9x14mY?t=2 target='_blank'>Get distracted here</a>",true,"c06"],
["<a href=# onclick='{newsTrophies.consolationPrize=true; saveAchievements()}'>Click here to win a prize!</a>",!newsTrophies.consolationPrize,"c07"],
//trivia
['If Marvel had kept the Atlas Comics name, the crossovers with DC could be called AC/DC', true,'t01'],
['Gholdengo, the 1000th pokemon, is a surfer made of gold coins, this is a reference to the fact that the creators are surfing in money', true,'t02'],
['The first ice alien to appear in Ben 10 was... Heatblast with a cold...', true,'t03'],
['The dev is probably not working on the next update in this moment', true,'t04'],
['If you say no to a "we want cookies" message and refresh the page, the question will appear again if they\'re really not getting cookies', true,'t05'],
["100000001 is divisible by 17", true,'t06'],
["Real coinflips aren't really 50/50", true, 't07'],
//news
["Breaking news: A rocket was detected flying across our universe at speeds beyond anything our bad scientists can count",true,"n01"],
["Breaking news: The dev was found playing another game instead of working on his own, the server moderation is trying to make him stop doing references on the breaking news",true,"n02"],
["Breaking news: Dev was found coding on notepad++, he is now under search from all visual studio users",true,"n03"],
["Breaking news: The next update will be relea-",true,"n04"],
["Breaking news 2: The Return of The Broken News",true,"n05"],
["Breaking news: The dev was found cutting virtual grass, he is probably training to touch real one",true,"n06"],
//references
["Breaking news: The entity known as \"You\" just turned one more idleverse into a cookie production machine, our scientists are now scared of cookies", newsTrophies.multiverse&&rng(1, 20)==20,"rc01"],
["Breaking news: Illegal cookie mine was discovered and destroyed - The cookie entity is not pleased, but it is busy cloning itself",newsTrophies.multiverse&&rng(1, 20)==20,"rc02"],
["Breaking news: Idleverse made of antimatter somehow surpassed infinity, our bad scientists worry it might overflow",newsTrophies.multiverse&&rng(1, 20)==20,"ra01"],
["Fixing news: Low levels of antimatter were detected on the news ticker, we aren't working on the issue",newsTrophies.multiverse&&rng(1, 20)==20,"ra02"],
["Breaking news: Random person appeared out of a portal, killed half the city's slime population, and left in another portal a couple hours later",newsTrophies.multiverse&&rng(1, 20)==20,"ri01"],
['Breaking news: We found a random person pushing a massive boulder around, we asked why but the only thing the person said was: "Do you have any candy to pass time?"',newsTrophies.multiverse&&rng(1, 20)==20,'rs01'],
//["",true,""],
["Hello world!",true,"r00"]
];
if(typeof idleData != "undefined") newsArray.push(
["You broke the local record! Wait, what do you mean there was no highscore?",idleData.highscore>10**6,"i01"],
["A friend asks why you need so many points... He is no longer your friend.",idleData.points>10**9,"i02"],
["You got over a trillion points, here a free cookie",idleData.points>10**12,"i03"],
["Are you still there?",idleData.points>10**15,"i04"],
["If that was actual money, you could start an Earth collection",idleData.points>10**18,"i05"],
["You're high, bro... WAIT, NOT LIKE THAT",idleData.points>10**21,"i06"]
)
}
var s = document.getElementById('news');
var scrollTimeouts = [];
var nextMsgIndex;
function findNewsID(id){
	foundID = 'id not found'
	for(i=0;i<newsArray.length&&foundID=='id not found';i++){
		if(newsArray[i][2] == id) var foundID = newsArray[i][0]
	}
	return foundID
}
function scrollNextMessage() {
	updateNewsArray();
	try {
		do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]))
	} catch(e) {
		console.log("news id " + newsArray[nextMsgIndex][2] + "is broken :p")
	}
	
	//news achievements
	if(!newsTrophies.multiverse&&newsArray[nextMsgIndex][2]=="n01") {
		newsTrophies.multiverse = true
		saveAchievements()
	}
	if(!newsTrophies.antimatter&&newsArray[nextMsgIndex][2].substring(0,2)=="ra") {
		newsTrophies.antimatter = true
		saveAchievements()
	}
	if(!newsTrophies.chanceMaker&&newsArray[nextMsgIndex][2].substring(0,2)=="rc") {
		newsTrophies.chanceMaker = true
		saveAchievements()
	}
  
	scrollTimeouts.forEach(function(v) {clearTimeout(v);});
	scrollTimeouts = [];

	s.innerHTML = newsArray[nextMsgIndex][0];

	let parentWidth = s.parentElement.clientWidth;

	s.style.transition = '';
	s.style.transform = 'translateX('+parentWidth+'px)';

	scrollTimeouts.push(setTimeout( function() {
		let dist = s.parentElement.clientWidth + s.clientWidth + 20;
		let rate = 100; 
		let transformDuration = dist / rate;

		s.style.transition = 'transform '+transformDuration+'s linear';
		let textWidth = s.clientWidth;
		s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
		scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
	}, 100));
}

scrollNextMessage();