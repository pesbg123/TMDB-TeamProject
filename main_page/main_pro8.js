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
const apiKey = 'e9bb92f648d4191155d17c8e43f25e68&language=ko';

const popular = 'https://api.themoviedb.org/3/movie/popular?';
const NowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?';
const TopRated = 'https://api.themoviedb.org/3/movie/top_rated?';
const Upcoming = 'https://api.themoviedb.org/3/movie/upcoming?';
// 영화카드
const movieCardBox = document.getElementById('cards-box');
// 카테고리 목록
const popularTab = document.getElementById('popular-category');
const nowPlayingTab = document.getElementById('nowplaying-category');
const topRatedTab = document.getElementById('toprate-category');
const upcomingTab = document.getElementById('upcoming-category');
// 검색버튼과, 검색창
const clickButton = document.getElementById('click-btn');
const searchBox = document.getElementById('search-box');

// 카테고리별 영화를 눌렀을때 기존에 보여주던 카드들을 지워주고 해당 무비 리스트를 보여주게 하는 함수 입니다.
const cardsRemove = (MovieUrl) => {
  movieCardBox.textContent = '';
  url(MovieUrl);
};
// header H1
const MainH1 = document.getElementById('mainH1');

// 영화 목록을 가져와서 붙여주는 함수입니다.
const showMovieList = (moviesUrl, options) => {
  fetch(moviesUrl, options) // 위에 미리 상수 안에 할당했기때문에 더 효율적이라고 느꼈습니다.
    .then((response) => response.json()) // 데이터를 자바스크립트에서 사용하기 위해 JSON형식으로 변환시켰습니다.
    .then((data) => {
      let rows = data['results'];

      rows.forEach((item) => {
        let movieTitle = item['title'];
        let movieDesc = item['overview'];
        let movieRate = item['vote_average'];
        let movieImg = item['poster_path'];
        let movieId = item['id'];

        let temp_html = `<div class="col" style="color: white">
                           <div class="solo-card" style="background-color: rgb(58, 58, 57)">
                               <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                  class="card-img-top" id="cardPost-${movieId}"/>
                               <div class="card-body" id="desc-body-${movieId}">
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

        // id띄워주는 이벤트
        const clickCardBox = document.getElementById(`cardPost-${movieId}`);
        clickCardBox.addEventListener('click', () => clickCard(movieId));
        // 상세페이지 넘어가는 이벤트
        const clickDescBox = document.getElementById(`desc-body-${movieId}`);
        clickDescBox.addEventListener('click', () => clickDesc(movieId));
      });
    });
};

// 각 카드 이미지들을 클릭할때 해당 영화의 id를 매개변수로 받아 화면에 출력하는 함수 입니다.
const clickCard = (movieId) => alert(`id: ${movieId}`);
// 각 카드 설명을 클릭할때 해당 영회의 개인 페이지로 넘어가는 함수 입니다.
const clickDesc = () => window.open('/sub_page/sub_pro8.html');

// 동적으로 api url을 매개변수로 받을 수 있게 만들었습니다.
const url = (url) => showMovieList(url + 'api_key=' + apiKey, options);

// 웹사이트에 접속하자마자 popular 카테고리의 영화 목록을 출력하게 함수를 호출합니다.
url(TopRated);

// popular카테고리 클릭시 해당 영화 리스트 출력되는 이벤트입니다.
popularTab.addEventListener('click', () => cardsRemove(popular));
nowPlayingTab.addEventListener('click', () => cardsRemove(NowPlaying));
topRatedTab.addEventListener('click', () => cardsRemove(TopRated));
upcomingTab.addEventListener('click', () => cardsRemove(Upcoming));

// 사용자가 영화를 검색할 때 호출되는 함수입니다. !! 공백을 인식하기 때문에 검색에 주의가 필요합니다.
// 입력된 input과 맞는 영화 제목을 필터링하고, 일치하는 영화들만 화면에 추가합니다.
// 마지막 부분은 검색 버튼과 검색 입력 상자에 이벤트를 등록하는 부분입니다.
const searchMovie = () => {
  const searchBoxValue = document.getElementById('search-box').value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko&query=${searchBoxValue}`;

  fetch(searchUrl, options)
    .then((response) => response.json())
    .then((data) => {
      const results = data['results'];
      if (results.length === 0) {
        alert('일치하는 검색 결과를 찾을 수 없습니다.');
      } else {
        movieCardBox.textContent = '';

        results.forEach((item) => {
          const movieTitle = item.title;
          const movieDesc = item.overview;
          const movieRate = item.vote_average;
          const movieImg = item.poster_path;
          const movieId = item.id;

          const temp_html = `<div class="col" style="color: white">
                                <div class="solo-card" style="background-color: rgb(58, 58, 57)">
                                    <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                      class="card-img-top" id="cardPost-${movieId}"/>
                                    <div class="card-body">
                                      <h2 class="card-title">${movieTitle}</h5>
                                      <p class="${textColor(
                                        movieRate
                                      )}">${movieRate}</p>
                                      <p class="card-text">${movieDesc}</p>
                                  </div>
                              </div>
                          </div>`;

          movieCardBox.insertAdjacentHTML('beforeend', temp_html);
          // id띄워주는 이벤트
          const clickCardBox = document.getElementById(`cardPost-${movieId}`);
          clickCardBox.addEventListener('click', () => clickCard(movieId));
          // 상세페이지 넘어가는 이벤트
          const clickDescBox = document.getElementById(`desc-body-${movieId}`);
          clickDescBox.addEventListener('click', () => clickDesc(movieId));
        });
      }
    });
};

clickButton.addEventListener('click', searchMovie);
// 엔터키를 눌러도 버튼을 누른것처럼 동작
searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});

// 사이트의 hearder h1부분 사이트 이름을 클릭하면 새로고침되는 함수입니다.
// ex) 존윅을 검색하면 존윅 영화만 카드로 붙습니다. 다시 메인페이지로 돌아기 위해 클릭합니다ㅏ.
const main = () => {
  window.location.reload();
};
// main함수 온클릭 이벤트 지정
MainH1.addEventListener('click', main);

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
