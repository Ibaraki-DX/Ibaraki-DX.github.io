const numType = localStorage.getItem("numType") || "long";
const rainbowSpeed = localStorage.getItem("rainbowSpeed") || 5000;
const autoClicker = localStorage.getItem('autoClicker') || false
const lg = localStorage.getItem('language') || 0
const isIndex = eval(location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "index.html"||location.pathname.substring(location.pathname.lastIndexOf("/") + 1) == "")
if(isIndex) {path = ""} else  path = "../"
function initThemeSelector(){
	const themeStylesheetLink = document.getElementById("themeStylesheetLink");
	const currentTheme = localStorage.getItem("theme") || "metal";
		
	function activateTheme(metal) {
		themeStylesheetLink.setAttribute("href", path+`design/css/themes/${metal}.css`)
		const elements = document.getElementsByClassName('animated');
		
		for(i=0; i<elements.length; i++){
			elements[i] = randomDigit()	
		if(metal == "corruption"){
			elements[i].classList.add('corruption')
		} else {
			elements[i].classList.remove('corruption')
		}
		if(metal == "crimson"){
			elements[i].classList.add('crimson')
		} else {
			elements[i].classList.remove('crimson')
		}
		if(metal=="matrix"){
			document.getElementById('matrixBackground').innerHTML = 
			`<span style="--i:13;"><span class="drop"></span></span>		
			<span style="--i:8;"><span class="drop"></span></span>
			<span style="--i:4;"><span class="drop"></span></span>	
			<span style="--i:21;"><span class="drop"></span></span>
			<span style="--i:15;"><span class="drop"></span></span>	
			<span style="--i:6;"><span class="drop"></span></span>			
			<span style="--i:19;"><span class="drop"></span></span>
			<span style="--i:24;"><span class="drop"></span></span>
			<span style="--i:7;"><span class="drop"></span></span>
			<span style="--i:18;"><span class="drop"></span></span>
			<span style="--i:30;"><span class="drop"></span></span>
			<span style="--i:12;"><span class="drop"></span></span>
			<span style="--i:9;"><span class="drop"></span></span>	
			<span style="--i:20;"><span class="drop"></span></span>	
			<span style="--i:10;"><span class="drop"></span></span>	
			<span style="--i:3;"><span class="drop"></span></span>	
			<span style="--i:28;"><span class="drop"></span></span>	
			<span style="--i:17;"><span class="drop"></span></span>
			<span style="--i:11;"><span class="drop"></span></span>
			<span style="--i:16;"><span class="drop"></span></span>
			<span style="--i:21;"><span class="drop"></span></span>
			<span style="--i:5;"><span class="drop"></span></span>
			<span style="--i:22;"><span class="drop"></span></span>	
			<span style="--i:35;"><span class="drop"></span></span>`
		} else {document.getElementById('matrixBackground').innerHTML = ""}
		if(metal == "dark"){
			elements[i].classList.add('dark')
		} else {
			elements[i].classList.remove('dark')
		}
		if(metal=="calm"){
			document.getElementById('lanterns').innerHTML = 
			`<span style="--i:10;"></span>		
			<span style="--i:13;"></span>
			<span style="--i:5;"></span>	
			<span style="--i:18;"></span>
			<span style="--i:19;"></span>	
			<span style="--i:15;"></span>			
			<span style="--i:26;"></span>
			<span style="--i:16;"></span>
			<span style="--i:9;"></span>
			<span style="--i:25;"></span>
			<span style="--i:23;"></span>
			<span style="--i:6;"></span>
			<span style="--i:17;"></span>
			<span style="--i:20;"></span>	
			<span style="--i:27;"></span>	
			<span style="--i:7;"></span>	
			<span style="--i:22;"></span>	
			<span style="--i:24;"></span>	
			<span style="--i:8;"></span>
			<span style="--i:21;"></span>
			<span style="--i:14;"></span>
			<span style="--i:28;"></span>
			<span style="--i:11;"></span>	
			<span style="--i:12;"></span>`
		} else {document.getElementById('lanterns').innerHTML = ""}
		if(metal=="hover"){
			coolGrid()
		} else{
			document.getElementById('hoverGrid').innerHTML = ''
			document.getElementById('hoverGrid').style.height = '0'			
		}

		}
		
	}
	activateTheme(currentTheme);
}	
		

