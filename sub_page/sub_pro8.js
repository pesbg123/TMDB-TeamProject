// JH URL에서 id 추출
const urlParamsJh = new URLSearchParams(window.location.search);
const movieId = urlParamsJh.get('id');

// JH html 아이디 상수안에 할당
const sub_searchBox = document.getElementById('search-box');
const sub_searchBtn = document.getElementById('click-btn');
const movieDetailsContainer = document.getElementById('movie-details');
const movieupdateContainer = document.getElementById('movie-update-modal');
// JH TMDB-API 요청에 필요한 속성을 options 상수에 할당
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0',
  },
};

// JH apiKey라는 상수에 TMDB API KEY 할당
const apiKey = 'e9bb92f648d4191155d17c8e43f25e68';

// JH fetch 요청 날릴때 주소에 붙여줄 언어 지정 문자열
const language = '&language=ko';
const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}${language}`;

// JK 이전에 저장된 리뷰들을 가져옴 (가져와서 붙일때 쓰는 용도)
let reviews = localStorage.getItem('reviews')
  ? JSON.parse(localStorage.getItem('reviews')) // 문자열->배열 변환
  : [];

// api 주소 가져오기
fetch(movieUrl, options)
  .then((response) => response.json())
  .then((data) => {
    const movieTitle = data['title'];
    const movieDesc = data['overview'];
    const movieRate = Math.round(data['vote_average'] * 10) / 10;
    const movieImg = data['poster_path'];

    const release_date = new Date(data['release_date']).getFullYear(); // JK API에서 개봉연도 추출
    const genres = data.genres.map((genre) => genre.name).join(', '); // JK 장르 추출
    const production_companies = data.production_companies // JK 제작사 추출
      .map((company) => company.name)
      .join(', ');
    const runtime = data['runtime']; // JK 상영시간 추출

    // JH 영화 데이터를 HTML에 표시
    let temp_html = `<div class="movie-box">
                        <div class="movie-img">
                          <img src="https://image.tmdb.org/t/p/w500${movieImg}" class="movie-img" />
                        </div>
                        <div class="title-comment">
                          <div class="movie-title">
                            <h1>${movieTitle}</h1>
                            <div class="movie-rate">평점:<p class="${getRatingColor(
                              movieRate
                            )}">&nbsp;★${movieRate}</p>
                            </div>
                          </div>
                          <button onclick="open_box()" class="comment-postbtn" id="open-modal-btn">Comments</button>
                        </div>
                    </div>
                  </div>
                  <div id="modal">
                    <div class="modal-content" id="reviewBox" style="display: none;">
                      <span class="close" onclick="closeModal()">&times;</span>
                      <h2>🥕리뷰를 작성 해 보세요!🥕</h2>
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
                        <button onclick="posting()" type="button" class="postBtn">저장</button>
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
                  <div class="review-list-box">
                    <h2 class="reviewsTitle">REVIEWS</h2>
                    <div class="review-list" id="review-list">
                      <p></p>
                    </div>
                  </div>
                  `;
    movieDetailsContainer.innerHTML = temp_html;

    const reviewList = document.getElementById('review-list');

    // JK 현재 페이지의 movieId와 일치하는 리뷰들만 필터링
    const filteredReviews = reviews.filter((review) => review.id === movieId);

    // JK 필터링된 리뷰들을 HTML로 추가  + SH Uid 추가
    filteredReviews.forEach((review) => {
      const { user, comment, Uid, psWordIpt } = review;

      // JK 리뷰 HTML 생성  + SH 버튼 추가
      const reviewHTML = `<div class="review-card">
                      <div class="review-card-body">
                        <header class="name-header">${user}</header>
                        <hr class="bar">
                        <p>${comment}</p>
                        <button class="DLbutton" onclick='deleteReview(${Uid},${psWordIpt})'>삭제</button>
                      </div>
                    </div>`;

      // JK 리뷰를 리뷰리스트에 추가
      reviewList.insertAdjacentHTML('beforeend', reviewHTML);
    });
  });
// JK 리뷰창 열고 닫기
function open_box() {
  // JK 모달창 열기 위한 버튼
  const modal = document.getElementById('modal');
  const reviewBox = document.getElementById('reviewBox');
  modal.style.display = 'block';
  reviewBox.style.display = 'block';
}

// JK 모달창 닫기
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  // 페이지 새로고침
  location.reload(true);
}

// JK 리뷰 생성 함수 + SH UID 생성
function posting() {
  const userIpt = document.getElementById('userIpt').value;
  const psWordIpt = document.getElementById('psWordIpt').value;
  const commentIpt = document.getElementById('commentIpt').value;
  const movieUID = new Date().getTime() + Math.random();
  // JK 새로운 리뷰 객체 생성 + SH UID 객체 포함
  const newReview = {
    user: userIpt,
    psWordIpt: psWordIpt,
    comment: commentIpt,
    id: movieId,
    Uid: movieUID,
  };
  // JK 이전에 저장된 리뷰들을 가져옴 (새 배열 추가하려고 가져오는 용도)
  let reviews = localStorage.getItem('reviews')
    ? JSON.parse(localStorage.getItem('reviews'))
    : [];

  // JK 새로운 리뷰를 리뷰 배열에 추가
  reviews.push(newReview);

  // SH password가 숫자열이 아니고, 공백이면 알림창 뜨게 수정
  if (isNaN(psWordIpt) !== true && psWordIpt !== '') {
    // SH userIpt가 공백일 경우 알림창이 뜨게 수정
    if (userIpt !== '') {
      // SH comment가 공백일 경우 알림창이 뜨게 수정
      if (commentIpt !== '') {
        // JK 리뷰 배열을 로컬 스토리지에 저장
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // JK 리뷰를 리뷰리스트에 추가 + SH 버튼 추가
        const reviewList = document.getElementById('review-list');
        const reviewHTML = `<div class="review-card">
                          <div class="review-card-body">
                            <header class="name-header">${userIpt}</header>
                            <hr class="bar">
                            <p>${commentIpt}</p>
                            <button class="DLbutton" onclick='deleteReview(${movieUID},${psWordIpt})'>삭제</button>
                          </div>
                        </div>`;
        reviewList.insertAdjacentHTML('beforeend', reviewHTML);

        // JK comment 창 닫기 + SH 리뷰 작성 시 새로고침(삭제 기능에 필요)
        const reviewBox = document.getElementById('reviewBox');
        reviewBox.style.display = 'none';
        localStorage.setItem('reviewBoxDisplay', 'hidden');
        location.reload(true);
      } else {
        alert('코멘트을 작성해주세요.');
      }
    } else {
      alert('닉네임을 작성해주세요.');
    }
  } else {
    alert('비밀번호가 올바르지 않습니다.');
  }
}

// JH 평점 색 구분
const getRatingColor = (rate) => {
  if (rate >= 8) {
    return 'green';
  } else if (rate >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};

// JH hearder Carrot Movie 클릭시 main페이지로 넘어가는 함수
const main = () => {
  window.location.href = '/TMDB-TeamProject/main_page/main_pro8.html';
};

// JH html요소에 이벤트 지정
sub_title.addEventListener('click', main);

// SH 상세 페이지에서 검색 기능 이벤트 부여
sub_searchBtn.addEventListener('click', renderMainpage);
sub_searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderMainpage();
  }
});

// 메인 페이지랑 똑같습니다.
function renderMainpage() {
  const sub_movieTitle = sub_searchBox.value;
  return (window.location.href = `/TMDB-TeamProject/main_page/main_pro8.html?title=${sub_movieTitle}`);
}

// SH 삭제 기능을 위한 모달창
function deleteReview(Uid, passWord) {
  // JK 모달창 열기
  const modal = document.getElementById('modal');
  const reviewBox = document.getElementById('reviewBox');
  modal.style.display = 'block';
  reviewBox.style.display = 'block';
  // JK 비밀번호 입력 창 모달로 변경
  const deleteModalContent = document.getElementById('reviewBox');
  deleteModalContent.innerHTML = `<div class="modal-reivew-content" id="reviewBox">
                                      <span class="close" onclick="closeModal()">&times;</span>
                                      <h2>🥕 비밀번호를 입력하세요 🥕</h2>
                                      <div class="psWordIpt">
                                        <input type="password" class="psWordIpt" id="passwordInput" placeholder="password">
                                      </div>
                                      <div class="reviewBtns">
                                        <button type="button" class="PwConfirmBtn" onclick="confirmPassword(${Uid},${passWord})">정말로 삭제 하시겠습니까?</button>
                                      </div>
                                    </div>`;
}
// SH 삭제 기능 value값이 string이길래 passWord도 string으로 형변환함
function confirmPassword(Uid, psWord) {
  const currentPassWord = document.getElementById('passwordInput').value;

  if (String(psWord) === currentPassWord) {
    const deleteReview = reviews.filter((element) => element.Uid !== Uid);
    localStorage.setItem('reviews', JSON.stringify(deleteReview));
    location.reload(true);
  } else {
    alert('비밀번호가 올바르지 않습니다.');
  }
}
