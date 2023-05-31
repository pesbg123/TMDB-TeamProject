const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWJiOTJmNjQ4ZDQxOTExNTVkMTdjOGU0M2YyNWU2OCIsInN1YiI6IjY0NzIxZmM1ZGQ3MzFiMDBjMGJhYWU5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y3E-hG7rguBwXeMYwJDAuXRxZp8nBSidYbJb6AFhSf0',
  },
};
const apiKey =
  'https://api.themoviedb.org/3/movie/popular?api_key=e9bb92f648d4191155d17c8e43f25e68&language=ko';
function showMovieList() {
  fetch(apiKey, options)
    .then((response) => response.json())
    .then((data) => {
      let rows = data['results'];
      const movieCardBox = document.getElementById('cards-box');
      movieCardBox.textContent = '';
      rows.forEach((item) => {
        let movieTitle = item['title'];
        let movieDesc = item['overview'];
        let movieRate = item['vote_average'];
        let movieImg = item['poster_path'];
        let movieId = item['id'];

        let temp_html = `<div class="col" style="color: white">
                           <div class="solo-card" id="cardPost-${movieId}" style="background-color: rgb(58, 58, 57)">
                               <img src="https://image.tmdb.org/t/p/w500${movieImg}"
                                  class="card-img-top"/>
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
        const clickCardBox = document.getElementById(`cardPost-${movieId}`);
        clickCardBox.addEventListener('click', () => clickCard(movieId));
      });
    });
}

function clickCard(movieId) {
  alert(`id: ${movieId}`);
}

showMovieList();

function searchMovie() {
  const searchBox = document.getElementById('search-box').value;
  const movieCardBox = document.getElementById('cards-box');
  movieCardBox.textContent = '';

  fetch(apiKey, options)
    .then((response) => response.json())
    .then((data) => {
      let results = data['results'];
      if (searchBox.length === 0) {
        alert('한 글자 미만 버튼 클릭 금지');
      }
      const filteredResults = results
        .map((item) => ({
          movieTitle: item['title'],
          movieDesc: item['overview'],
          movieRate: item['vote_average'],
          movieImg: item['poster_path'],
          movieId: item['id'],
        }))
        .filter((movie) =>
          movie.movieTitle
            .toLowerCase()
            .replace(/ /g, '')
            .includes(searchBox.replace(/ /g, '').toLowerCase())
        );
      if (filteredResults.length === 0) {
        alert('그런 영화 없거나 이상한 걸 입력한듯?');
        window.location.reload();
      }
      filteredResults.forEach((movie) => {
        let temp_html = `<div class="col" style="color: white">
                            <div class="solo-card" id="cardPost-${
                              movie.movieId
                            }" style="background-color: rgb(58, 58, 57)">
                                <img src="https://image.tmdb.org/t/p/w500${
                                  movie.movieImg
                                }"
                                  class="card-img-top"/>
                                <div class="card-body">
                                  <h2 class="card-title">${
                                    movie.movieTitle
                                  }</h5>
                                  <p class="${textColor(movie.movieRate)}">${
          movie.movieRate
        }</p>
                                  <p class="card-text">${movie.movieDesc}</p>
                              </div>
                          </div>
                      </div>`;
        movieCardBox.insertAdjacentHTML('beforeend', temp_html);
        const clickCardBox = document.getElementById(
          `cardPost-${movie.movieId}`
        );
        clickCardBox.addEventListener('click', () => clickCard(movie.movieId));
      });
    });
}

const clickButton = document.getElementById('click-btn');
clickButton.addEventListener('click', searchMovie);

const searchBox = document.getElementById('search-box');
searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchMovie();
  }
});

const main = () => {
  window.location.reload();
};

function textColor(rate) {
  if (rate >= 8) {
    return 'green';
  } else if (rate >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
