var newsArray;

function updateNewsArray() {
newsArray = [
//no condition
["We're no strangers to love, you know the rules and so do I. A full commitment's what I'm thinking of... You wouldn't get this from any other guy. I just wanna tell you how I'm feeling... Gotta make you understand. Never gonna give you up. Never gonna let you down. Never gonna run around and desert you. Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you",true],
["Here is a consolation prize for you... Do you feel consoled yet?",true],
["Hey, you can suggest more news on our discord!",true],
["Ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ora ORA!",true],
["The cake is probably a lie",true],
["That will probably not be fixed",true],
["What do you mean that's not how you're suposed to use news tickers?",true],
["Lore - Never coming.",true],
["It's actually not that hard to get the same news ticker multiple times",true],
["Bro, I have news...",true],
["Only the truth here",true],
["News ticker, now with extra references!",true],
["Dev forgot to put copypastas on the news",true],
["xd - the dev, anytime he sends a message",true],
["No, don't put a cat on a box with radioactive stuff and explosives",true],
["News ticker 1, looking at the big numbers 1123581321345589144233377610987",true],
//news
["Breaking news: The entity known as \"You\" just turned one more idleverse into a cookie production machine, our scientists are now scared of cookies", true],
["Breaking news: Idleverse made of antimatter somehow surpassed infinity, scientists worry it might overflow", true],
["Breaking news: A rocket was detected flying near our idleverse at speeds beyond the infinite barrier",true],
["Fixing news: Low levels of antimatter were detected on the news ticker, we aren't working on the issue",true],
["Breaking news: The dev was found playing another idle game instead of working on his own, the server moderation is trying to make him stop doing references on the breaking news",true],
["Breaking news: The dev was found cutting virtual grass, he is probably training to touch real one",true],
["Breaking news: Dev was found coding on notepad++, he is now under search from all visual studio users",true],
["Breaking news: The next update will be released in:",true],
["Breaking news: Illegal cookie mine was discovered and destroyed - The cookie entity is not pleased, but it is busy cloning itself",true],
["Breaking news: Random person appeared out of a portal, killed half the city's slime population, and left in another portal a couple hours later",true],
["Breaking news 2: The Return of The Broken News",true],
//condition
["You got over a trillion points, here a free cookie",idleData.points>10**12],
["A friend asks why you need so many points... He is no longer your friend.",idleData.points>10**9],
["You broke the local record! Wait, what do you mean there was no highscore?",idleData.highscore>10**6],
//["",true],
["Hello world!",true]
];}

var s = document.getElementById('news');
var scrollTimeouts = [];
var nextMsgIndex;
function scrollNextMessage() {
  updateNewsArray();
  try {
    do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]))
  } catch(e) {
      console.log("news id " + nextMsgIndex + "is broken :p")
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  s.textContent = newsArray[nextMsgIndex][0];

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