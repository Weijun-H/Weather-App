window.addEventListener('load', () => {
    let long;
    let lat;
    const APIKEY = '7756a0801b04c87fea909d322851fbd0';
    let temperaturDescription = document.querySelector(".temperature-description");
    let temperaturDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=imperial`;

            fetch(api).then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const summary = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const temperature = data.main.temp;
                    //Set DOM Elements from the API
                    temperaturDegree.textContent = temperature;
                    temperaturDescription.textContent = summary;
                    locationTimezone.textContent = data.name;

                    //FORUMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);

                    console.log(temperature);
                    setIcons(icon);

                    //Change temperature toClesius/Fareheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperaturDegree.textContent = Math.floor(celsius);

                        } else {
                            temperatureSpan.textContent = "F";
                            temperaturDegree.textContent = temperature;
                        }
                    })
                });

        });
    }

    function setIcons(icon) {
        var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.getElementById('wicon').src = iconurl;
    }
});