function log(base, num){
if(base==2){return Math.log2(num)} else 
if(base==10){return Math.log10(num)} else
if(base=='e'){return Math.log(num)}
return Math.log(num)/Math.log(base)
}

function floor(num) {return Math.floor(num)}
function round(num) {return Math.round(num)}
function fixed(amt, num) {return num.toFixed(amt)}
function engiMantissa(exp, mant){return fixed(2, 10**(exp%3)*mant)}
function rng(min, max){
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max-min+1) + min)
}
function sumPATerms(term1, progression, n){
	return format((2*term1+progression*(n-1))*n/2)
}
function sumPGTerms(term1, progression, n){
	if(n==0) return 0
	if(progression == 1) return term1
	return (term1*(progression**n-1))/(progression-1)
}
function factorial(num){
	if(num == 0) {return 1}
	else return num*factorial(num-1)
}

function invert(x){return 1/x}

function format(number) {
	if(number<0) return "-"+format(-number)
	if(!isFinite(number)) return '&infin;'
	if(isNaN(number)) return '?'
	let exponent = floor(log(10, number))
	let mantissa = number/10**exponent
	if (exponent < 3&&numType!="base2") return round(number)
	
	if (numType == "long") return round(number).toLocaleString('en-US')
	
	if (numType == "scientific") return fixed(2, mantissa) + "e" + exponent
	
	if (numType == "engineering") return engiMantissa(exponent, mantissa) + "e" + (floor(exponent / 3) * 3)
	
	if (numType == "base2"){
		exponent = floor(log(2, number))
		if(exponent < 8) return (number >>> 0).toString(2)
		buffer = 0;
		while (floor(exponent)>8){
			number/=2;
			buffer++;
			exponent = floor(log(2, number))
		}
		return (number >>> (exponent-7)).toString(2).replace("1","1.") +"b"+(exponent+buffer)
	}
	
	let order = floor(exponent/3)
		let numString = "";
	
	if (numType == "letter"){
		let letter = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
		do{
			numString = letter[order%26] + numString
			order=floor((order-order%26)/26)
		}while(order>=1);
		return engiMantissa(exponent, mantissa) + numString
	}
	
	if (numType == "compact"){
		order--
		if (order == 0) return fixed(2, (10**(exponent%3)*mantissa)) + " K"
		let ten = ["","Dc","Vg","Tri","Qua","Qui","Sex","Spt","Oct","Non"]
		let cent = ["","Cen","Du","Tre","Quad","Quin","Sexcen","Septin","Octin","Nongen"]
		do{
			if(order>3){uni = ["","Un","Duo","Tr","Qa","Qi","Sx","Sp","Oc","No"]} else {uni = ["","M","B","T","Qa","Qi","Sx","Sp","Oc","No"]}
			numString = "-"+uni[order%10]+ten[floor(order/10)%10]+cent[floor(order/100)%10]+numString
			order= floor(order/1000)
		} while(order>0)
		return engiMantissa(exponent, mantissa) + numString.replace("-"," ")
	}
	
	if(numType == "normal"){
		order--
		if (order <= 9){
			let basicName = ["Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion"]
			return engiMantissa(exponent,mantissa) + " " + basicName[order%10]
		} else{
		let ten = ["","Deci","Viginti","Triginti","Quadraginti","Quiquaginti","Sexaginti","Septaginti","Octaginti","Nonaginti"]
		let cent = ["","Centi","Duocenti","Trecenti","Quadringenti","Quingenti","Sexacenti","Septingenti","Octingenti","Nongenti"]
		do{
			if(order%1000>=0&&order%1000<=9) {uni = ["","Mi","Dumi","Trimi","Quadrimi","Quinmi","Sexmi","Septimi","Octimi","Nonimi"]} else {uni = ["","Un","Duo","Tres","Quattor","Quin","Sex","Sep","Octi","Noni"]}
			if(floor(order/10)%10==0&&floor(order/100)%10==0) {uni = ["","Mi","Bi","Tri","Quadri","Quinti","Sexti","Septi","Octi","Noni"]}
			if(order%1000==0) {uni[0] = "Ni"} else {uni[0] = ""}
			numString = uni[order%10]+ten[floor(order/10)%10]+cent[floor(order/100)%10]+"lli"+numString
			order= floor(order/1000)
		} while(order>0)
		return engiMantissa(exponent, mantissa) + " " + numString + "on"
		}
	
	}
	if (numType == "letter++"){
		let letter = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
		do{
			numString = letter[order%26] + numString
			order=floor((order-order%26)/26)
		}while(order>=1)
		let nDigit = numString.charAt(numString.length-1)
		if(nDigit=="A")
			numString+='bcillion'
		else
		if(nDigit=="B")
			numString+='azillion'
		else
		if(nDigit=="C")
			numString+='reatillion'
		else
		if(nDigit=="D")
			numString+='imensillion'
		else
		if(nDigit=="E")
			numString+='zillion'
		else
		if(nDigit=="F")
			numString+='illion'
		else
		if(nDigit=="G")
			numString+='azillion'
		else
		if(nDigit=="H")
			numString+='yllion'
		else
		if(nDigit=="I")
			numString+='nventillion'
		else
		if(nDigit=="J")
			numString+='illion'
		else
		if(nDigit=="K")
			numString+='rillion'
		else
		if(nDigit=="L")
			numString+='illion'
		else
		if(nDigit=="M")
			numString+='irillion'
		else
		if(nDigit=="N")
			numString+='eonillion'
		else
		if(nDigit=="O")
			numString+='mnillion'
		else
		if(nDigit=="P")
			numString+='erfectillion'
		else
		if(nDigit=="Q")
			numString+='uantillion'
		else
		if(nDigit=="R")
			numString+='oundillion'
		else
		if(nDigit=="S")
			numString+='illyon'
		else
		if(nDigit=="T")
			numString+='errarillion'
		else
		if(nDigit=="U")
			numString+='nobtillion'
		else
		if(nDigit=="V")
			numString+='eterillion'
		else
		if(nDigit=="W")
			numString+='iwillion'
		else
		if(nDigit=="X")
			numString+='illion'
		else
		if(nDigit=="Y")
			numString+='illion'
		else
		if(nDigit=="Z")
			numString+='illion'
		return engiMantissa(exponent, mantissa) + ' ' + numString
	}
}

