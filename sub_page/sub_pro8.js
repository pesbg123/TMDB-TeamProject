// URL에서 id 추출
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
                    </div>`;
    movieDetailsContainer.innerHTML = temp_html;
  });

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

// 상세페이지에서 populer 카테고리로 넘어가는 함수
const clickPopuler = document.getElementById("popular-category");
clickPopuler.addEventListener("click", () => clickPopulerTab());

const clickPopulerTab = () =>
  (window.location.href = `/main_page/main_pro8.html?domain=Popular`);

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
