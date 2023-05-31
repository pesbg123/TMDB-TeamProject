const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjAwYjljMmY0NzA2MzIzMDdkNTk5Y2E2MDU1YWM4NSIsInN1YiI6IjY0NzM0ZDM0YmUyZDQ5MDBhN2Q2MzgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.904cgBblGnOetTZ00BRWJnlIigPpKGEFzmBXQRjeYHk',
  },
};

// 영화 api 받아서 카드 붙이기
function listing() {
  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let rows = data['results'];
      const cardBox = document.getElementById('cards-box');
      cardBox.textContent = ''; // 기존 카드 지우기
      rows.forEach((movie) => {
        let title = movie['title'];
        let content = movie['overview'];
        let image = movie['poster_path'];
        let rate = movie['vote_average'];
        let id = movie['id'];

        let temp_html = `<div class="col">
                            <div class="card h-100" id="card-${id}">
                              <img src="https://image.tmdb.org/t/p/w500${image}"
                                  class="card-img-top">
                              <div class="card-body">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">${content}</p>
                                  <p>${rate}</p>
                              </div>
                            </div>
                          </div>`;
        cardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = document.getElementById(`card-${id}`);
        clickCardBox.addEventListener('click', () => clickCard(id));
      });
    });
}

// alert 카드 id 함수 선언
function clickCard(id) {
  alert(`id: ${id}`);
}

// 카드 붙이는 함수 실행
listing();
// 검색 함수 선언
function searchMovie() {
  const searchBox = document.getElementById('searchinput').value; // 검색 input값 받아오기
  const movieCardBox = document.getElementById('cards-box'); // html에서 카드 찾기
  movieCardBox.innerHTML = ''; // 기존 카드 지우기

  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data['results'];
      if (searchBox.length === 0) {
        alert('한 글자 이상 적어주세요'); // 입력값 없는 경우
      }
      const filteredResults = results
        // map() 으로 카드 배열 생성
        .map((item) => ({
          title: item['title'],
          content: item['overview'],
          image: item['poster_path'],
          rate: item['vote_average'],
          id: item['id'],
        }))
        // filter() 로 검색 인풋이 포함된 타이틀이 있는 배열만 반환
        .filter((movie) =>
          movie.title.toLowerCase().includes(searchBox.toLowerCase())
        );
      if (filteredResults.length === 0) {
        alert('일지하는 검색결과가 없습니다'); // 인풋이 포함된 제목 값이 없을 경우
        window.location.reload();
      }
      // 필터링한 배열만 카드로 붙이기
      filteredResults.forEach((movie) => {
        let temp_html = `<div class="col">
                                <div class="card h-100">
                                    <img src="https://image.tmdb.org/t/p/w500${movie.image}"
                                        class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.title}</h5>
                                        <p class="card-text">${movie.content}</p>
                                        <p>${movie.rate}</p>
                                    </div>
                                </div>
                            </div>`;
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = movieCardBox.lastElementChild;
        clickCardBox.addEventListener('click', () => clickCard(movie.id));
      });
    });
}
// 검색 버튼 이벤트 함수 실행
const searchButton = document.getElementById('searchbtn');
searchButton.addEventListener('click', searchMovie);
// 엔터 키 입력 = 검색 버튼 클릭
const searchIpt = document.getElementById('searchinput');
searchIpt.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});
// 제목 클릭 -> 새.고
const main = () => {
  window.location.reload();
};
