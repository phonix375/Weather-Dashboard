var apiKeyWeather = '1e40570c5898e87049be7d53d8cf71ad'  // Weather
//https://openweathermap.org/api/one-call-api
var apiKeyLocation = '2a79a275b252f6434ea415eacc240938'  //location
//https://positionstack.com/quickstart
var searchForm = document.querySelector('#search');

var getWeather = function(lat,lon,city){
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}&units=metric`).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                var currentTemp = data.current.temp;
                var humidity = data.current.humidity;

                var windSpeed = data.current.wind_speed;
                var uvIndex = data.current.uvi;
                var unixTimestamp =  data.current.dt;
                var milliseconds = 1575909015 * 1000;
                var dateObject = new Date(milliseconds);
                var icon = document.createElement('img');
                icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
                var currentDiv = document.querySelector('#current');
                currentDiv.innerHTML = '';
                var h1 = document.createElement('h3');
                h1.textContent = city + ' (' + dateObject + ')';
                h1.append(icon);
                currentDiv.appendChild(h1);

            })
        }else{
            alert('no good' + response);
        }
    })
}

console.log('this is working');
var searchForAddress = function(city){
    console.log(city);
    fetch(`http://api.positionstack.com/v1/forward?access_key=${apiKeyLocation}&query=${city}`).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                console.log(data.data[0]);
                var lat = data.data[0].latitude;
                var lon = data.data[0].longitude;
                getWeather(lat,lon, city);
            })
        }else{
            alert('no good:'+ response);
        };
    })
}
searchForm.addEventListener('submit',function(event){
    event.preventDefault();
    searchForAddress(document.querySelector('#CityForSearch').value);
})




/*
recurces : 
weather api docs : 
https://openweathermap.org/api/one-call-api

test call to wwather api 
https://api.openweathermap.org/data/2.5/onecall?lat=32.066455&lon=34.783553&appid=1e40570c5898e87049be7d53d8cf71ad&units=metric

position documentation : 
https://positionstack.com/documentation
quick start guid 
https://positionstack.com/quickstart

test api call to  location api :
http://api.positionstack.com/v1/forward?access_key=2a79a275b252f6434ea415eacc240938&query=toronto
http://api.positionstack.com/v1/forward?access_key=2a79a275b252f6434ea415eacc240938&query=ramat%20gan





*/