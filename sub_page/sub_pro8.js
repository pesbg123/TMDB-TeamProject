// URL에서 id 추출
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

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
                    </div>
                    <div class="details">
                      <h2>영화 정보</h2>
                      <p>${movieTitle}</p>
                      <p>${movieDesc}</p>
                    </div>
                    <div class="review-list-box">
                      <div class="mycards" id="review-list">
                        <p></p>
                        <div class="review-card">
                            <div class="review-card-body">
                              <header class="name-header">익명</header>
                              <hr class="bar">
                              <p>리뷰 남기기 샘플</p>
                            </div>
                        </div>
                        <div class="review-card">
                            <div class="review-card-body">
                              <header class="name-header">익명</header>
                              <hr class="bar">
                              <p>리뷰 남기기 샘플</p>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
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
function getRatingColor(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const main = () => {
  window.location.href = "/main_page/main_pro8.html";
};

// 이전에 저장된 리뷰들을 가져옴
let reviews = localStorage.getItem("reviews")
  ? JSON.parse(localStorage.getItem("reviews"))
  : [];

function posting() {
  const userIptValue = document.getElementById("userIpt").value;
  const psWordIptValue = document.getElementById("psWordIpt").value;
  const commentIptValue = document.getElementById("commentIpt").value;

  // 새로운 리뷰 객체 생성
  const newReview = {
    user: userIptValue,
    password: psWordIptValue,
    comment: commentIptValue,
  };

  // 리뷰 배열에 새로운 리뷰 추가
  reviews.push(newReview);

  // 리뷰 배열을 localStorage에 저장
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // 리뷰 작성 후 reviewBox 숨기기
  const reviewBox = document.getElementById("reviewBox");
  reviewBox.style.display = "none";
  localStorage.setItem("reviewBoxDisplay", "hidden");
}
