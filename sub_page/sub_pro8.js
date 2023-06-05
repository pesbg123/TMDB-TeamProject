// URL에서 id 추출<이재혁>
const urlParamsJh = new URLSearchParams(window.location.search);
const movieId = urlParamsJh.get("id");

const sub_searchBox = document.getElementById("search-box");
const sub_searchBtn = document.getElementById("click-btn");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0",
  },
};

const apiKey = "e9bb92f648d4191155d17c8e43f25e68&language=ko";

const movieDetailsContainer = document.getElementById("movie-details");

const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko`;

fetch(movieUrl, options)
  .then((response) => response.json())
  .then((data) => {
    const movieTitle = data["title"];
    const movieDesc = data["overview"];
    const movieRate = Math.round(data["vote_average"] * 10) / 10;

    const movieImg = data["poster_path"];

    const release_date = new Date(data["release_date"]).getFullYear(); // JK API에서 개봉연도 추출

    const genres = data.genres.map((genre) => genre.name).join(", "); // JK 장르 추출
    const production_companies = data.production_companies // JK 제작사 추출
      .map((company) => company.name)
      .join(", ");
    const runtime = data["runtime"]; // JK 상영시간 추출

    // 영화 데이터를 HTML에 표시
    let temp_html = `<div class="movie-box">
                        <div class="movie-boxin">
                            <div class="movie-img">
                                <img src="https://image.tmdb.org/t/p/w500${movieImg}" class="movie-img" />
                            </div>
                            <div class="title-comment">
                                <div class="movie-title">
                                    <h1>${movieTitle}</h1>
                                    <div class="movie-rate">평점:<p class="${getRatingColor(
                                      movieRate
                                    )}">&nbsp;★${movieRate}</p></div>
                                </div>
                                <button onclick="open_box()" class="comment-postbtn">Comments</button>
                                <div class="reviewBox" id="reviewBox" style="display: none;">
                                  <div class="userIpt">
                                    <input type="text" class="userIpt" id="userIpt" placeholder="UserName">
                                  </div>
                                  <div class="psWordIpt">
                                    <input type="text" class="psWordIpt" id="psWordIpt" placeholder="PW">
                                  </div>
                                  <div class="commentIpt">
                                    <textarea id="commentIpt" class="commentIpt" placeholder="a review comment"></textarea>
                                  </div>
                                  <div class="reviewBtns">
                                    <button onclick="posting()" type="button" class="postBtn">Save</button>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details">
                      <h2>영화 정보</h2>
                      <p>${movieTitle}</p>
                      <p>${release_date}</p>
                      <p>${genres}</p>
                      <p>${runtime}분</p>
                      <p>${movieDesc}</p>
                      <p>제작: ${production_companies}</p>
                    </div>
                    <div
                    <div class="review-list-box">
                      <h2 class="reviewsTitle">REVIEWS</h2>
                      <div class="review-list" id="review-list">
                        <p></p>
                    </div>
                </div>
                    `;
    movieDetailsContainer.innerHTML = temp_html;

    // JK 이전에 저장된 리뷰들을 가져옴 (가져와서 붙일때 쓰는 용도)
    let reviews = localStorage.getItem("reviews")
      ? JSON.parse(localStorage.getItem("reviews"))
      : [];

    const reviewListContainer = document.getElementById("review-list");

    // JK 이전에 저장된 리뷰들을 HTML로 추가
    reviews.forEach((review) => {
      const { user, comment } = review;

      // JK 리뷰 HTML 생성
      const reviewHTML = `<div class="review-card">
                          <div class="review-card-body">
                            <header class="name-header">${user}</header>
                            <hr class="bar">
                            <p>${comment}</p>
                          </div>
                        </div>`;

      // JK 리뷰를 리뷰 목록 컨테이너에 추가
      reviewListContainer.insertAdjacentHTML("beforeend", reviewHTML);
    });
  });
// JK 리뷰창 열고 닫기
function open_box() {
  const reviewBox = document.getElementById("reviewBox");
  const reviewBoxDisplay = localStorage.getItem("reviewBoxDisplay");

  switch (reviewBoxDisplay) {
    case "visible":
      reviewBox.style.display = "none";
      localStorage.setItem("reviewBoxDisplay", "hidden");
      break;
    case "hidden":
    default:
      reviewBox.style.display = "block";
      localStorage.setItem("reviewBoxDisplay", "visible");
      break;
  }
}
// JK 리뷰 생성 함수
function posting() {
  const userIpt = document.getElementById("userIpt").value;
  const commentIpt = document.getElementById("commentIpt").value;

  // JK 새로운 리뷰 객체 생성
  const newReview = {
    user: userIpt,
    comment: commentIpt,
  };

  // JK 이전에 저장된 리뷰들을 가져옴 (새 배열 추가하려고 가져오는 용도)
  let reviews = localStorage.getItem("reviews")
    ? JSON.parse(localStorage.getItem("reviews"))
    : [];

  // JK 새로운 리뷰를 리뷰 배열에 추가
  reviews.push(newReview);

  // JK 리뷰 배열을 로컬 스토리지에 저장
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // JK 리뷰를 리뷰 목록 컨테이너에 추가
  const reviewListContainer = document.getElementById("review-list");
  const reviewHTML = `<div class="review-card">
                          <div class="review-card-body">
                            <header class="name-header">${userIpt}</header>
                            <hr class="bar">
                            <p>${commentIpt}</p>
                          </div>
                        </div>`;
  reviewListContainer.insertAdjacentHTML("beforeend", reviewHTML);

  // JK 입력 필드 초기화
  document.getElementById("userIpt").value = "";
  document.getElementById("commentIpt").value = "";

  // JK comment 창 닫기
  const reviewBox = document.getElementById("reviewBox");
  reviewBox.style.display = "none";
  localStorage.setItem("reviewBoxDisplay", "hidden");
}

// 평점 색 구분
const getRatingColor = (rate) => {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const main = () => {
  window.location.href = "/main_page/main_pro8.html";
};

// 상세페이지에서 카테고리들로 넘어가는 함수
const clickPopular = document.getElementById("popular-category");
clickPopular.addEventListener("click", () => clickPopularTab());

const clickPopularTab = () =>
  (window.location.href = `/main_page/main_pro8.html?domain=Popular`);

const clickNowPlaying = document.getElementById("nowplaying-category");
clickNowPlaying.addEventListener("click", () => clickNowPlayingTab());

const clickNowPlayingTab = () =>
  (window.location.href = `/main_page/main_pro8.html?domain=NowPlaying`);

const clickTopRated = document.getElementById("toprate-category");
clickTopRated.addEventListener("click", () => clickTopRatedTab());

const clickTopRatedTab = () =>
  (window.location.href = `/main_page/main_pro8.html?domain=TopRated`);

const clickUpcoming = document.getElementById("upcoming-category");
clickUpcoming.addEventListener("click", () => clickUpcomingTab());

const clickUpcomingTab = () =>
  (window.location.href = `/main_page/main_pro8.html?domain=Upcoming`);

sub_searchBtn.addEventListener("click", renderMainpage);
sub_searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderMainpage();
  }
});
//메인 페이지랑 똑같습니다.
function renderMainpage() {
  const sub_movieTitle = sub_searchBox.value;
  return (window.location.href = `/main_page/main_pro8.html?title=${sub_movieTitle}`);
}
