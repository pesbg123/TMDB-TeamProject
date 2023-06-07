// HK 날씨 api 연동

// "getJSON"이라는 이름의 함수를 정의합니다. 이 함수는 URL과 콜백 함수를 매개변수로 받습니다.
const getJSON = function (url, callback) {
  // XMLHttpRequest 객체를 생성합니다.
  const xhr = new XMLHttpRequest();

  // 지정된 URL에 대해 GET 요청을 초기화합니다.
  xhr.open("GET", url, true);

  // 응답 타입을 JSON으로 설정합니다.
  xhr.responseType = "json";

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
};

// getJSON 함수를 특정 URL과 콜백 함수와 함께 호출합니다.
getJSON(
  "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=422dd398517306d431dfd5cf0f9b9744&units=metric",
  function (err, data) {
    // 오류가 있는지 확인합니다 (첫 번째 인수가 null이 아닌 경우).
    if (err !== null) {
      // 오류 코드를 포함한 오류 메시지가 있는 경고(alert)을 표시합니다.
      alert("예상치 못한 오류 발생." + err);
    } else {
      // 데이터 객체에서 현재 온도, 최고 기온 및 최저 기온을 추출하여 경고창(alert)에 표시합니다.
      alert(`현재 온도는 ${data.main.temp}° 입니다.
  오늘의 최고기온은 ${data.main.temp_max}°, 최저기온은 ${data.main.temp_min}° 입니다.`);
    }
  }
);
