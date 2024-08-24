const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
	
	const APIkey = 'cb7a6fe874df29282c722f5bdd6e2c81';
	const city = document.querySelector('.search-box input').value;
	
	if(city == '')
		return;
	
	fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}').then(response => response.json()).then(json => {
		if (json.cod == '404') {
			cityhide.textContent = city;
			container.style.height = '400px';
			weatherBox.classList.remove('active');
			weatherDetails.classList.remove('active');
			error404.classList.add('active');
			return;
		}
		
		const image = document.querySelector('.weather-box img');
		const temperature = document.querySelector('.weather-box .temperature');
		const description = document.querySelector('.weather-box .description');
		const humidity = document.querySelector('.weather-details .humidity span');
		const wind = document.querySelector('.weather-details .wind span');
		
		if (cityhide.textContent == city ) {
			return;
		}
		else{
			cityhide.textContent = city;
			
			container.style.height = '555px';
			container.classList.add('active');
			weatherDetails.classList.add('active');
			error404.classList.remove('active');
			
			setTimeout(() => {
				container.classList.remove('active');
			},2500);
			
			switch(json.weather[0].main){
				case 'Clear':
					image.src ='images/clear.png';
					break;

				case 'Rain':
					image.src = 'images/rain.png';
					break;

				case 'Snow':
					image.src ='images/snow.png';
					break;

				case 'Clouds':
					image.src ='images/cloud.png';
					break;

				case 'Mist':
					image.src ='images/mist.png';
					break;

				case 'Haze':
					image.src ='images/mist.png';
					break;
				
				default:
					image.src='images/cloud.png';
				}
				temperature.innerHTML = '${parseInt(json.main.temp)}<span>°C</span>';
				description.innerHTML = '${json.weather[0].description}';
				humidity.innerHTML = '${json.main.humidity}%';
				wind.innerHTML = '${parseInt(json.wind.speed)}km/h';
				
				
				const infoweather = document.querySelector('.info-weather');
				const infohumidity = document.querySelector('.info-humidity');
				const infowind = document.querySelector('.info-wind');
		
				const elCloneInfoWeather = infoweather.cloneNode(Node);
				const elCloneInfoHumidity = infohumidity.cloneNode(Node);
				const elCloneInfoWind = infowind.cloneNode(Node);
				
				
				elCloneInfoWeather.id = 'Clone-info-weather';
				elCloneInfoWeather.classList.add =('active-clone');
		
				elCloneInfoHumidity.id = 'Clone-info-humidity';
				elCloneInfoHumidity.classList.add =('active-clone');
		
				elCloneInfoWind.id = 'Clone-info-wind';
				elCloneInfoWind.classList.add =('active-clone');
				
				setTimeout(() => {
					infoweather.insertAdjacentElement("afterend",elCloneInfoWeather);
					infohumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
					infowind.insertAdjacentElement("afterend",elCloneInfoWind);
				},2200);

				const cloneInfoweather = document.querySelectorAll('.info-weather.active-clone');
				const totalcloneinfoweather = cloneInfoweather.length;
				const cloneInfoweatherfirst = cloneInfoweather[0];
				
				const cloneinfohumidity = document.querySelectorAll('.info-humidity .active-clone');
				const cloneinfohumidityfirst = cloneinfohumidity[0];
		
				const cloneinfowind = document.querySelectorAll('.info-wind .active-clone');
				const cloneinfowindfirst = cloneinfowind[0];
				
				if (totalcloneinfoweather > 0 ) {
					cloneInfoweatherfirst.classList.remove('active-clone');
					cloneinfohumidityfirst.classList.remove('active-clone');
					cloneinfowindfirst.classList.remove('active-clone');
					
					setTimeout(() => {
						cloneInfoweatherfirst.remove();
						cloneinfohumidityfirst.remove();
						cloneinfowindfirst.remove();
					},2200);
				}
			}
		});
});	