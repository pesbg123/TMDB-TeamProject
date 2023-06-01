// 바닐라 자바스크립트로 영화 목록을 보여주는 웹 페이지 기능 구현하기 !!!

//  api요청을 편하게 하기 위해서 필요한 옵션들을 options 상수 안에 할당했습니다.
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0',
  },
};

// TMDB api key도 마찬가지로 apiKey라는 상수에도 할당했습니다.
// options과 마찬가지로 바뀔 필요가 없다고 생각했기에 const로 선언하였습니다.
const apiKey =
  'https://api.themoviedb.org/3/movie/popular?api_key=e9bb92f648d4191155d17c8e43f25e68&language=ko';

// 영화 목록을 TMDB에서 가져온뒤 웹 페이지에 보여주는 역할을 하는 함수입니다.
function showMovieList() {
  // fetch 함수를 사용해서 API 요청을 보냅니다.
  fetch(apiKey, options) // 위에 미리 상수 안에 할당했기때문에 더 효율적이라고 느꼈습니다.
    .then((response) => response.json()) // 데이터를 자바스크립트에서 사용하기 위해 JSON형식으로 변환시켰습니다.
    .then((data) => {
      let rows = data['results'];
      const movieCardBox = document.getElementById('cards-box');
      rows.forEach((item) => {
        let movieTitle = item['title'];
        let movieDesc = item['overview'];
        let movieRate = item['vote_average'];
        let movieImg = item['poster_path'];
        let movieId = item['id'];

        // 영화 정보를을 HTML 템플릿 문자열로 만들어서,
        // 웹 페이지에 추가하고, 클릭 이벤트를 등록해줍니다.
        let temp_html = `<div class="col" style="color: white">
                           <div class="solo-card" id="cardPost-${movieId}" style="background-color: rgb(58, 58, 57)">
                               <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                  class="card-img-top"/>
                               <div class="card-body">
                                  <h2 class="card-title">${movieTitle}</h5>
                                  <p class="${textColor(
                                    movieRate
                                  )}">${movieRate}</p>
                                  <p class="card-text">${movieDesc}</p>
                              </div>
                          </div>
                      </div>`;
        // insertAdjacentHTML() 메소드를 사용하여 movieCardBox 요소에 temp_htm을 동적으로 추가합니다.
        // beforeend는 movieCardBox 요소의 마지막 자식 요소로 추가하라는 의미입니다.
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = document.getElementById(`cardPost-${movieId}`);
        clickCardBox.addEventListener('click', () => clickCard(movieId));
      });
    });
}

// 각 카드들을 클릭할때 해당 영화의 id를 매개변수로 받아 화면에 출력하는 함수 입니다.
function clickCard(movieId) {
  alert(`id: ${movieId}`);
}

// showMovieList() 함수를 호출합니다. 이로써 웹 페이지에 접속하게되면 바로 카드목록을 보여줄 수 있습니다.
showMovieList();

// 사용자가 영화를 검색할 때 호출되는 함수입니다. 입력된 input과 맞는 영화 제목을 필터링하고, 일치하는 영화들만 화면에 추가합니다.
// 마지막 부분은 검색 버튼과 검색 입력 상자에 이벤트를 등록하는 부분입니다.
function searchMovie() {
  const searchBox = document.getElementById('search-box').value;
  const movieCardBox = document.getElementById('cards-box');

  fetch(apiKey, options)
    .then((response) => response.json())
    .then((data) => {
      let results = data['results'];
      if (searchBox.length === 0) {
        alert('한 글자 이상 입력하세요'); // 사용자가 입력을 안하고 버튼만 눌렀을때 예외처리
      }
      const filteredResults = results
        .map((item) => ({
          // 가져온 데이터들을 편하게 사용하기 위해서 map을 사용하여
          // 키 값을 지정하여 객체화시켰습니다.
          movieTitle: item['title'],
          movieDesc: item['overview'],
          movieRate: item['vote_average'],
          movieImg: item['poster_path'],
          movieId: item['id'],
        }))
        .filter((movie) =>
          movie.movieTitle // 영화 제목과 사용자가 입력한 input이 일치하는 항목을 찾습니다.
            .toLowerCase() // 영화 제목, 사용자 input을 소문자로 변환 (includes 메소드는 대소문자를 구별하기 때문)
            .replace(/ /g, '') // 사용자가 띄어쓰기를 안 했을때도 검색이 잘 되게 영화제목을 공백제거.
            .includes(searchBox.replace(/ /g, '').toLowerCase())
        );
      if (filteredResults.length === 0) {
        alert('일치하는 검색 결과가 없습니다'); // api를 사용하여 가져온 데이터들 중 사용자가 검색한 항목이 없는경우 예외처리
        window.location.reload();
      }
      movieCardBox.textContent = ''; // movieCardBox안의 text 요소들을 지워주기 위해 사용했습니다.
      filteredResults.forEach((movie) => {
        let temp_html = `<div class="col" style="color: white">
                            <div class="solo-card" id="cardPost-${
                              movie.movieId
                            }" style="background-color: rgb(58, 58, 57)">
                                <img src="https://image.tmdb.org/t/p/w500${
                                  movie.movieImg
                                }"
                                  class="card-img-top"/>
                                <div class="card-body">
                                  <h2 class="card-title">${
                                    movie.movieTitle
                                  }</h5>
                                  <p class="${textColor(movie.movieRate)}">${
          movie.movieRate
        }</p>
                                  <p class="card-text">${movie.movieDesc}</p>
                              </div>
                          </div>
                      </div>`;
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = document.getElementById(
          `cardPost-${movie.movieId}`
        );
        clickCardBox.addEventListener('click', () => clickCard(movie.movieId));
      });
    });
}

// clickButton 요소를 클릭하거나
// searchBox 요소에서 Enter 키를 누르면 searchMovie() 함수가 호출됩니다.
const clickButton = document.getElementById('click-btn');
clickButton.addEventListener('click', searchMovie);

const searchBox = document.getElementById('search-box');
searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});

// 사이트의 hearder부분 사이트 이름을 클릭하면 새로고침되는 함수입니다. 이벤트는 html에 짧게 적었습니다.
// ex) 존윅을 검색하면 존윅 영화만 카드로 붙습니다. 다시 메인페이지로 돌아기 위해 클릭합니다ㅏ.
const main = () => {
  window.location.reload();
};

// 영화 평점에 따라 적절한 텍스트 색상을 반환하는 함수입니다.
// 8 이상이면 초록색, 5 이상이면 주황색, 그 외에는 빨간색을 반환합니다.
function textColor(rate) {
  if (rate >= 8) {
    return 'green';
  } else if (rate >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
