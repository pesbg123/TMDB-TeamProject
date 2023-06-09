//export에 main함수 이동
import { main } from "../modules/export.js";

// JH TMDB-API 요청에 필요한 속성을 options 상수에 할당
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0",
  },
};

// SH 상세페이지 검색 url받아오기
const urlParamsSH = new URLSearchParams(window.location.search);
const sub_movieTitle = urlParamsSH.get("title");

// JH apiKey라는 상수에 TMDB API KEY 할당
const apiKey = "e9bb92f648d4191155d17c8e43f25e68";

// JH fetch 요청 날릴때 주소에 붙여줄 언어 지정 문자열
const language = "&language=ko";

// JH html요소 id를 각 상수에 할당
const movieCardBox = document.getElementById("cards-box");
const popularTab = document.getElementById("popular-category");
const nowPlayingTab = document.getElementById("nowplaying-category");
const topRatedTab = document.getElementById("toprate-category");
const upcomingTab = document.getElementById("upcoming-category");
const clickButton = document.getElementById("click-btn");
const searchBox = document.getElementById("search-box");
const mainH1 = document.getElementById("mainH1");
const kakaobtn = document.getElementById("click-kakao");

// JH TMDB API 영화 목록 주소를 각 상수에 할당
const popular = "https://api.themoviedb.org/3/movie/popular?";
const NowPlaying = "https://api.themoviedb.org/3/movie/now_playing?";
const TopRated = "https://api.themoviedb.org/3/movie/top_rated?";
const Upcoming = "https://api.themoviedb.org/3/movie/upcoming?";

// JH 상세페이지에서 url로 넘겨준 domain = ${}를 가져옴
const urlParamsJh = new URLSearchParams(window.location.search);

// JH category-domain을 줄여서 그냥 CD라는 상수에 할당
const CD = urlParamsJh.get("domain");

// JH 매개변수로 url일부를 받고, apiKey + language, options 을 showMovieList 함수에 넣어서 호출함
const fetchUrl = (movieUrl) =>
  showMovieList(movieUrl + "api_key=" + apiKey + language, options);

// JH 매개변수로 카테고리를 받아서 해당 카테고리 영화들로 영화 출력해주는 함수 호출
const categoryAdd = (movieUrl) => {
  fetchUrl(movieUrl);
};

// JH 카카오 검색 api 버튼 이벤트 지정
kakaobtn.addEventListener("click", () => {
  window.open("http://localhost:5002/main_page/kakao.html");
});

// JH 매개변수로 fetch url을 받아서 해당하는 영화들만 가져와서 화면에 보여줌
const showMovieList = (moviesUrl) => {
  fetch(moviesUrl, options)
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];
      movieCardBox.textContent = "";
      rows.forEach((item) => {
        let movieTitle = item["title"];
        let movieDesc = item["overview"];
        let movieRate = Math.round(item["vote_average"] * 10) / 10;
        let movieImg = item["poster_path"];
        let movieId = item["id"];

        let temp_html = `<div class="col" style="color: white">
                             <div class="solo-card" style="background-color: rgb(58, 58, 57)">
                                 <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                    class="card-img-top" id="cardPost-${movieId}"/>
                                 <div class="card-body" id="desc-body-${movieId}">
                                    <h2 class="card-title">${movieTitle}</h2>
                                    <p class="${getRatingColor(
                                      movieRate
                                    )}">${movieRate}</p>
                                    <p class="card-text">${movieDesc}</p>
                                </div>
                            </div>
                        </div>`;

        movieCardBox.insertAdjacentHTML("beforeend", temp_html);

        const clickCardBox = document.getElementById(`cardPost-${movieId}`);
        clickCardBox.addEventListener("click", () => clickCard(movieId));

        const clickDescBox = document.getElementById(`desc-body-${movieId}`);
        clickDescBox.addEventListener("click", () => clickDesc(movieId));
      });
    });
};

// JH id를 얼럿창으로 띄우는 함수
const clickCard = (movieId) => alert(`id: ${movieId}`);

// JH 상세페이지로 넘어가는 함수
const clickDesc = (movieId) =>
  (window.location.href = `/sub_page/sub_pro8.html?id=${movieId}`);

// SH 매개변수로 searchBoxValue를 받아와서 searchMovie가 실행됩니다.
const searchMovie = (searchBoxValue) => {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko&query=${searchBoxValue}`;
  fetch(searchUrl, options)
    .then((response) => response.json())
    .then((data) => {
      const results = data["results"];
      if (results.length === 0) {
        alert("일치하는 검색 결과를 찾을 수 없습니다.");
      } else {
        movieCardBox.textContent = "";

        results.forEach((item) => {
          const movieTitle = item.title;
          const movieDesc = item.overview;
          const movieRate = Math.round(item.vote_average * 10) / 10;
          const movieImg = item.poster_path;
          const movieId = item.id;

          const temp_html = `<div class="col" style="color: white">
                                  <div class="solo-card" style="background-color: rgb(58, 58, 57)">
                                      <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                        class="card-img-top" id="cardPost-${movieId}"/>
                                      <div class="card-body" id="desc-body-${movieId}">
                                        <h2 class="card-title">${movieTitle}</h2>
                                        <p class="${getRatingColor(
                                          movieRate
                                        )}">${movieRate}</p>
                                        <p class="card-text">${movieDesc}</p>
                                    </div>
                                </div>
                            </div>`;

          movieCardBox.insertAdjacentHTML("beforeend", temp_html);
          const clickCardBox = document.getElementById(`cardPost-${movieId}`);
          clickCardBox.addEventListener("click", () => clickCard(movieId));

          // JH 카드 설명부분 클릭시 상세페이지로 넘어가는 이벤트
          const clickDescBox = document.getElementById(`desc-body-${movieId}`);
          clickDescBox.addEventListener("click", () => clickDesc(movieId));
        });
      }
    });
};

// JH 검색박스 클릭시 실행되는 이벤트 지정
clickButton.addEventListener("click", () => {
  const searchBoxValue = searchBox.value;
  searchMovie(searchBoxValue);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchBoxValue = searchBox.value;
    searchMovie(searchBoxValue);
  }
});

// JH html요소에 이벤트 지정
mainH1.addEventListener("click", main);

// JH 카드에 평점 색 조건에 따라 변환
const getRatingColor = (rate) => {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

// JH 홈페이지 들어가자마자 TopRated 영화 목록 보여주는 함수호출
fetchUrl(TopRated);

// HK 각각의 탭이 클릭되었을 때 해당 카테고리에 대한 categoryAdd 함수를 호출하는 이벤트 리스너를 등록
popularTab.addEventListener("click", () => categoryAdd(popular));
nowPlayingTab.addEventListener("click", () => categoryAdd(NowPlaying));
topRatedTab.addEventListener("click", () => categoryAdd(TopRated));
upcomingTab.addEventListener("click", () => categoryAdd(Upcoming));

// HK CD 변수의 값을 기반으로 각 카테고리에 대한 categoryAdd 함수를 호출
if (CD === "Popular") {
  categoryAdd(popular);
} else if (CD === "NowPlaying") {
  categoryAdd(NowPlaying);
} else if (CD === "TopRated") {
  categoryAdd(TopRated);
} else if (CD === "Upcoming") {
  categoryAdd(Upcoming);
}

// SH sub_movieTitle이 서브페이지에서 검색했을 때 변수로 오는 값입니다.
// SH 값이 비어있지 않다면 메인페이지에 서브페이지에서 검색한 값을 보여줍니다.
if (sub_movieTitle !== null) {
  movieCardBox.textContent = "";
  searchMovie(sub_movieTitle);
}