function scientific(number){
	if(number<0) return "-"+scientific(-number)
	if(!isFinite(number)) return '&infin;'
	if(isNaN(number)) return '?'
	let exponent = floor(log(10, number))
	if (exponent < 3) return round(number)
	return fixed(2, number/10**exponent) + "e" + exponent
}

const playMusic = localStorage.getItem("music") || -1;
let musicVolume = localStorage.getItem("volume") || 1;
let jukebox = ["Placeholder",'Break the ice','Accordions of the Ether','Tranquil Tides']

if(playMusic == -2&&elem('musicSection')!=null) elem('musicSection').style.display = 'none'

function musicPlayer(){
	let music = playMusic
	if(music == -1){
		music = rng(0, jukebox.length-1)
	}
	document.getElementById("jukebox").innerHTML = `<audio loop autoplay id="mp3Player"> <source src="${path}design/music/${jukebox[music]}.mp3"></audio><button onClick="playnpause()" class="long" id="playnpause">Pause</button>`
	document.getElementById("textJukebox").innerHTML = `${jukebox[music]}<br><input type="range" id="volume-slider" class="long" min="0" max="10" value="${musicVolume*10}" style="border:0"><br><div id="volumeDisplay"></div>`
	
	document.getElementById("volumeDisplay").innerHTML = "Volume: " + musicVolume*10
	document.getElementById("mp3Player").volume = musicVolume
	document.getElementById('volume-slider').addEventListener("change", function(e) {
		localStorage.setItem("volume", e.currentTarget.value / 10)
		let musicVolume = localStorage.getItem("volume");
		document.getElementById("mp3Player").volume = musicVolume
		document.getElementById("volumeDisplay").innerHTML = "Volume: " + musicVolume*10
		if(!document.getElementById("mp3Player").paused&&localStorage.getItem("volume")>0) document.getElementById("mp3Player").play()
	})
}

