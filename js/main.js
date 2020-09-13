//make sure service worker is supported
if('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('../cache.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log('Service Worker: Error: ${err}'))

    })
}
const api = {
    key: "0c0fe17bfa00f393ed29b28a0f728897",
    base: "https://api.openweathermap.org/data/2.5/"
}
let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt){
    if (evt.keyCode === 13) {
        getResults (searchbox.value); 
       
    };
};

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}
function displayResults (weather) {
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(today);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºc</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}ºc/  ${Math.round(weather.main.temp_max)}ºc`;
}
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "JUly", "Augast", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

localStorage.setItem("search-box", "date");
let val = localStorage.getItem('search-box');
console.log(val);

