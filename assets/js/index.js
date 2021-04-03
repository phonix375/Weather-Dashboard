var apiKeyWeather = '1e40570c5898e87049be7d53d8cf71ad'  // Weather
//https://openweathermap.org/api/one-call-api
var apiKeyLocation = '2a79a275b252f6434ea415eacc240938'  //location
//https://positionstack.com/quickstart


var apiLocation2 = 'pk.6d18291442dc98e3db6f70a9365ff4de'
var searchForm = document.querySelector('#search');


var daysForcasr = function(data){
    console.log(data);
    var forcasrDiv = $('.forcast');
    $(forcasrDiv).html('');
    $(forcasrDiv).append($('<h2>').text('5-Day Forcast : '));
    for(var i = 1 ; i < 6; i++){
        var unixTimestamp =  data.daily[i].dt;
        var milliseconds = unixTimestamp * 1000;
        var dateObject = new Date(milliseconds);
        var dd = dateObject.getDate();
        var mm = dateObject.getMonth()+1; 
        var yyyy = dateObject.getFullYear();
        if(dd<10) {
            dd='0'+dd;
        } 
        if(mm<10) {
            mm='0'+mm;
        }
        
        var card = $('<div>').addClass('card').attr('style','width:20%;')
        var cardHeader = $('<div>').addClass('card-header').text(`${dd}/${mm}/${yyyy}`);
        var icon = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
        var img = $('<img>').attr('src',icon);
        var cardTable = $('<ul>').addClass('list-group list-group-flush').html(` 
        <li class="list-group-item">Temp : H${data.daily[i].temp.min} L${data.daily[i].temp.max}</li>
        <li class="list-group-item">Wind : ${data.daily[i].wind_speed}</li>
        <li class="list-group-item">humidity : ${data.daily[i].humidity}</li>`);
        $(card).append(cardHeader);
        $(card).append(img);
        $(card).append(cardTable);
        $(forcasrDiv).append(card);
    }
}

var getWeather = function(lat,lon,city){
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}&units=metric`).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var currentTemp = data.current.temp;
                var humidity = data.current.humidity;

                var windSpeed = data.current.wind_speed;
                var uvIndex = data.current.uvi;
                var unixTimestamp =  data.current.dt;
                var milliseconds = unixTimestamp * 1000;
                var dateObject = new Date(milliseconds);
                var dd = dateObject.getDate();
                var mm = dateObject.getMonth()+1; 
                var yyyy = dateObject.getFullYear();
                if(dd<10) {
                    dd='0'+dd;
                } 
                if(mm<10) {
                    mm='0'+mm;
                }
                var div = document.createElement('div');
                div.innerHTML = `<p>Temp : ${currentTemp} C</p> <p>Wind:${windSpeed} KM/h</p><p>Humidity : ${humidity}%</p><p>UV Index : ${uvIndex}</p>`;
                var icon = document.createElement('img');
                icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
                var currentDiv = document.querySelector('#current');
                currentDiv.innerHTML = '';
                var h1 = document.createElement('h4');
                h1.textContent = city + ` (${dd}/${mm}/${yyyy})`;
                h1.append(icon);
                currentDiv.appendChild(h1);
                currentDiv.appendChild(div);
                
                currentDiv.appendChild(div);
                daysForcasr(data);

            })
        }else{
            alert('no good' + response);
        }
    })
}
var saveToHistory = function(city){
    var searchHistory = $('#searchHistory');
    var div = document.createElement('div');
    var button = document.createElement('button');
    button.classList = 'btn btn-secondary';
    button.textContent = city;
    button.setAttribute('data-city',city);
    div.classList= 'historyBtn';
    div.appendChild(button);
    $(searchHistory).append(div);
}
var searchForAddress = function(city){
    fetch(`https://us1.locationiq.com/v1/search.php?key=${apiLocation2}&q=${city}&limit=1&accept-language=&format=json`).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var lat = data[0].lat;
                var lon = data[0].lon;
                city = city.toLowerCase();
                city = city[0].toUpperCase() + city.substring(1);
                getWeather(lat,lon, city);
                saveToHistory(city);
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

document.querySelector('#searchHistory').addEventListener('click', function(event){
    var clickOn = event.target.dataset.city;
    searchForAddress(clickOn);
});




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