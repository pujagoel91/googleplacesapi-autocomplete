const api = {
	key: "bff06cdb42994571cf3e664ad94824d1",
	base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let err = document.querySelector('.error');
let city = document.querySelector('.location .city');
let currentdate = new Date();
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let wc = document.querySelector('.current .weather');
let hilo = document.querySelector('.current .hilo');

function setQuery(evt) {
	if(evt.keyCode == 13) {  //13 is for enter key
		if(searchbox.value.split(",").length - 1 < 3) {
			err.innerText = '';
			if(searchbox.value.split(',')[1].length-1 > 2 || searchbox.value.split(',')[2].length-1 > 3) {
				getResults(searchbox.value.split(',')[0]);
				console.log(searchbox.value.split(',')[0]);
			} else {
				getResults(searchbox.value);
				console.log(searchbox.value);
			}
			
			
			
		} else {			
			err.innerText = 'Input should be of the format City, State [2 digit code], Country [2 digit code]';
			city.innerText = '--';
			date.innerText = dateBuilder(currentdate);
			temp.innerText = '--';
			wc.innerText = '--';
			hilo.innerText = '--/--';
		}	
		
		
	} 	
}

function getResults(city) {
	fetch(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
	.then(weather => {
		return weather.json();
	}).then(displayResults);
}

function displayResults(weather) {
	console.log(weather);
	if(weather.cod == '404') {
		err.innerText = weather.message;
		city.innerText = '--';
		date.innerText = dateBuilder(currentdate);
		temp.innerText = '--';
		wc.innerText = '--';
		hilo.innerText = '--/--';
	} else {
		city.innerText = `${weather.name}, ${weather.sys.country}`;
		date.innerText = dateBuilder(currentdate);
		temp.innerText = `${Math.round(weather.main.temp)}`+ '°F';
		wc.innerText = `${weather.weather[0].main}`;
		hilo.innerText = `${Math.round(weather.main.temp_min)}` + '°F' +'/' + `${Math.round(weather.main.temp_max)}`+ '°F';
	}
		
}

function dateBuilder(d) {
	let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	
	return `${day}, ${date} ${month} ${year}`;
}


