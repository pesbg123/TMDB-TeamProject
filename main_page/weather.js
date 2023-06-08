// "getJSON"이라는 이름의 함수를 정의합니다. 이 함수는 URL과 콜백 함수를 매개변수로 받습니다.
function getJSON(url, callback) {
  // XMLHttpRequest 객체를 생성합니다.
  const xhr = new XMLHttpRequest();

  // 지정된 URL에 대해 GET 요청을 초기화합니다.
  xhr.open('GET', url, true);

  // 응답 타입을 JSON으로 설정합니다.
  xhr.responseType = 'json';

  // "load" 이벤트에 대한 이벤트 리스너를 정의합니다. 이 이벤트는 요청이 완료되었을 때 발생합니다.
  xhr.onload = function () {
    // 응답의 상태 코드를 가져옵니다.
    const status = xhr.status;

    // 상태 코드가 200인 경우 (성공적인 요청을 의미함) 콜백 함수를 호출합니다.
    if (status === 200) {
      // 첫 번째 인수로 null (오류 없음)을 전달하고, 두 번째 인수로 JSON 응답을 파싱한 결과를 전달합니다.
      callback(null, xhr.response);
    } else {
      // 상태 코드가 200이 아닌 경우 콜백 함수를 호출합니다. 첫 번째 인수로 상태 코드를 전달하고, 두 번째 인수로 JSON 응답을 전달합니다 (있는 경우).
      callback(status, xhr.response);
    }
  };

  // 요청을 보냅니다.
  xhr.send();
}

// "displayWeather"라는 이름의 함수를 정의합니다. 이 함수는 날씨 정보를 표시합니다.
function displayWeather(weatherData) {
  const temperature = weatherData.main.temp;
  const tempMax = weatherData.main.temp_max;
  const tempMin = weatherData.main.temp_min;

  // 날씨 정보를 표시할 HTML 요소를 선택합니다.
  const weatherContainer = document.getElementById('weather-container');

  // 날씨 정보를 표시할 새로운 HTML 요소를 생성합니다.
  const weatherInfo = document.getElementById('weather-container');
  weatherInfo.innerHTML = `현재 온도: ${temperature}°<br>
  최고기온: ${tempMax}°, 최저기온: ${tempMin}°`;

  // 날씨 정보를 HTML 요소에 추가합니다.
  weatherContainer.appendChild(weatherInfo);
}

// getJSON 함수를 특정 URL과 콜백 함수와 함께 호출합니다.
getJSON(
  'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=422dd398517306d431dfd5cf0f9b9744&units=metric',
  function (err, data) {
    if (err !== null) {
      // 오류가 발생한 경우에 대한 처리를 수행합니다.
      console.log('예상치 못한 오류 발생: ' + err);
    } else {
      // 날씨 정보를 HTML에 표시하는 함수를 호출합니다.
      displayWeather(data);
    }
  }
);
