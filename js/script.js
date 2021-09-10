document.querySelector('#search').addEventListener("submit", async(event) => {
  event.preventDefault();

  let input = document.querySelector('#inCidade').value;
  
  if(input !== '') {
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=df8f9ed4f98bda6565053a46641e427f&units=metric&lang=pt-br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        tempMin: json.main.temp_min,
        tempMax: json.main.temp_max
      });
    } else {
      clearInfo();
      showWarning('Não encontramos essa localização.')
    }
  } else {
    clearInfo();
  }
  //console.log(json)
});

function showInfo(json) {
  showWarning('');

  document.querySelector('.title-city').innerHTML = `${json.name}`;
  document.querySelector('.card-city__item2').innerHTML = `${json.country}`;

  document.querySelector('.card-img img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.card__info-item1').innerHTML = `Máx: ${json.tempMax}`;
  document.querySelector('.card__info-item2').innerHTML = `Min: ${json.tempMin}`;
  document.querySelector('.card__info-item3').innerHTML = `Vento: ${json.windSpeed} km/h`;
  document.querySelector('.card__info2').innerHTML = `${Math.floor(json.temp)} <sup>ºC</sup>`;

  document.querySelector('.container-card').style.display = 'flex';
}

function clearInfo() {
  showWarning('');
  document.querySelector('.container-card').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}