function playnpause(){
	if (!document.getElementById("mp3Player").paused) {
		document.getElementById("mp3Player").pause()
		document.getElementById("playnpause").innerHTML = "Play"
	} else {
		document.getElementById("mp3Player").play()
		document.getElementById("playnpause").innerHTML = "Pause"
	}
}

function rainbowColor(){
	var r = document.querySelector(':root')
	var rs = getComputedStyle(r).getPropertyValue('--rainbow')
	if(rs=='#00f') {r.style.setProperty('--rainbow', '#0ff')} else
	if(rs=='#0ff') {r.style.setProperty('--rainbow', '#0f0')} else
	if(rs=='#0f0') {r.style.setProperty('--rainbow', '#ff0')} else
	if(rs=='#ff0') {r.style.setProperty('--rainbow', '#f00')} else
	if(rs=='#f00') {r.style.setProperty('--rainbow', '#f0f')} else
	if(rs=='#f0f') {r.style.setProperty('--rainbow', '#00f')}
}
var rainbowUpdate = window.setInterval(function(){rainbowColor()},rainbowSpeed)

const spanElements = document.getElementsByClassName('drop');

var matrixUpdate = window.setInterval(function(){
	for(i=0; i<spanElements.length; i++){
		spanElements[i].innerHTML = randomDigit()
	}	
},100) 

const fadeElements = document.getElementsByClassName('fade');

	for(i=0; i<fadeElements.length; i++){
		temp=fadeElements[i]
	temp.onanimationend = (event) => {temp.remove()}}

function addFade(element){
	element.classList.add("fade")
	element.onanimationend = (event) => {element.remove()}
}

function randomDigit(){
	digit = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]
	return digit[Math.floor(Math.random() * digit.length)]
}

function selfDestruct(id){
	id.remove()
}

function openTab(section, isGrid){
	var i, tabcontent;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].classList.remove('grid')
    tabcontent[i].style.display = "none";
	}
	if(isGrid) {document.getElementById(section).classList.add('grid');document.getElementById(section).style.display = 'grid'} else {document.getElementById(section).style.display = "block"}	
}

function factor(x){
	if(x>=Number.MAX_SAFE_INTEGER){return "this number is too big to be held by this function with accuracy"}
	if(!Number.isInteger(x)){return "this function can only handle integers"}
	if(x<4){return "please at least 4"}
	prime =[]
	if(x>10000){y=10000}else{y=x}
	primesTo(y).forEach(element => prime.push(element))
	i=0;
	n = "";
	exp = 0
	while(x>=1&&i<prime.length){
		if(x%prime[i]==0){
			x/=prime[i]
			exp++
		} else {
			if(exp>0) n+="("+prime[i]+"**"+exp+")*"
			i++
			exp = 0
		}
	}
	n = n.slice(0, -1)
	if(x>1){n+=" | couldnt handle (only primes up to 10000): " + x}
	return n
}

