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
    const movieRate = data["vote_average"];
    const movieImg = data["poster_path"];

    // 영화 데이터를 HTML에 표시
    let temp_html = `<div class="movie-box">
                        <div class="movie-boxin">
                            <div class="movie-img">
                                <img src="https://image.tmdb.org/t/p/w500${movieImg}" class="movie-img"/>
                                </div>
                            <div class="title-comment">
                                <div class="movie-title">
                                    <h1>${movieTitle}</h1>
                                </div>
                                <button onclick="open_box()" class="comment-postbtn">댓글창</button>
                                <div class="reviewBox" id="reviewBox" style="display: none;">
                                  <div class="userIpt">
                                    <input type="text" class="userIpt" id="userIpt" placeholder="사용자명을 입력하세요">
                                  </div>
                                  <div class="commentIpt">
                                    <textarea id="commentIpt" class="commentIpt" placeholder="리뷰를 남겨보세요"></textarea>
                                  </div>
                                  <div class="reviewBtns">
                                    <button onclick="posting()" type="button" class="postBtn">기록하기</button>
                                    <button onclick="close_box()" type="button" class="closeBtn">닫기</button>
                                  </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        `;
    movieDetailsContainer.innerHTML = temp_html;
  });

function open_box() {
  const reviewBox = document.getElementById("reviewBox");
  reviewBox.style.display = "block";
  localStorage.setItem("reviewBoxDisplay", "visible");
}

function close_box() {
  const reviewBox = document.getElementById("reviewBox");
  reviewBox.style.display = "none";
  localStorage.setItem("reviewBoxDisplay", "hidden");
}
