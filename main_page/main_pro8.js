const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0",
  },
};

const urlParamsSH = new URLSearchParams(window.location.search);
const sub_movieTitle = urlParamsSH.get("title");
//url 값 받아옵니다
const apiKey = "e9bb92f648d4191155d17c8e43f25e68&language=ko";

const movieCardBox = document.getElementById("cards-box");
const popularTab = document.getElementById("popular-category");
const nowPlayingTab = document.getElementById("nowplaying-category");
const topRatedTab = document.getElementById("toprate-category");
const upcomingTab = document.getElementById("upcoming-category");
const clickButton = document.getElementById("click-btn");
const searchBox = document.getElementById("search-box");
const mainH1 = document.getElementById("mainH1");

const popular = "https://api.themoviedb.org/3/movie/popular?";
const NowPlaying = "https://api.themoviedb.org/3/movie/now_playing?";
const TopRated = "https://api.themoviedb.org/3/movie/top_rated?";
const Upcoming = "https://api.themoviedb.org/3/movie/upcoming?";

const url = (movieUrl) =>
  showMovieList(movieUrl + "api_key=" + apiKey, options);

const cardsRemove = (movieUrl) => {
  movieCardBox.textContent = "";
  url(movieUrl);
};

const showMovieList = (moviesUrl) => {
  fetch(moviesUrl, options)
    .then((response) => response.json())
    .then((data) => {
      let rows = data["results"];

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
// id를 얼럿창으로 띄우는 함수
const clickCard = (movieId) => alert(`id: ${movieId}`);
// 상세페이지로 넘어가는 함수
const clickDesc = (movieId) =>
  (window.location.href = `/sub_page/sub_pro8.html?id=${movieId}`);

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
          // 카드 설명부분 클릭시 상세페이지로 넘어가는 이벤트
          const clickDescBox = document.getElementById(`desc-body-${movieId}`);
          clickDescBox.addEventListener("click", () => clickDesc(movieId));
        });
      }
    });
};

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
//searchMovie함수가 변수를 받는 형식으로 바꿨습니다. 메인페이지와 서브페이지 둘다
//검색 기능을 쓰기때문에 변수차이로 로직이 구성됩니다.
const main = () => {
  window.location.reload();
};
mainH1.addEventListener("click", main);

function getRatingColor(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

url(TopRated);

popularTab.addEventListener("click", () => cardsRemove(popular));
nowPlayingTab.addEventListener("click", () => cardsRemove(NowPlaying));
topRatedTab.addEventListener("click", () => cardsRemove(TopRated));
upcomingTab.addEventListener("click", () => cardsRemove(Upcoming));
// const clickDesc = (movieId) =>
//   (window.location.href = `/sub_page/sub_pro8.html?id=${movieId}`);

if (sub_movieTitle !== null) {
  movieCardBox.textContent = "";
  searchMovie(sub_movieTitle);
}
//sub_movieTitle이 서브페이지에서 검색했을 때 변수로 오는 값입니다.
//값이 비어있지 않다면 메인페이지에 서브페이지에서 검색한 값을 보여줍니다.