function primesTo(x){
	
	if(x<4) return "please at least 4"
	startTime=Date.now()
	wall = []
	primes = [2, 3]
	for(i=5;i<=x;i+=2) if(i%6==1||i%6==5) wall.push(i)

	function removeAllMultiple(y){
		i = 0
		while(i<wall.length){
			if(wall[i]%y==0) {
				wall.splice(i, 1)
			} else {
				i++
			}
		}
	}
	
	while(wall[0]<Math.sqrt(x)){
		primes.push(wall[0])
		removeAllMultiple(wall[0])
	}
	wall.forEach(element => primes.push(element))
	console.log(Date.now()-startTime+"ms")
	return primes
}

function isPrime(x){
	if(x>=Number.MAX_SAFE_INTEGER){return "this number is too big to be held by this function with accuracy"}
	if(!Number.isInteger(x)){return "this function can only handle integers"}
	if(x<4){return "please at least 4"}
	if(x%2){return false}
	primeCheck = true
	primes = primesTo(Math.sqrt(x))
	i=0
	while(i<primes.length&&primeCheck){
		if(x%primes[i]==0) primeCheck=false
		i++
	}
	
	return primeCheck
}


function coolGrid(){
	let x = Date.now()
	const niceGrid = document.getElementById('hoverGrid')
	niceGrid.style.setProperty('height','100%')
	niceGrid.style.setProperty('width','95vw')
	niceGrid.parentElement.style.height = '80vh'
	for(i=0;i<100;i++){
		niceGrid.innerHTML+=`<div class="hoverCell noBorders" id="`+i+`" onmouseover="coolGridHover('`+i+`')"></div>`
	}
	console.log((Date.now()-x)+'ms')
}

const gridHoverType = localStorage.getItem('gridHoverType') || 'drawing'

function coolGridHover(i){
	var r = document.getElementById(i)
	if(gridHoverType == 'random'){
	colors = ['#000','#101010','#661010','#666610','#106610','#106666','#101066','#661066','#666666']
	r.style.backgroundColor = colors[rng(0, colors.length)]	
	} else
	if(gridHoverType == 'drawing'){
	var rs = getComputedStyle(r).getPropertyValue('background-color')
	if(rs=='rgb(0, 0, 0)') {r.style.backgroundColor = '#661010'} else
	if(rs=='rgb(102, 16, 16)') {r.style.backgroundColor = '#666610'} else
	if(rs=='rgb(102, 102, 16)') {r.style.backgroundColor = '#106610'} else
	if(rs=='rgb(16, 102, 16)') {r.style.backgroundColor = '#106666'} else
	if(rs=='rgb(16, 102, 102)') {r.style.backgroundColor = '#101066'} else
	if(rs=='rgb(16, 16, 102)') {r.style.backgroundColor = '#661066'} else
	if(rs=='rgb(102, 16, 102)') {r.style.backgroundColor = '#666666'} else
	if(rs=='rgb(102, 102, 102)') {r.style.backgroundColor = '#101010'} else
	if(rs=='rgb(16, 16, 16)') {r.style.backgroundColor = '#000'}	
	}
}

//thanks jorgeblom and metatron, there is so much i still need to learn ;w;

function encrypt(string, key){
	
	let convertedString = (txt) => txt.split('').map((zero) => zero.charCodeAt()) 
	
	let applyKey = (code) => convertedString(key).reduce((a, b) => a^b, code)
	
	let hexConvert = (num) => ('0'+num.toString(16)).substr(-2);

	return string.split('').map(convertedString).map(applyKey).map(hexConvert).join('')
	
}

function decrypt(string, key){
	
	let convertedString = (txt) => txt.split('').map((zero) => zero.charCodeAt()) 
	
	let applyKey = (code) => convertedString(key).reduce((a, b) => a^b, code)
	
	return string.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applyKey).map((charCode) => String.fromCharCode(charCode)).join('')
}

function sure(){
	return confirm('Are you sure?\nPress "OK" to proceed')
}

