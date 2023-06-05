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
const searchBox = document.getElementById("search-box");
const clickButton = document.getElementById("click-btn");
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
                               
                                <button onclick="open_box()" class="comment-postbtn">댓글창</button>
                                <div class="reviewBox" id="reviewBox" style="display: none;">
                                  <div class="userIpt">
                                    <input type="text" class="userIpt" id="userIpt" placeholder="사용자명을 입력하세요">
                                  </div>
                                  <div class="psWordIpt">
                                    <input type="text" class="psWordIpt" id="psWordIpt" placeholder="비밀번호를 입력하세요">
                                  </div>
                                  <div class="commentIpt">
                                    <textarea id="commentIpt" class="commentIpt" placeholder="리뷰를 남겨보세요"></textarea>
                                  </div>
                                  <div class="reviewBtns">
                                    <button onclick="posting()" type="button" class="postBtn">리뷰남기기</button>
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
function getRatingColor(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

clickButton.addEventListener("click", renderMainpage);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderMainpage();
  }
});
//메인 페이지랑 똑같습니다.

function renderMainpage() {
  const movieTitle = searchBox.value;
  return (window.location.href = `/main_page/main_pro8.html?title=${movieTitle}`);
}
//url 전달함수입니다.