function test(){
	if(location.pathname.substring(location.pathname.lastIndexOf('/')+1) != 'notsecret.html') return null
	jpCharacter = ['あ','い','う','え','お','か','き','く','け','こ','きゃ','きゅ','きょ','さ','し','す','せ','そ','しゃ','しゅ','しょ','た','ち','つ','て','と','ちゃ','ちゅ','ちょ','な','に','ぬ','ね','の','にゃ','にゅ','にょ','は','ひ','ふ','へ','ほ','ひゃ','ひゅ','ひょ','ま','み','む','め','も','みゃ','みゅ','みょ','や','ゆ','よ','ら','り','る','れ','ろ','りゃ','りゅ','りょ','わ','を','が','ぎ','ぐ','げ','ご','ぎゃ','ぎゅ','ぎょ','ざ','じ','ず','ぜ','ぞ','じゃ','じゅ','じょ','だ','ぢ','づ','で','ど','ぢゃ','ぢゅ','ぢょ','ば','び','ぶ','べ','ぼ','びゃ','びゅ','びょ','ぱ','ぴ','ぷ','ぺ','ぽ','ぴゃ','ぴゅ','ぴょ']
	ltCharacter = ['a','i','u','e','o','ka','ki','ku','ke','ko','kya','kyu','kyo','sa','shi','su','se','so','sha','shu','sho','ta','chi','tsu','te','to','cha','chu','cho','na','ni','nu','no','ne','nya','nyu','nyo','ha','hi','fu','he','ho','hya','hyu','hyo','ma','mi','mu','me','mo','mya','myu','myo','ya','yu','yo','ra','ri','ru','re','ro','rya','ryu','ryo','wa','wo','ga','gi','gu','ge','go','gya','gyu','gyo','za','ji','zu','ze','zo','ja','ju','jo','da','dji','dzu','de','do','dya','dyu','dyo','ba','bi','bu','be','bo','bya','byu','byo','pa','pi','pu','pe','po','pya','pyu','pyo']
	let digit = rng(0, jpCharacter.length-1)
	console.log(jpCharacter[digit])
	const input = prompt('Whats is this character sent on the console')
	return ('You said '+input+', it was '+ltCharacter[digit])
}

function timeConvert(ms){
	let week = floor(ms/(7*86400000))
	let day = floor((ms%(7*86400000))/86400000)
	let hr = floor((ms%86400000)/3600000)
	let min = floor((ms%3600000)/60000)
	let s = floor((ms%60000)/1000)
	ms = ms%1000
	return [ms,s,min,hr,day,week]
}

function lgTxt(id){
    try {return text[id][meta.lg]} catch {return items[id][meta.lg]}
}

function tax(start,percentage,fixed,duration){
	let x = start
	while(duration>0){
		x = x*(percentage/100+1)+fixed
		duration--
	}
	return x
}

function hide(element){
	element.style.display = 'none'
}

function elem(id){
	return document.getElementById(id)
}
function elemP(id){
	return elem(id).parentElement
}

function b3w(str,mode){
	let b3 = ['===','==+','==x','=+=','=++','=+x','=x=','=x+','=xx','+==','+=+','+=x','++=','+++','++x','+x=','+x+','+xx','x==','x=+','x=x','x+=','x++','x+x','xx=','xx+','xxx']
	let b27 = [' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	if(mode){
		str = str.toUpperCase().split('')
		for(i=0;i<str.length;i++){
			let found = false
			for(j=0;j<27&&!found;j++){
				if(str[i]==b27[j]){
					str[i] = b3[j]
					found = true
				}
			}
		}
		return str.join(' ')
	} else 
	str = str.split(' ')
	for(i=0;i<str.length;i++){
		let found = false
		for(j=0;j<27&&!found;j++){
			if(str[i]==b3[j]){
				str[i] = b27[j]
				found = true
			}
		}
	}
	return str.join('')
}

function timeToText(time){
	let tx = ''
	if(time[5]>0)
		tx+= time[5] + " weeks, "
	if(time[4]>0)
		tx+= time[4] + " days, "
	if(time[3]>0)
		tx+= time[3] + " hours, "
	if(time[2]>0)
		tx+= time[2] + " minutes and "
	tx+= time[1] + " seconds"
	return tx
}